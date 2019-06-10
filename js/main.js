/* =====================
   You should NOT need to change this file (though you are not forbidden from doing so)
===================== */

/* =====================
  Call getAndParseData to grab our dataset through a jQuery.ajax call ($.ajax)
===================== */
//prepare the transformed data from csv



//claim the global variables:
// var zipcodes_url = "https://raw.githubusercontent.com/wenhaowuuu/CodeBrickMap/master/data/bay_zipcode.geojson";
var landuse_url = "https://raw.githubusercontent.com/wenhaowuuu/houseplusmap/master/data/20190409_PA_landuse_WGS.geojson";
var address_url = "https://raw.githubusercontent.com/wenhaowuuu/houseplusmap/master/data/20190427_PA_adpoints_joined_s.geojson";

var coordsMiddleSchools = [];
var heat_middleschools;
var CompanyMarkers = [];
var HomeMarkers = [];
// 1. setting up the base map
//1.SETTING UP THE BASEMAP
var southWest = L.latLng(37.015900, -123.355811),
    northEast = L.latLng(38.270170, -121.379737),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
 maxBounds: bounds,
 center: [37.440127, -122.147568],
 zoom: 15,
 minZoom: 7,
 maxZoom: 18
});



var lightmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
 subdomains: 'abcd'
});

var darkmap = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
 subdomains: 'abcd'
});

// var hybridmap = L.map('map-mappage').setView([-25.288145, -57.485214], 11);
var hybridmap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

var nightlightmap = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});

//add a scale bar to the map
L.control.scale().addTo(map);

// //add a location search box to the map
// use google?? Not that straightforward!
// var GooglePlacesSearchBox = L.Control.extend({
//   onAdd: function() {
//     var element = document.createElement("input");
//     element.id = "searchBox";
//     return element;
//   }
// });
// (new GooglePlacesSearchBox).addTo(map);
//
// var input = document.getElementById("searchBox");
// var searchBox = new google.maps.places.SearchBox(input);
//
// searchBox.addListener('places_changed', function() {
//   var places = searchBox.getPlaces();
//
//   if (places.length == 0) {
//     return;
//   }
//
//   var group = L.featureGroup();
//
//   places.forEach(function(place) {
//
//     // Create a marker for each place.
//     var marker = L.marker([
//       place.geometry.location.lat(),
//       place.geometry.location.lng()
//     ]);
//     group.addLayer(marker);
//   });
//
//   group.addTo(map);
//   map.fitBounds(group.getBounds());
//
// });


// var searchLayer = L.layerGroup().addTo(map);
// //... adding data in searchLayer ...
// map.addControl( new L.Control.Search({layer: searchLayer}) );

//also tried this, didn't work out
// var markersLayer = new L.LayerGroup();	//layer contain searched elements
//
// 	map.addLayer(markersLayer);
//
// var controlSearch = new L.Control.Search({
// 		position:'topleft',
// 		layer: markersLayer,
// 		initial: false,
// 		zoom: 12,
// 		marker: false,
//     // z-index: 50,
// 	});
// 	map.addControl( controlSearch );

//not useful below:
// var searchControl = new L.esri.Controls.Geosearch().addTo(map);
//
//   var results = new L.LayerGroup().addTo(map);
//
//   searchControl.on('results', function(data){
//     results.clearLayers();
//     for (var i = data.results.length - 1; i >= 0; i--) {
//       results.addLayer(L.marker(data.results[i].latlng));
//     }
//   });

setTimeout(function(){$('.pointer').fadeOut('slow');},3400);



//var satellite map
var mapLink =
   '<a href="http://www.esri.com/">Esri</a>';
var wholink =
   'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

var satellitemap = L.tileLayer(
   'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
   attribution: '&copy; '+mapLink+', '+wholink,
   minzoom: 5,
   maxZoom: 19,
});

$('#map-mappage').show(10000);
map.addLayer(lightmap);


//SWITCH THE BASEMAPS
$('#lightmap').click(function(){
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.addLayer(lightmap);
})
$('#darkmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(hybridmap);
  map.addLayer(darkmap);
})

$('#hybridmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.addLayer(hybridmap);
})

$('#satellitemap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.addLayer(satellitemap);
});

$('#nighlightmap').click(function(){
  map.removeLayer(lightmap);
  map.removeLayer(darkmap);
  map.removeLayer(hybridmap);
  map.removeLayer(satellitemap);
  // map.addLayer(nightlightmap);
});



//map zipcodes in the Bay Area
// $(document).ready(function(){
//   $.ajax(zipcodes_url).done(function(data) {
//     var parsedzipdata = JSON.parse(data);
//     console.log("zipcodes parsed");
//     var layerMappedPolygons = L.geoJson(parsedzipdata,
//       {
//         style: {opacity:0.4,width:0.5,color:'#E0903F'},
//         // filter: myFilter2,
//         pointToLayer: function (feature, latlngs) {
//           return new L.Polygon(latlngs, {
//             });
//           }
//       // }).addTo(map).bindPopup(feature.properties.zip);
//     }).addTo(map).bindTooltip("我们住同一个社区耶!");
//     });
// });



