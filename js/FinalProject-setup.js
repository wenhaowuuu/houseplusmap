/* =====================
   You should NOT need to change this file
===================== */


/* =====================
  These are global variables that we can use throughout our application.
===================== */
// var myData;
// var myMarkers = [L.marker([39.9522, -75.1639])];
// var numericField1, numericField2, booleanField, stringField;

/* =====================
  Set up our map
===================== */
var map = L.map('map', {
  center: [32.9670, 117.5370],
  zoom: 5
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
  Add our dummy marker to the map
===================== */
