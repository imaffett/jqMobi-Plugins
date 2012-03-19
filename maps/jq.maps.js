// @author Ian Maffett
// @copywrite AppMobi 2012
// Please see - https://developers.google.com/maps/documentation/javascript/ for the API


/**
 * jq.maps.js - google maps plugin wrapper for jqMobi apps.  You can pass in configuration options that are from the Google Maps API
   ```
   $("#map").gmaps({zoom: 8,center: new google.maps.LatLng(40.010787, -76.278076),mapTypeId: google.maps.MapTypeId.ROADMAP});   // create the map with basic options
   $("#map").gmaps() //return the google maps object back from cache
   ```
   *@param {Object} [options]
   *@title $().gmaps([options]);
   */
(function () {
    var gmapsLoaded = false;
    $(document).ready(function () {
        if(window['google']&&google.maps){
            $(document).trigger("gmaps:available");
            gmapsLoaded = true;
            return true;
        }
        var gmaps = document.createElement("script");
        gmaps.src = "http://maps.google.com/maps/api/js?sensor=true&callback=gmapsPluginLoaded";
        $("head").append(gmaps);
        window['gmapsPluginLoaded'] = function () {
            $(document).trigger("gmaps:available");
            gmapsLoaded = true;
        }
    });

    var mapsCache = [];

    $.fn.gmaps = function (opts) {
        if (this.length == 0) return;
        if (!opts) return mapsCache[this[0].id];
        for (var i = 0; i < this.length; i++) {
            new gmaps(this[i], opts);
        }
    };


    var gmaps = function (elem, opts) {
        var createMap = function () {
            if (!opts || Object.keys(opts).length == 0) {
                opts = {
                    zoom: 8,
                    center: new google.maps.LatLng(40.010787, -76.278076),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
            }
            mapsCache[elem.id] = new google.maps.Map(elem, opts);
            google.maps.event.trigger(mapsCache[elem.id], 'resize');
        }

        if (!gmapsLoaded) {
            $(document).one("gmaps:available", function () {
                createMap()
            });
        } else {
            createMap();
        }
    }
})(jq);