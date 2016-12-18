//////////////////////////////
//Variables to help populate the diary
var HTMLdiaryStart = '<div class="diary-entry"></div>';

var HTMLdiaryTitle = '<div class="col-sm-6 text-center"><p align="justify class="pad-top""><h2>%data%</h2></p></div>';
var HTMLdiaryText = '<div class = "row"> <div class = col-sm-12><p align="justify">%data%</p></div></div>';

function HTMLgalleryStart(index) {
    return '<div class = "row"> <div class = "col-sm-12"><div id="scroller-'+index+'" style = "position: relative; height: 200px; margin: 0 auto;"> <div class="innerScrollArea innerScrollArea-'+index+'"> <ul>';
}

var HTMLgalleryImageLS = '<li> <img class="gallery-height" src="%data%" height="200" width="356"/>';
var HTMLgalleryImagePT = '<li> <img class="gallery-height" src="%data%" height="200" width="131"/>';

var HTMLdiaryImage = '<div class="row"><div class="col-sm-3"><img src="%data%" class="img-responsive fixedheight_small"></div>';
var HTMLdiaryDate = '<div class="row"><div class="col-sm-12 text-right" style="padding-top: 20px;">%data%</div><hr>';

function HTMLdiaryMap(index) {
    return '<div class="col-sm-3"><div class="fixedheight_small_right" id="map-'+index+'"></div> </div></div>';}

//////////////////////////////
//Create a google map that shows locations for each entry
    // declares a global map variable

function initializeMap(index,mapLocation) {
    var map;

    var mapOptions = {
        disableDefaultUI: true
    };

    console.log('#map-'+index)
    map = new google.maps.Map(document.querySelector('#map-'+index), mapOptions);

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

        // add the marker for each pin
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

    // pinPoster(locations) creates pins on the map for location
    pinPoster([mapLocation]);
    map.setZoom(6);
    
    }

//////////////////////////////
//Adds infinite scrolling to photobanner
function gallery_maker(index) {
    var scroller = $('div#scroller-'+index+' div.innerScrollArea.innerScrollArea-'+index);
    var scrollerContent = scroller.children('ul');
    scrollerContent.children().clone().appendTo(scrollerContent);
    var curX = 0;
    scrollerContent.children().each(function(){
        var $this = $(this);
        $this.css('left', curX);
        curX += $this.outerWidth(true);
    });
    var fullW = curX / 2;
    var viewportW = scroller.width();

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
    };