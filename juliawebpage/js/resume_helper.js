var HTMLheaderName = '<h1 id="name" class="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="img-responsive biopic">';
var HTMLwelcomeMsg = '<span>%data%</span>';

var HTMLskillImage = '<li class="horizontal-list"><img src="%data%" class="img-responsive thumbnail" data-toggle="modal" data-target="#%modal%"></li>';
var HTMLskills = '<li class="horizontal-list">%data%</li>';
var HTMLskillModalimage = '<img class="img-responsive thumbnail" src="%data%" id="CompSkill">';
var HTMLskillModaltext = '<li class="bold">%data%</li>' 
var HTMLskillModalitem = '<li>&nbsp;&nbsp;&nbsp;&nbsp;%data%</li>' 

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="%href%">%data%</a>';
var HTMLworkTitle = ' - %data%';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p>%data%</p>';

var HTMLpublicationStart = '<div class="publication-entry text-center"></div>';
var HTMLpublicationTitle = '<hr><a href="%href%" class="bold text-center">%data%</a>';
var HTMLpublicationDates = '<div>%data%</div>';
var HTMLpublicationAuthors = '<div class="italic">%data%</div>';
var HTMLpublicationJournal = '<div class="date-text">%data%</div>';
var HTMLpublicationImage = '<div class="row"><div class="col-sm-4"><img src="%data%" class="img-responsive patent"></div>';
var HTMLpublicationDescription = '<div class="col-sm-7 summary text-left"><p>%data%</p></div></div>';

var HTMLpatentStart = '<div class="patent-entry text-center"></div>';
var HTMLpatentTitle = '<div class="bold text-center">%data%</div>';
var HTMLpatentTitleWeb = '<hr><a href="%href%" class="bold">%data%</a>';
var HTMLpatentDates = '<div class="date-text">%data%</div>';
var HTMLpatentAuthors = '<div class="italic">%data%</div>';
var HTMLpatentJournal = '<div>%data%</div>';
var HTMLpatentDocket = '<div>filed as docket %data% in %location%</div>';
var HTMLpatentImage = '<div class="row"><div class="col-sm-4"><img src="%data%" class="img-responsive patent"></div>';
var HTMLpatentDescription = '<div class="col-sm-7 summary text-left"><p>%data%</p></div></div>';

var HTMLawardStart = '<div class="award-entry distance"></div>';
var HTMLawardTitle = '<div class="award"> %data%</div>';
var HTMLawardDates = '<div class="date-text">%data%</div>';
var HTMLawardInst = '<a href="%href%">%data%</a>';

var HTMLschoolStart = '<div class="education-entry distance"></div>';
var HTMLschoolName = '<div class="bold"> %data%';
var HTMLschoolDegree = '-- %data%<br>';
var HTMLschoolGroup = '<a href="%href%">%data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolTitle = '%data%';
var HTMLschoolImage = '<div class="row"><div class="col-sm-5"><img src="%data%" class="img-responsive patent"></div>';
var HTMLschoolSummary = '<div class="col-sm-6"><p><div class="bold">Thesis title:</div>%data%</p></div></div>';

var HTMLonlineClasses = '<div class="course-entry distance"></div>';
var HTMLonlineTitle = '<a href="%href%">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var HTMLlanguageStart = '<ul id="languages"></ul>'
var HTMLlanguage = '<li class="horizontal-list">%data% (%level%)</li><li class="horizontal-list">   </li>';

var HTMLinterestsStart = '<ul id="interests"></ul>'
var HTMLinterest = '<li class="horizontal-list">%data%</li><li class="horizontal-list">   </li>';


//Create a google map that shows all locations
var map;    // declares a global map variable

function initializeMap() {

   var locations;

   var mapOptions = {
     disableDefaultUI: true
   };


map = new google.maps.Map(document.querySelector('#map'), mapOptions);

function locationFinder() {
     var locations = [];

     locations.push(julia.basics.location);

     julia.education.forEach(function(school){
       locations.push(school.location);
     });

     julia.studentPlacement.forEach(function(school){
       locations.push(school.location);
     });

     julia.work.forEach(function(job){
       locations.push(job.location);
     });

     return locations;
   }

function createMapMarker(placeData) {
    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
      infoWindow.open(map, marker)
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
map.fitBounds(mapBounds);
});

//Carousel stuff
// invoke the carousel
$('#myCarousel').carousel({
  interval: 30000
});

/* SLIDE ON CLICK */ 

$('.carousel-linked-nav > li > a').click(function() {

    // grab href, remove pound sign, convert to number
    var item = Number($(this).attr('href').substring(1));

    // slide to number -1 (account for zero indexing)
    $('#myCarousel').carousel(item - 1);

    // remove current active class
    $('.carousel-linked-nav .active').removeClass('active');

    // add active class to just clicked on item
    $(this).parent().addClass('active');

    // don't follow the link
    return false;
});

/* AUTOPLAY NAV HIGHLIGHT */

// bind 'slid' function
$('#myCarousel').bind('slid.bs.carousel', function() {

    // remove active class
    $('.carousel-linked-nav .active').removeClass('active');

    // get index of currently active item
    var idx = $('#myCarousel .item.active').index();

    // select currently active item and add active class
    $('.carousel-linked-nav li:eq(' + idx + ')').addClass('active');

});