//map land use shapefiles in Palo Alto
// $(document).ready(function(){
//   $.ajax(landuse_url).done(function(data) {
//     var parsedzipdata1 = JSON.parse(data);
//     console.log("zipcodes parsed");
//     var layerMappedPolygons = L.geoJson(parsedzipdata1,
//       {
//         style: {opacity:0.8,width:0.8,color:'	#4169E1'},
//         // filter: myFilter2,
//         pointToLayer: function (feature, latlngs) {
//           return new L.Polygon(latlngs, {
//             });
//           }
//       // }).addTo(map).bindPopup(feature.properties.zip);
//     }).addTo(map).bindPopup("Check the land use zoning here!");
//     });
// });


//map the joined address point data
$(document).ready(function() {
        // $('#citypop').click(function(){
          // map.removeLayer(state.drawnOnMap);
          // map.removeLayer(layerMappedMarkers);
          $.ajax(address_url).done(function(data) {
            var parsedadptdata = JSON.parse(data);
            console.log("ad pts parsed");
            var layerMappedMarkers = L.geoJson(parsedadptdata,
              {
                pointToLayer: function (feature, latlng) {
                  return new L.Marker(latlng, {
                    icon:
                        new L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/wenhaowuuu/houseplusmap/master/house-icon-s.png',
                        // iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                        iconSize:     [15, 15],
                        shadowSize:   [10, 10],
                        iconAnchor:   [20, 20],
                    })
                  })

                  // .bindTooltip(feature.properties.Name + ': ' + feature.properties.Designatio);

                  .bindTooltip(
                               // "<img src=" + "/> " +
                               // "<img src=https://simplemaps.com/static/img/frog.png>" +
                               // "</br>" +

                               // "<b>Name: </b>" +
                               // place.FirstName + ' ' + place.LastName +
                               // "</br>" +

                               "<b>Address: </b>" +
                               feature.properties.Name +
                               "</br>" +

                               "<b>Zoning: </b>" +
                               feature.properties.Designatio +
                               "</br>"

                               // "<b>Relationship: </b>" +
                               // place.Relationship +
                               // "</br>" +

                               // + "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;'>Check!</button>"
                             ).bindPopup(
                               "<b>Name: </b>" +
                               feature.properties.Designatio +
                               "</br>" +

                               "</br><a class='btn btn-light my-2 my-sm-0' style='font-size:12px;' href='https://www.cityofpaloalto.org/civicax/filebank/documents/8700';return true;'>Check requirement!</a>"

                               // <a class='btn btn-light my-2 my-sm-0' style='font-size:12px;' href='https://www.som.com/projects';return true;'>Learn more</a>"

                             );

              }
            }).addTo(map);
          });
      // });

      // LOADING THE PLACE POINTS INFO INTO THE HEATMAP SOURCE FILE
      // var place = sheet[i]; //getting e row from table
      //          var coord = [place.Hlat, place.Hlon];
      //          coordsMiddleSchools.push(coord);
      //
      //
      //
      // GENERATING THE HEATMAP BASED ON RECORDED POINTS
      // Reference
      //    // http://jsfiddle.net/jpeter06/yugh7t5m/
      //
      //    coordsMiddleSchools = coordsMiddleSchools.map(function (p) { return [p[0], p[1], 6]; });
      //    console.log(coordsMiddleSchools);
      //    // console.log(middleschools);
      //
      //     heat_middleschools = L.heatLayer(coordsMiddleSchools,{
      //
      //            radius: 36,
      //            blur: 24,
      //            maxZoom: 12,
      //
      //            // onEachFeature: function(feature,layer){
      //            //   console.log(layer.feature.geometry);
      //            //   // var coord = layer.feature.geometry.coordinates;
      //            //   // coordsMiddleSchools.push(coord);
      //            // },
      //
      //        });
      //
      //    console.log("middleschools heatmap generated.");



    }
  );

//
// $('#submit').click(function(){
//
// });

//add the point data from the shared google sheet
// var code = "2PACX-1vS7PmW1BbpRdjWqeTQJM7SjHKsuVMJAFf9-b5-BzTEtz15xcQ7Rz4a6VKGV09dArOFG8hb6C66Ydnww";
var sheeturl = 'https://docs.google.com/spreadsheets/d/1zX6g_gXPk90VrilFbLnbmhJJpjfTfE5FVsIbqEpbAiw/edit?usp=sharing';

//load user input address
var ad_input;


// MAP THE POINTS FROM THE GOOGLE SHEET

