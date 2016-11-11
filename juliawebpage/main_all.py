import os
import urllib2
from xml.dom import minidom
from collections import namedtuple
import urllib2
import json
from xml.dom import minidom

from lib.functions_asciichan import gmaps_img, get_coors,top_arts
from lib.functions_rot13 import convert_rot13
from lib.functions_blog import blog_key, perma_post, age_str, users_key, top_posts
from lib.utils import  make_salt, valid_pw, valid_username, valid_password, valid_email, make_pw_hash, make_secure_val, check_secure_val
#from Handler import Handler

import webapp2
import jinja2

from google.appengine.ext import db
from google.appengine.api import memcache


template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
        autoescape = True)
class Handler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

    def render_json(self, content):
        self.response.headers['Content-Type'] = 'application/json; character=UTF-8'
        self.write(json.dumps(content))

    def set_secure_cookie(self, name, val):
        cookie_val = make_secure_val(val)
        self.response.headers.add_header(
            'Set-Cookie',
            '%s=%s; Path=/' % (name, cookie_val))

    def read_secure_cookie(self, name):
        cookie_val = self.request.cookies.get(name)
        return cookie_val and check_secure_val(cookie_val)

    def login(self, user):
        self.set_secure_cookie('user_id', str(user.key().id()))

    def logout(self):
        self.response.headers.add_header('Set-Cookie', 'user_id=; Path=/')

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)
        uid = self.read_secure_cookie('user_id')
        self.user = uid and User.by_id(int(uid))

        if self.request.url.endswith('.json'):  
            self.format = 'json'
        else: 
            self.format = 'html'


### WELCOME PAGE
class WelcomePage(Handler):
    def get(self):
        self.render("welcome.html")

    def post(self):
        inpt = self.request.get('submit')
        inpt2site = {'FizzBuzz':'/fizzbuzz', 'ShoppingList':'/shopping','Rot13Encription':'/rot13','Asciichan':'/asciichan','Blog':'/blog'}
        site = inpt2site[inpt]
        self.redirect(site)


### SHOPPING
class ShoopingHandler(Handler):
    def get(self):
        items = self.request.get_all("food")
        self.render("shopping_list.html", items = items)


### FIZZBUZZ
class FizzBuzzHandler(Handler):
    def get(self):
        n = self.request.get('n')
        if n == '':
            n=10
        else:
            n = int(n)
        self.render('fizzbuzz.html', n = n)


### ROT13
class Rot13Handler(Handler):
    def get(self):
        #text = self.request.get('textarea')
        self.render('rot13.html', text = "")

    def post(self):
        text = self.request.get('textarea')
        text = convert_rot13(text)
        self.render('rot13.html', text = text)


### ASCIICHAN
class Art(db.Model):
    title = db.StringProperty(required = True)
    art = db.TextProperty(required = True)
    created = db.DateTimeProperty(auto_now_add = True)
    coords = db.GeoPtProperty() #for backwards compatibilty it's not required

class AsciichanHandler(Handler):
    def render_front(self, title="", art="", error=""):
        arts = top_arts()
        #if we have art, show map with the art
        points = filter(None, (a.coords for a in arts))
        #create image url with all points
        img_url = None
        if points:
            img_url = gmaps_img(points)
            #check if the created url is working
            #self.write(img_url)
        self.render('asciifront.html',title=title,art=art,error=error,arts=arts,img_url=img_url)

    def get(self):
        #insert here a line for debugging, use repr to print a python object with html
        #self.write(repr(get_coors(self.request.remote_addr)))
        self.render_front()

    def post(self):
        title = self.request.get("title")
        art = self.request.get("art")

        if title and art:
            #self.write("thanks!")
            a = Art(title = title, art = art)
            coords = get_coors(self.request.remote_addr)
            if coords:
                a.coords = coords
            a.put()
            #return the arts and update the cache
            top_arts(True)
            self.redirect('/asciichan')
        else:
            error = "Please enter both title and some artwork!"
            self.render_front(title, art, error)

### Blog
class Posts(db.Model):
    subject = db.StringProperty(required = True)
    text = db.TextProperty(required = True)
    created = db.DateTimeProperty(auto_now_add = True)
    last_modified = db.DateTimeProperty(auto_now = True)

    # replaces line breaks with html linebreacks 
    #to show the blog entry properly
    def render(self):
        self._render_text = self.content.replace('\n', '<br>')
        return render_str("blog.html", p = self)

    def as_dict(self):
        time_fmt = '%c'
        d = {'subject' : self.subject,
            'text' : self.text,
            'created' : self.created.strftime(time_fmt),
            'last_modified' : self.last_modified.strftime(time_fmt)}
        return d


