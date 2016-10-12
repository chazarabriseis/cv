import logging

from xml.dom import minidom
from google.appengine.api import memcache
from google.appengine.ext import db

def escape_html(s):
	return s.replace('&', '&amp;').replace('>', '&gt;').replace('<', '&lt;').replace('"', '&quot;')

#This was just for testing outside, the db.Geo saves coordinate sin this tuple
#Point = namedtuple('Point', ["lat", "lon"])
GMAPS_URL = "http://maps.googleapis.com/maps/api/staticmap?size=380x263&sensor=false"
def gmaps_img(points):
    url = GMAPS_URL
    for point in points:
        url = '%s&markers=%s,%s'% (url,str(point.lat),str(point.lon))
    return url

IP_URL = "http://api.hostip.info/?ip="
def get_coors(ip):
	url = IP_URL + ip
	content = None
 	#website that returns coordintaes for a IP adress doesn't exist anymore
 	#content = urllib2.urlopen(url).read()
 	#except URLerror:
 	#	return
 	content = """<HostipLookupResultSet xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.1" xsi:noNamespaceSchemaLocation="http://www.hostip.info/api/hostip-1.0.1.xsd">
           <gml:description>This is the Hostip Lookup Service</gml:description>
           <gml:name>hostip</gml:name>
           <gml:boundedBy>
             <gml:Null>inapplicable</gml:Null>
           </gml:boundedBy>
           <gml:featureMember>
             <Hostip>
               <ip>12.215.42.19</ip>
               <gml:name>Aurora, TX</gml:name>
               <countryName>UNITED STATES</countryName>
               <countryAbbrev>US</countryAbbrev>
               <!-- Co-ordinates are available as lng,lat -->
               <ipLocation>
                 <gml:pointProperty>
                   <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                     <gml:coordinates>-90.5159,37.0582</gml:coordinates>
                   </gml:Point>
                 </gml:pointProperty>
               </ipLocation>
             </Hostip>
           </gml:featureMember>
        </HostipLookupResultSet>"""
 	if content:
 		c = minidom.parseString(content)
 		coords = c.getElementsByTagName("gml:coordinates")
 		if coords and coords[0].childNodes[0].nodeValue:
 			lon,lat = coords[0].childNodes[0].nodeValue.split(',')
 			return db.GeoPt(lat,lon)

def top_arts(update = False):
	key = 'top'
	arts = memcache.get(key)
	if arts  is None or update:
		#write in the log file
		logging.error("DB QUERY")
		arts = db.GqlQuery("SELECT * FROM Art ORDER BY created DESC LIMIT 10")
		arts = list(arts)
		memcache.set(key, arts)
	return arts