//search for the database
document.addEventListener('DOMContentLoaded',function(){
//tried to load the google sheet dots within the button click event, but no good luck -
// document.getElementById("submit").addEventListener("click",function(){

  ad_input = $('#address').val();
  console.log(ad_input);

var LATLNG = [];

 Tabletop.init({
     key: sheeturl, //google spreadsheet id
     callback: function(sheet, tabletop){

       // $("#submit").click(function(){
         for (var i in sheet){
           var place = sheet[i]; //getting e row from table


           // if (ad_input<>"Address"){
           //this code takes 20 second to return the selected location points!
             if (place.Name.includes("108 California")){
               var CompanyLayerMappedMarker = L.marker([place.LAT, place.LON]).addTo(map)
                 .bindPopup(
                   // "<img src=" + "/> " +
                   // "<img src=https://ibb.co/WzbnY1P>" +
                   "</br>" +

                   // "<b>Name: </b>" +
                   // place.FirstName + ' ' + place.LastName +
                   // "</br>" +

                   "<b>Address: </b>" +
                   place.Name +
                   "</br>" +

                   "<b>Zoning: </b>" +
                   place.Designatio +
                   "</br>" +

                   "<b>Extension: </b>" +
                   "Yes" +
                   "</br>" +

                   "</br><button class='btn btn-light my-2 my-sm-0' style='font-size:12px;'>See potential!</button>"
                 );



                 CompanyMarkers.push(CompanyLayerMappedMarker);
                 // console.log(CompanyMarkers);
                 console.log("company marker generated.");

                 LATLNG.push([place.LAT, place.LON]);
             };
             }
             var bounds = new L.LatLngBounds(LATLNG);
             map.fitBounds(bounds);
       // })

     },
     simpleSheet: true
   });

   //GENERATE HEATMAP FOR THE MIDDLE SCHOOL DATA

   //Reference
   // http://jsfiddle.net/jpeter06/yugh7t5m/

   // coordsMiddleSchools = coordsMiddleSchools.map(function (p) { return [p[0], p[1], 6]; });
   // console.log(coordsMiddleSchools);
   // console.log(middleschools);

   //  heat_middleschools = L.heatLayer(coordsMiddleSchools,{
   //
   //         radius: 36,
   //         blur: 24,
   //         maxZoom: 12,
   //
   //         // onEachFeature: function(feature,layer){
   //         //   console.log(layer.feature.geometry);
   //         //   // var coord = layer.feature.geometry.coordinates;
   //         //   // coordsMiddleSchools.push(coord);
   //         // },
   //
   //     });
   //
   // console.log("middleschools heatmap generated.");



}

// function showInfo(data, tabletop) {
//   alert('Successfully processed!')
//   console.log(data);
// }
);






//control heatmap generation
var heatmapcount = 0;
$('#heatmapcontrol').click(function(){
  heatmapcount++;
  if(heatmapcount%2 === 0){
    map.removeLayer(heat_middleschools);
    console.log("heatmap removed.");
  }
  else{
    map.addLayer(heat_middleschools);
  }
});


//switch on the company markers
//still need to bring the effect in!!!
var ShowCompany = function(){
  map.removeLayer(HomeMarkers);
  map.addLayer(CompanyMarkers);
  console.log("company markers added.");
  // reference:
  // https://jsfiddle.net/a99dkxp1/4/
};


