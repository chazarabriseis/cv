var HTMLdiaryStart = '<div class="diary-entry"></div>';
var HTMLdiaryTitle = '<div class="col-sm-6 text-center"><p align="justify class="pad-top""><h2>%data%</h2></p></div>';
var HTMLdiaryText = '<div class = "row"> <div class = col-sm-12><p align="justify">%data%</p></div></div>';

var HTMLgalleryStart ='<div class = "row"> <div class = col-sm-12><div id="scroller" style="height: 200px; margin: 0 auto;"> <div class="innerScrollArea"> <ul>';
var HTMLgalleryImageLS = '<li> <img class="gallery-height" src="%data%" height="200" width="356"/>';
var HTMLgalleryImagePT = '<li> <img class="gallery-height" src="%data%" height="200" width="131"/>';


var HTMLdiaryImage = '<div class="row"><div class="col-sm-3"><img src="%data%" class="img-responsive fixedheight_small"></div>';
var HTMLdiaryDate = '<div class="row"><div class="col-sm-12 text-right">%data%</div><hr>';
var HTMLdiaryMapStart = '<div id="mapDiv" class="col-sm-3 mapImage"> </div></div>';
var HTMLdiaryMap = '<div class="fixedheight_small_right" id="map"></div>';
//var HTMLdiaryMap = '<div id="mapDiv" class="col-sm-3"><div class="fixedheight_small_right" id="map"></div> </div></div>';



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

     locations.push(diaryEntryLocation);

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

    google.maps.event.addListener(marker, 'click', function() {
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


    // Scrolling speed management
    var controller = {curSpeed:0, fullSpeed:2};
    var $controller = $(controller);
    var tweenToNewSpeed = function(newSpeed, duration)
    {
        if (duration === undefined)
            duration = 600;
        $controller.stop(true).animate({curSpeed:newSpeed}, duration);
    };

    // Pause on hover
    scroller.hover(function(){
        tweenToNewSpeed(0);
    }, function(){
        tweenToNewSpeed(controller.fullSpeed);
    });

    // Scrolling management; start the automatical scrolling
    var doScroll = function()
    {
        var curX = scroller.scrollLeft();
        var newX = curX + controller.curSpeed;
        if (newX > fullW*2 - viewportW)
            newX -= fullW;
        scroller.scrollLeft(newX);
    };
    setInterval(doScroll, 20);
    tweenToNewSpeed(controller.fullSpeed);
});