class User(db.Model):
    name = db.StringProperty(required = True)
    pw_hash = db.StringProperty(required = True)
    email = db.StringProperty()

    @classmethod
    def by_id(cls, uid):
        return User.get_by_id(uid, parent = users_key())

    @classmethod
    def by_name(cls, name):
        u = User.all().filter('name =', name).get()
        return u

    @classmethod
    def register(cls, name, pw, email = None):
        pw_hash = make_pw_hash(name, pw)
        return User(parent = users_key(),
                    name = name,
                    pw_hash = pw_hash,
                    email = email)

    @classmethod
    def login(cls, name, pw):
        u = cls.by_name(name)
        if u and valid_pw(name, pw, u.pw_hash):
            return u

class BlogHandler(Handler):
    def get(self):
        username = ""
        if self.user:
            username = self.user.name
        allposts, age = top_posts('POSTS')
        queried = age_str(age)
        if self.format == 'html':
            self.render('blog.html', allposts = allposts, username = username, queried = queried)
        else:
            return self.render_json([p.as_dict() for p in allposts])

class AddPostHandler(Handler):
    def render_front(self, subject="",text="",error=""):
        self.render("addpost.html",subject=subject,text=text,error=error)

    def get(self):
        if self.user:
            self.render_front()
        else:
            self.redirect("/blog/login")
    
    def post(self):
        subject = self.request.get("subject")
        text = self.request.get("text")

        if subject and text:
            entry = Posts(parent = blog_key(), subject = subject, text = text)
            entry.put()
            allposts = top_posts('POSTS',True)
            self.redirect('/blog/%s' % str(entry.key().id()))
        else:
            error = "Please enter both subject and some text!"
            self.render_front(subject, text, error)

class PostHandler(BlogHandler):
    def get(self, post_id):
        entry, age = perma_post(post_id)
        queried = age_str(age)
        if not entry:
            self.error(404)
            return
        if self.format == 'html':
            self.render("permalink.html", entry = entry, queried = queried)
        else:
            self.render_json(entry.as_dict())

class LogoutHandler(BlogHandler):
    def get(self):
        self.logout()
        self.redirect('/blog')

class SignUpHandler(BlogHandler):
    def get(self):
        self.render("signup-form.html")

    def post(self):
        have_error = False
        username = self.request.get('username')
        password = self.request.get('password')
        verify = self.request.get('verify')
        email = self.request.get('email')

        #put variables here that should stay in form
        params = dict(username = username,
                      email = email)

        if not valid_username(username):
            params['error_username'] = "That's not a valid username."
            have_error = True

        if not valid_password(password):
            params['error_password'] = "That wasn't a valid password."
            have_error = True
        elif password != verify:
            params['error_verify'] = "Your passwords didn't match."
            have_error = True

        if not valid_email(email):
            params['error_email'] = "That's not a valid email."
            have_error = True

        if have_error:
            self.render('signup-form.html', **params)
        else:
            #check if user exists 
            u = User.by_name(username)
            if u:
                msg = 'That username already exists'
                self.render('signup-form.html', error_username = msg)
            else:
                u = User.register(username, password, email)
                u.put()

                self.login(u)
                self.redirect('/blog')

class LoginHandler(BlogHandler):
    def get(self):
        self.render('login.html')

    def post(self):
        username = self.request.get('username')
        password = self.request.get('password')

        #Check if user exists
        u = User.login(username,password)
        if u:
            self.login(u)
            self.redirect('/blog')
        else:
            check = User.by_name(username)
            if check:
                msg = 'Wrong passowrd'
                self.render('login.html', error_password = msg, username = username)
            else:
                msg = 'User does not exist'
                self.render('login.html', error_username = msg, username = username)

class FlushHandler(BlogHandler):
    def get(self):
        memcache.flush_all()
        self.redirect('/blog')

class ResumeHandler(Handler):
	def get(self):
		self.render('cv.html')

		

app = webapp2.WSGIApplication([
    ('/', WelcomePage),
    ('/shopping', ShoopingHandler),
    ('/fizzbuzz', FizzBuzzHandler),
    ('/rot13', Rot13Handler),
    ('/asciichan', AsciichanHandler),
    ('/blog/?(?:/.json)?', BlogHandler),
    ('/blog/addpost', AddPostHandler),
    ('/blog/logout', LogoutHandler),
    ('/blog/signup', SignUpHandler),
    ('/blog/login', LoginHandler),
    ('/blog/flush', FlushHandler),
    ('/blog/([0-9]+)(?:.json)?', PostHandler),
    ('/resume', ResumeHandler)
], debug=True)