//Load PDF layout page for each property while clicing
var tableToPDF = function(){
  console.log("PDF starts");
  // SETTUING THE THE PDF PARAMETERS
  // https://stackoverflow.com/questions/24335372/setting-pdf-page-width-height-when-using-jspdf
  var doc = new jsPDF("1", "", "letter");
  var pageHeight = doc.internal.pageSize.height;
  var pageWidth = doc.internal.pageSize.width;
  console.log(pageHeight);
  console.log(pageWidth);

  // doc.addImage(imgData, 'JPEG', 164, 14, 35, 12, undefined);

  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150,5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);

  doc.setFont("times");
  doc.setFontSize(18);
  doc.setFontType("bold");
  doc.text(10, 18, 'Infrastructure Efficiency Profile of ');
  doc.setTextColor(255,140,40);
  doc.text(110, 18, ' ' + P_muni);
  // doc.text(20, 30, '     ');

  //INTRO
  doc.setFont("times");
  doc.setFontType("normal");
  doc.setFontSize(12);
  doc.setTextColor(0,0,0);
  doc.text(10, 30, 'Following is a brief summary of infrastructure efficiency condition in ');
  doc.text(10, 36, '' + P_muni + ', department of ' + P_department + ', in ' + P_country + '.');
  // doc.text(10, 50, 'this City of ' + P_muni + ' is selected.');

  // doc.addImage(mapData1, 'JPEG', 10, 40, 195, 76, undefined);


  //INSERT THE GRAPH & CHARTS
  //DEFINE THE DIFFERENT COLOR???

  //REFERENCE HERE
  //https://stackoverflow.com/questions/43664722/how-to-save-chart-js-charts-as-image-without-black-background-using-blobs-and-fi
  // layout A
  //
  // var newCanvas1 = document.querySelector('#myChart1');
  // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg1,'JPEG', 120, 130, 80, 80);
  //
  // var newCanvas2 = document.querySelector('#myChart2');
  // var newCanvasImg2 = newCanvas2.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 120, 220, 60, 40);



  // //another graph maybe?
  // var newCanvas3 = document.querySelector('#myChart2');
  // var newCanvasImg3 = newCanvas3.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 98, 80, 60, 40);

  //LAYOUT OPTION B - GRAPH FIRST
  // var newCanvas1 = document.querySelector('#myChart1');
  // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg1,'JPEG', 10, 40, 80, 80);
  //
  // var newCanvas2 = document.querySelector('#myChart2');
  // var newCanvasImg2 = newCanvas2.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 98, 40, 60, 40);
  //
  // //another graph maybe?
  // var newCanvas3 = document.querySelector('#myChart2');
  // var newCanvasImg3 = newCanvas3.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 98, 80, 60, 40);



  //TRIAL 2 STACKED BAR CHART

  //SOCIAL ECONOMIC INFO
  var splitTitle = doc.splitTextToSize("      Guatemala, a Central American country south of Mexico, is home to volcanoes, rainforests and ancient Mayan sites. The capital, Guatemala City, features the stately National Palace of Culture and the National Museum of Archaeology and Ethnology. Antigua, west of the capital, contains preserved Spanish colonial buildings. Lake Atitlán, formed in a massive volcanic crater, is surrounded by coffee fields and villages. Guatemala City is the capital of Guatemala, in Central America. It’s known for its Mayan history, high-altitude location and nearby volcanoes. On central Plaza Mayor, also known as Parque Central, the Metropolitan Cathedral is full of colonial paintings and religious carvings. The National Palace of Culture has a balcony overlooking the square. South of the city, trails lead up to the active Pacaya Volcano.", 90);
  doc.text(10, 130, splitTitle);

  // doc.setFont("georgia");
  // doc.setFontType("bold");
  // doc.text(10, 130, '1) SOCIAL-ECONOMIC');
  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(10, 138, P_muni + ' has a poverty rate of ' + P_pov.toFixed(3) + '%.');



  //TRANSPORTATION
  // doc.setFont("georgia");
  // doc.setFontType("bold");
  // doc.text(10, 150, '2) TRANSPORTATION');
  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(10, 158, 'Total Length of Road: ' + P_length.toFixed(3) + ' km');
  // doc.text(10, 164, 'Road Density: ' + P_density.toFixed(3) + ' km per square km');
  // doc.text(10, 170, 'Road in Urban Area: ' + P_rd_urban.toFixed(3) + ' km');
  // doc.text(10, 176, 'Road in Rural Area: ' + P_rd_rural.toFixed(3) + ' km');
  // doc.text(10, 182, 'Major Road: ' + P_rd_1.toFixed(3) + ' km');
  // doc.text(10, 188, 'Secondary Road: ' + P_rd_2.toFixed(3) + ' km');
  // doc.text(10, 194, 'Tertiary Road: ' + P_rd_3.toFixed(3) + ' km');
  // doc.text(10, 200, 'Urban Road: ' + P_rd_urban.toFixed(3) + ' km');
  // doc.text(10, 206, 'Rural Road: ' + P_rd_rural.toFixed(3) + ' km');
  // doc.text(10, 212, 'Road Efficiency');
  // doc.text(10, 218, '(% population within 30 minutes of road): ' + '41%');





  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 1 of 3');



  // JUMP TO THE SECOND PAGE
  // ADD ANOTHER PAGE
  // REFERENCE
  // https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderrer
  // https://github.com/MrRio/jsPDF/issues/101
  // https://stackoverflow.com/questions/25904440/jspdf-addhtml-multiple-canvas-page
  doc.addPage();
  doc.setPage(2);

  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150, 5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);


  //TABLE HEADING STARTS HERE


  //for tables in PDF
  // VERY GOOD EXAMPLE HERE
  // https://github.com/simonbengtsson/jsPDF-AutoTable




  //GOOD REFERENCE
  // https://mrrio.github.io/
  // define the map as an image
  // var columns = ["INDICATORS", "Name", "Country"];
  // var rows = [
  //            [1, "Peten", "Guatemala"],
  //            [2, "La Ibertad", "Guatemala"],
  //            [3, "Garcia", "Guatemala"],
  //          ];
  //


  var columns = [
           {title: "Subjects", dataKey: "sb"},
           {title: "Indicators", dataKey: "id"},
           {title: "Value", dataKey: "val"},
         ];
  var rows = [
           {"sb": "TRANSPORTATION", "id": "Total Road Length (km)", "val": P_length.toFixed(3)},
           {"sb": "", "id": "Road Density (km per sq km)", "val": P_density.toFixed(3)},
           {"sb": "", "id": "Major Road (km)", "val": P_rd_1.toFixed(3)},
           {"sb": "", "id": "Secondary Road (km)", "val": P_rd_2.toFixed(3)},
           {"sb": "", "id": "Tertiary Road (km)", "val": P_rd_3.toFixed(3)},
           {"sb": "", "id": "", "val": ""},
           {"sb": "UTILITIES", "id": "Sanitation", "val": "67%"},
           {"sb": "", "id": "Electricity", "val": "84%"},
           {"sb": "", "id": "Water", "val": "90%"},
           {"sb": "", "id": "Basic Needs Unsatisfied", "val": "28%"},
           {"sb": "", "id": "", "val": ""},
           {"sb": "EDUCATION", "id": "Literacy Rates", "val": "75%"},
           {"sb": "", "id": "Number of Primary Schools", "val": "311"},
           {"sb": "", "id": "Number of Middle Schools", "val": "69"},
           {"sb": "", "id": "Number of High Schools", "val": "18"},
           {"sb": "", "id": "Total Enrollment Number", "val": "12067"},
           {"sb": "", "id": "", "val": ""},
           {"sb": "PUBLC HEALTH", "id": "Number of Hospitals", "val": "3"},
           {"sb": "", "id": "Number of Clinics", "val": "42"},
           {"sb": "", "id": "Maximum Capacity of Medical Treatment", "val": "30021"},

         ];

  // reference doc.addImage(div,'JPEG', 174, 40, 48, 32);
  // doc.autoTable(columns, rows);


  // doc.autoTable(columns, rows, {
  //   // header: {textColor: 255, fillColor: [41, 128, 185], fontStyle: 'bold'},
  //   headerStyles: {fillColor: [255, 140, 40]},
  //   alternateRow: { fillColor: 211},
  //   styles: {
  //     // fillColor: [245, 245, 245]
  //     // fillColor: [214, 225, 225]
  //   },
  //   // rowStyles: {
  //   //   {fillColor: [255, 140, 40]}
  //   //
  //   // },
  //
  //   columnStyles: {
  //     // sb: {fillColor: [214, 225, 225]},
  //   	// id: {fillColor: [255,140,0],
  //     },
  //
  //   margin: {left: 10, top: 20},
  //   addPageContent: function(data) {
  //     doc.setFontSize(14);
  //     doc.setFontType("bold");
  //     doc.setFont("georgia");
  //   	doc.text("Table of Indicators", 10, 16);
  //   }
  // });

  // generate table reference here
  // GREAT EXAMPLE!!
  // 0: https://simonbengtsson.github.io/jsPDF-AutoTable/
  // 1: https://stackoverflow.com/questions/19807870/how-to-export-the-html-tables-data-into-pdf-using-jspdf
  // 2: https://stackoverflow.com/questions/23018171/create-pdf-using-jspdf-with-formatted-table-data

  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 2 of 3');

  //THE THIRD PAGE FOR TABLE ONLY
  doc.addPage();
  doc.setPage(3);


  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150, 5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);


  //EDUCATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.setFontSize(12);
  doc.text(10, 18, '1) EDUCATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 26, 'Literacy Rate: ' + '75%');
  doc.text(10, 32, 'Number of Primary Schools: ' + '311');
  doc.text(10, 38, 'Number of Middle Schools: ' + '69');
  doc.text(10, 44, 'Number of High Schools: ' + '18');
  doc.text(10, 50, 'Total Enrollment Number: ' + '12067');

  //PUBLIC HEALTH
  doc.setFont("georgia");
  doc.setFontType("bold");
  // doc.setFontSize(12);
  doc.text(10, 62, '2) PUBLIC HEALTH');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 70, 'Number of Hospitals: ' + '3');
  doc.text(10, 76, 'Number of Clinics: ' + '42');
  doc.text(10, 82, 'Maximum Capacity for Medical Treatment: ' + '30021');

  //UTILITY
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 94, '3) UTILITIES');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 102, 'Sanitation (% of coverage): ' + '1000 km');
  doc.text(10, 108, 'Electricity (% of coverage): ' + '1000 km');
  doc.text(10, 114, 'Water (% of coverage): ' + '1000 km');
  doc.text(10, 120, 'Basic Needs Unsatisfied (% of coverage): ' + '50%');

  //OTHER NOTES
  doc.setFont("georgia");
  doc.text(10, 250, 'Notes: ' + 'things to keep in mind');

  //OTHER NOTES
  doc.setFont("times");
  doc.setFontType("italic");
  doc.setFontSize(10);
  doc.text(10, 260, '* This data was obtained from ');
  doc.text(10, 265, '' + P_source);


  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 2 of 3');







  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(105, 80, 'This is centred text.', null, null, 'center');
  // doc.text(105, 90, 'And a little bit more underneath it.', null, null, 'center');
  // doc.text(200, 100, 'This is right aligned text', null, null, 'right');
  // doc.text(200, 110, 'And some more', null, null, 'right');
  // doc.text(20, 120, 'Back to left');
  //
  // doc.text(20, 140, '10 degrees rotated', null, 10);
  // doc.text(20, 160, '-10 degrees rotated', null, -10);




  doc.save('test.pdf');
  console.log("PDF ready");

};






