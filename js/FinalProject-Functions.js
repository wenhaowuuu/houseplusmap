/* ================================
Week 6 Assignment: Midterm Functions + Signatures
================================ */
//function 0
//download data
var url = "https://github.com/wenhaowuuu/week-6/blob/9e23f73c999515c2066197c089430a0e34980bbc/EconomicIndicator_Chinesecities.js";
var getAndParseData = function(url){
  $.ajax(url).done(function(d){
    var parseddata = JSON.parse(d);
    console.log(parseddata);
    return parseddata;
  });
};


//function 1
//remove myMarkers
var removeMarkers = function(array) {
  _.each(array,function(m){
    map.removeLayer(m);
  });
};

//function 2
//create myMarkers
var makeMarkers = function(array) {
  return _.map(array,function(p){
    // var lat = p.LAT;
    // var lon = p.LNG;
    // var veh = p.VEHICLE_CO;
    // var style = {'radius':veh*5, 'fillColor':'#cc5000'};
    // console.log(markers);
    return L.circleMarker([p.coordinates],style);
  });
};

//function 3
//plot myMarkers
var plotMarkers = function(array) {
  _.each(array,function(m){
    m.addTo(map);
  });
  console.log('mapped');
};

//function 4
//selecting those higher than certain GDP level
$(document).ready(function(){
  $('#plot').click(function(form){
    console.log('clicked');
    getAndParseData(url);
    makeMarkers(parseddata);
    plotMarkers(data);
    getInfo(form);
    console.log(form);
    plotting(form);
  });
  // Do your stuff here
});

//function 5
//selecting cities following in a range of GDP
var numericField1 = $('#GDPlow').val();
var numericField2 = $('#GDPhigh').val();
var filtered_data1 = [];
var filtered_out1 = [];
_.each(getAndParseData(),function(item){
  inbetween = item.GDPlevel > numericField1 && item.GDPlevel < numericField2;
  filter_condition = inbetween;
  if (filter_condition) {
    filtered_data1.push(item);
  } else {filtered_out1.push(item);
  }
});

console.log('Included:', filtered_data1.length);
console.log('Excluded:', filtered_out1.length);

//function 6
//selecting the user-specified population size cities
var numericField3 = $('#num3').val();
var filtered_data2 = [];
var filtered_out2 = [];
_.each(getAndParseData(),function(item){
  higherthan = item.population > numericField2;
  filter_condition = higherthan;
  if (filter_condition) {
    filtered_data2.push(item);
  } else {filtered_out2.push(item);
  }
});

console.log('Included:', filtered_data2.length);
console.log('Excluded:', filtered_out2.length);


//function 7
//if then statement selecting the top#1 city of function 6 result in investment proportion
var numericField1 = $('#num1').val();
var numericField2 = $('#num2').val();
var filtered_data1 = [];
var filtered_out1 = [];
_.each(getAndParseData(),function(item1){
  inbetween = item1.GDPlevel > numericField1 && item1.GDPlevel<numericField2;
  filter_condition = inbetween;
  if (filter_condition) {
    filtered_data1.push(item1);
  } else {filtered_out1.push(item1);
  }
});

console.log('Included:', filtered_data1.length);
console.log('Excluded:', filtered_out1.length);


//example function
var combineNames = function(str1,str2){
  var NewName = concatenated(str1,str2);
  console.log(NewName);
};

var produceArray = function(){
  var array = [2,3,5,7];
};

$(document).ready(function(){
  $('button').click(function(form){
    console.log('clicked');
    getInfo(form);
    console.log(form);
    plotting(form);
  });
});



/////////////////////////////////////////////////////////////////////////////////
var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "slideData": [
    {
      "name": "Leaflet",
      "language": "Javascript",
      "namespace": "L"
    },
    {
      "name": "Underscore",
      "language": "Javascript",
      "namespace": "_"
    },
    {
      "name": "jQuery",
      "language": "Javascript",
      "namespace": "$"
    }
  ]
};
var datalength = data.length;

var clickNextButton = function(num) {
  if (state.slideNumber<data.length){
    state.slideNumber +=1;
    console.log("slide"+state.slideNumber);
    removeMarkers();
  }
};

var clickPreviousButton = function() {
  if (state.slideNumber>0){
    state.slideNumber -=1;
    console.log("slide"+state.slideNumber);
  }
};

var saySlideName = function(){
    console.log(state.slideData.name);
  // saySlideName uses console.log to "say" the name of the slide it is given. It should run when
  // someone clicks on one of the buttons.
};

$('#nextButton').click(function(){
    console.log('clicked');
    clickNextButton();
});

$('#previousButton').click(function(){
    console.log('clicked');
    clickPreviousButton();
});

$('#SaynameButton').click(function(){
    console.log('clicked');
    saySlideName();
});
