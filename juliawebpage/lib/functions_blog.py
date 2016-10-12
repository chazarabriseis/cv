import os
import webapp2
import jinja2
import re
import hmac
import random
import string
import hashlib
from string import letters
from google.appengine.api import memcache
import logging
from datetime import timedelta, datetime


from google.appengine.ext import db

def blog_key(name = 'default'):
	return db.Key.from_path('blogs', name)

def top_posts(key, update = False):
    posts, age = age_get(key)
    if posts is None or update:
        #write in the log file
        logging.error("DB QUERY")
        posts = db.GqlQuery("SELECT * FROM Posts ORDER BY created DESC LIMIT 10")
        posts = list(posts)
        age_set(key, posts)
    return posts, age

def perma_post(post_id, update = False):
    key_mc = 'Post_'+str(post_id)
    key_db = db.Key.from_path('Posts', int(post_id), parent=blog_key())
    entry, age = age_get(key_mc)
    if entry is None or update:
        #write in the log file
        logging.error("DB QUERY")
        entry = db.get(key_db)
        age_set(key_mc, entry)
    return entry, age

def age_set(key, posts):
    save_time = datetime.utcnow()
    memcache.set(key, (posts, save_time))

def age_get(key):
    content = memcache.get(key)
    if content:
        posts, save_time = content
        age = (datetime.utcnow() - save_time).total_seconds()
    else:
        posts, age = None, 0

    return posts, age

def age_str(age):
    s = 'Queried %s seconds ago'
    age = int(age)
    if age == 1:
        s = s.replace('seconds','second')
    return s % age

USER_RE = re.compile(r"^[a-zA-Z0-9_-]{3,20}$")
def valid_username(username):
    return username and USER_RE.match(username)

PASS_RE = re.compile(r"^.{3,20}$")
def valid_password(password):
    return password and PASS_RE.match(password)

EMAIL_RE  = re.compile(r'^[\S]+@[\S]+\.[\S]+$')
def valid_email(email):
    return not email or EMAIL_RE.match(email)

SECRET = 'Dieweltistv0llerdeppen'

def make_secure_val(val):
    return '%s|%s' % (val, hmac.new(SECRET, val).hexdigest())

def check_secure_val(secure_val):
    val = secure_val.split('|')[0]
    if secure_val == make_secure_val(val):
        return val

##### user stuff
def make_salt(length = 5):
    return ''.join(random.choice(letters) for x in xrange(length))

def make_pw_hash(name, pw, salt = None):
    if not salt:
        salt = make_salt()
    h = hashlib.sha256(name + pw + salt).hexdigest()
    return '%s,%s' % (salt, h)

def valid_pw(name, password, h):
    salt = h.split(',')[0]
    return h == make_pw_hash(name, password, salt)

def users_key(group = 'default'):
    return db.Key.from_path('users', group)