//SWITCH THE BASEMAPS
// $('#lightmap').click(function(){
//   map.removeLayer(darkmap);
//   map.removeLayer(hybridmap);
//   map.addLayer(lightmap);
// })
// $('#darkmap').click(function(){
//   map.removeLayer(lightmap);
//   map.removeLayer(hybridmap);
//   map.addLayer(darkmap);
// })
//
// $('#hybridmap').click(function(){
//   map.removeLayer(lightmap);
//   map.removeLayer(darkmap);
//   map.addLayer(hybridmap);
// })
//
// $('#satellitemap').click(function(){
//   map.removeLayer(lightmap);
//   map.removeLayer(darkmap);
//   map.removeLayer(hybridmap);
//   map.addLayer(satellitemap);
// });


//2. Obtaining the data from GoogleSheet


///1.1 DEFINE GLOBAL VARIABLES
// var url = "https://search.mapzen.com/v1/search?api_key=mapzen-Dok7vcm&size=1&text=";
// var newurl = "";
//
// var urlsmproute = "https://valhalla.mapzen.com/route?api_key=mapzen-Dok7vcm&json=";
// var newurlsmproute = "";
//
// var featureGroup = [];
// var filteredfeatureGroup = [];
// var jsontoadd = {"locations":[],"costing":"auto","directions_options":{"units":"miles"}};
//
// var OriginLat = "";
// var OriginLon = "";
// var DestLat = "";
// var DestLon = "";
//
//
// var layerMappedMarkers;
// var slideNumber = 0;
// var parsedData;
// var parsedData2;
// var parsedData3;
// var parsedData4;
// var dataset0 = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
// var dataset = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
// var dataset2 = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/geojson/housingprice_Beijing.geojson";
// var dataset3 = "https://raw.githubusercontent.com/wenhaowuuu/FinalProject/master/data/china_provincies_def.geojson";
//
//
// var filterFunction;
//
//
// ///1.2 DEFINE IMAGES AND ICONS
// ///////////////Q1 ICON CUSTOMIZATION
// var myIcon = new L.icon({
//     iconUrl: 'https://image.ibb.co/b3jGbQ/city_icons_beijing_01.png',
//     iconSize:     [30, 30],
//     shadowSize:   [50, 64],
//     iconAnchor:   [20, 20],
// });
//
// var myIcon2 = new L.icon({
//     iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//     iconSize:     [30, 30],
//     shadowSize:   [30, 44],
//     iconAnchor:   [20, 20],
// });
//
// //////////////////////////////////////////PART 2  USER INPUT////////////////////////////////
// ///2.1 DEFINE ADD PAGE FUNCTION
//
// var state = {
//   slideNumber: 0,
//   slideData:[
//     {
//       "name": "The Original List of Chinese Cities",
//       "content": "Here presented are economic development data for the 35 provincial capital cities in China.",
//     },
//     {
//       "name": "Cities with the Highest GDP",
//       "content": "These are the cities with the highest GDP. Move your mouse over the markers to see.",
//       "filter": {
//         "key": "GDP",
//         "comparison": "greaterThan",
//         "value": 12000,
//       }
//     },
//     {
//       "name": "The Most Populated Cities",
//       "content": "These are the megacities with over 9,000,000 residents.",
//       "filter": {
//         "key": "Population",
//         "comparison": "greaterThan",
//         "value": 900,
//       }
//     },
//     {
//       "name": "Cities with the Highest Per Capita Income",
//       "content": "These are the richest cities.",
//       "filter": {
//         "key": "PersonalAnnualIncome",
//         "comparison": "greaterThan",
//         "value": 60000,
//       },
//     },
//   ],
//   drawnOnMap: undefined,
//   dataSource: undefined
// };
//
// /* -----------------
// Load data
// ----------------- */
// $.ajax(dataset).done(function(data){
//   state.dataSource = JSON.parse(data);
//   // Add the first slide
//   addSlide(state.slideData[0]);
// });
//
// /* -----------------
// Application functions
// ----------------- */
// // Increase state counter by one
// var next = function() {
//   state.slideNumber++;
// };
//
// // Increase decrease state counter by one
// var previous = function() {
//   state.slideNumber--;
// };
//
// // Check to see if markers have been added to the map.
// // If they have, remove them. Checking first prevents an error.
// var removeDrawnOnMap = function() {
//   if (typeof state.drawnOnMap !== 'undefined') {
//     map.removeLayer(state.drawnOnMap);
//     state.drawnOnMap = undefined;
//   }
// };
//
//
//
//
// // //////FROM JEFF'S DEMO///////
// // Return a style object.
// // The object should contain a color based on the feature material type.
// var generateStyleObject = function(feature) {
//   if (feature.properties.PersonalAnnualIncomeLevel == "high") {
//     return { color: "#00DEA6" };
//   } else if (feature.properties.PersonalAnnualIncomeLevel == "medium") {
//     return { color: "#FFA58A" };
//   } else if (feature.properties.PersonalAnnualIncomeLevel == "low") {
//     return { color: "#FF3D5E" };
//   } else {
//     return { color: "#B591F5" };
//   }
// };
//
// var drawOnMap = function(data, filter) {
//   // If this particular slide includes the filter property,
//   // then apply the following filter. If not, ignore this code.
//   // This means I can choose whether a slide uses a filter based
//   // on whether or not I include a filter on the slide. Note that
//   // the first and last slides do not contain a filter.
//   if (typeof filter !== 'undefined') {
//     filterFunction = function(feature) {
//       if (filter.comparison === "lessThan") {
//         return feature.properties[filter.key] < filter.value;
//       } else if (filter.comparison === "equals") {
//         return feature.properties[filter.key] === filter.value;
//       } else if (filter.comparison === "greaterThan") {
//         return feature.properties[filter.key] > filter.value;
//       }
//     };
//   }
//   // Create a leaflet layer and add it to the map. Store this layer
//   // as state.drawnOnMap. I will refer to this later when I want
//   // to remove this layer from the map and when I want to use getBounds
//   // to get the bounds of this layer.
//
// state.drawnOnMap = L.geoJson(state.dataSource, {
//     filter: filterFunction,
//     pointToLayer: function (feature, latlng) {
//       var style = generateStyleObject(feature);
//       var popupText = "In 2009, " +feature.properties.CityName + " has a GDP of RMB " +feature.properties.GDP + "00 million. It has a population of " + feature.properties.Population + "0000. " + feature.properties['investment proportion'] +" of its economy is driven by investment.";
//       return new L.Marker(latlng, {
//         icon: myIcon2
//       })
//       .bindPopup(popupText);
//     }
//   }).addTo(map);
// };
//
//
// ///////////////////////////////
//
// var addSlide = function(slide) {
//   drawOnMap(state.dataSource, slide.filter);
//   $("#sidebar-heading").text(slide.name);
//   $("#sidebar-text").text(slide.content);
// };
//
//
//
// /* -----------------
// Click events
// ----------------- */
//
// $('#next').click(function() {
//   next();
//   removeDrawnOnMap();
//   // Note the use of state.slideData[state.slideNumber].
//   // This returns the slide for my current state.
//   addSlide(state.slideData[state.slideNumber]);
// });
//
// $('#previous').click(function() {
//   previous();
//   removeDrawnOnMap();
//   // Note the use of state.slideData[state.slideNumber].
//   // This returns the slide for my current state.
//   addSlide(state.slideData[state.slideNumber]);
// });
//
// /////////////----------------------------------------------------------------------//////////////
//
//
//
//
// /////////////////////////ADD MAPS FROM CARTODB//////////////////////////////////
// ////GLOBAL LEVEL////
// ////Add this map of global cities////////////////
// var cartoUserName = 'wenhaowuuu';
// var cartoVizId0 = '49121306-26ae-11e7-9a30-0e233c30368f';
// var layerUrl0 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId0+'/viz.json';
// console.log('global city added');
//
// var cartoVizId1 = 'd7586d72-26d6-11e7-9427-0e3ebc282e83';
// var layerUrl1 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId1+'/viz.json';
// console.log('provinces added');
//
// cartodb.createLayer(map, layerUrl0)
//   .on('done', function(layer1) {
//     layer1.addTo(map);
//     console.log('cities added1');
//     $('#beijing').click(function(){
//         layer1.hide();
//     });
//     $('#global').click(function(){
//       map.fitBounds(layer1.getBounds(),{
//         padding: [10,10]
//       });
//     });
//   }).on('error', function(err) {
//     console.log(err);
//   });
//
// $('#national').click(function(){
//   cartodb.createLayer(map, layerUrl1)
//     .on('done', function(layer1) {
//       layer1.addTo(map);
//       console.log('provinces added1');
//       $('#beijing').click(function(){
//           layer1.hide();
//       });
//     }).on('error', function(err) {
//       console.log(err);
//     });
// });
//
//
//
// ////PROVINCE WITH GDP GROWTH RATE////
// ///DEFINE STYLE AND FILTER///
// var myStyle2=function(feature){
//   var Rate = feature.properties.bbp_groei_____per_provincie__2013_;
//   var Number = parseFloat(Rate);
//   console.log(Number);
//
//   if (Number<7.7){
//     return{color:"#486cd3"};
//   }else if(7.7<Number && Number<10.0){
//     return{color:"#48d3af"};
//   }else if(10.0<Number){
//     return{color:"#e73115"};
//   }
// };
// var myFilter2 = function(feature) {
//   if (feature.properties.bbp_groei_____per_provincie__2013_===' ') {
//   return false;
//   }
//   else {
//     return true;
//   }
// };
//
// ////ADD PROVINCE WITH GDP GROWTH RATE////
// $(document).ready(function(){
//   $.ajax(dataset3).done(function(data) {
//     parsedData3 = JSON.parse(data);
//     console.log("parsed3");
//     layerMappedPolygons = L.geoJson(parsedData3,
//       {
//         style: myStyle2,
//         filter: myFilter2,
//         pointToLayer: function (feature, latlngs) {
//           return new L.Polygon(latlngs, {
//             });
//           }
//       }).addTo(map).bindPopup(feature.properties.provincie);
//     });
// });
//
//
// ///CITY DATA PRESENTATION
// // var layerMappedMarkers;
// //CITY DATA WITH POPULATION SIZE////
// $(document).ready(function() {
//         $('#citypop').click(function(){
//           map.removeLayer(state.drawnOnMap);
//           map.removeLayer(layerMappedMarkers);
//             layerMappedMarkers = L.geoJson(state.dataSource,{
//             pointToLayer: function (feature, latlng) {
//               return new L.Marker(latlng, {
//                 icon:
//                       new L.icon({
//                       iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//                       iconSize:     [feature.properties.Population*0.03, feature.properties.Population*0.03],                      shadowSize:   [30, 44],
//                       iconAnchor:   [20, 20],
//                   })
//                 }).bindPopup(feature.properties.CityName + ': ' + feature.properties.Population);
//             }
//           }).addTo(map);
//       });
//
//       $('#citygdp').click(function(){
//         map.removeLayer(state.drawnOnMap);
//         map.removeLayer(layerMappedMarkers);
//         layerMappedMarkers = L.geoJson(parsedData,{
//         pointToLayer: function (feature, latlng) {
//             return new L.Marker(latlng, {
//               icon:
//                   new L.icon({
//                   iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//                   iconSize:     [feature.properties.GDP*0.003, feature.properties.GDP*0.003],
//                   shadowSize:   [30, 44],
//                   iconAnchor:   [20, 20],
//                 })
//               }).bindPopup(feature.properties.CityName + ': ' + feature.properties.GDP);
//           }
//         }).addTo(map);
//       });
//
//       $('#cityincome').click(function(){
//         map.removeLayer(state.drawnOnMap);
//         map.removeLayer(layerMappedMarkers);
//         layerMappedMarkers = L.geoJson(parsedData,{
//         pointToLayer: function (feature, latlng) {
//           return new L.Marker(latlng, {
//             icon:
//                   new L.icon({
//                   iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
//                   iconSize:     [feature.properties.PersonalAnnualIncome*0.0007, feature.properties.PersonalAnnualIncome*0.0007],
//                   shadowSize:   [30, 44],
//                   iconAnchor:   [20, 20],
//               })
//             }).bindPopup(feature.properties.CityName + ': ' + feature.properties.PersonalAnnualIncome);
//           }
//         }).addTo(map);
//       });
//     });
//
//
// ////ZOOM TO CHINA NATIONAL LEVEL//////
// ////NATIONAL CITIES////
// $(document).ready(function() {
//   $('#national').click(function(){
//             map.removeLayer(state.drawnOnMap);
//             $.ajax(dataset0).done(function(data) {
//               var style = {color:"#E3DF27"};
//               parsedData = JSON.parse(data);
//               layerMappedMarkers = L.geoJson(parsedData,{
//                 pointToLayer: function (feature, latlng) {
//                   link = 'https://en.wikipedia.org/wiki/' +feature.properties.CityName;
//                   html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
//                   var popuptext = feature.properties.CityName + html + "<p class = intro> or copy the link below</p>" + '    ' + link;
//                   return L.circleMarker(latlng,style)
//                     .bindPopup(popuptext);
//                 }
//               }).addTo(map);
//               map.fitBounds(layerMappedMarkers.getBounds(),{
//                 padding: [10,10]
//               });
//             });
//           }
//       );
// });
//
//
//
// //////ZOOM INTO BEIJING REAL ESTATE DATA//////
// // ////BEIJING REAL ESTATE DATA////
// $(document).ready(function() {
//   $('#beijing').click(function(){
//     $.ajax(dataset2).done(function(data) {
//       parsedData2 = JSON.parse(data);
//       layerMappedMarkers = L.geoJson(parsedData2,{
//         pointToLayer: function (feature, latlng) {
//
//           html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
//           var popuptext = feature.properties.name + html + "<p class = listing> This property was built in </p>" +feature.properties.yearbuilt+ "<p class = listing> The price per sq meter is </p>" + "RMB " +feature.properties.priceperm2;
//           return new L.Marker(latlng, {
//             // Specify which custom icon you want to use
//             icon: myIcon
//           }).bindPopup(popuptext).addEventListener("click",
//             function(e){
//               DestLon = feature.geometry.coordinates[0];
//               DestLat = feature.geometry.coordinates[1];
//               console.log(DestLon,DestLat);
//           });
//         }
//       }).addTo(map);
//       map.fitBounds(layerMappedMarkers.getBounds(),{
//         padding: [10,10]
//       });
//       $('#national').click(function(){
//         map.removeLayer(layerMappedMarkers);
//       });
//     });
//   });
// });
//
//
// ///2.2 SEARCH AND ADD SIMPLE ROUTE TO MAP
// ////SHOW THE SEARCH RESULT////
// $(document).ready(function(){
//   $('#Search').click(function(){
//     newurl = url + $('#dest').val();
//     console.log(newurl);
//     $.ajax(newurl).done(function(data){
//       console.log("downloaded");
//       var parsedData4 = JSON.parse(JSON.stringify(data));
//       console.log("parsed");
//       featureGroup.push(L.geoJSON(parsedData4,{
//       }).addTo(map));
//       $('#national').click(function(){
//         map.removeLayer(featureGroup);
//       });
//       OriginLat = data.features[0].geometry.coordinates[1];
//       OriginLon = data.features[0].geometry.coordinates[0];
//       console.log("added");
//       });
//     });
// });
//
// ////SHOW THE OPTIMAL ROUTE////
// $('#Route').click(function(){
//   $(document).ready(function() {
//     jsontoadd.locations.push({"lat":OriginLat,"lon":OriginLon},{"lat":DestLat,"lon":DestLon});
//       console.log("points added");
//       newurlsmproute = urlsmproute + JSON.stringify(jsontoadd);
//       console.log(newurlsmproute);
//       $.ajax(newurlsmproute).done(function(data){
//         var string = data.trip.legs[0].shape;
//         console.log("string");
//         var decodedData = decode(string,6);
//         console.log("decodedData");
//         var linestring1 = turf.lineString(_.map(decodedData,function(data){
//         return data.reverse();}));
//         //CONVERT TO GEOJSON LINE//
//         var lineStyle = {
//           "color": "red",
//           "weight": 3,
//           "opacity":0.75,
//           "dashArray": "8 8"
//         };
//         var Route = L.geoJSON(linestring1,{
//           style:lineStyle
//         }).addTo(map);
//         $('#national').click(function(){
//           map.removeLayer(Route);
//         });
//       });
//     });
// });
