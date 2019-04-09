//for indicators filter
var highGDPFilter = _.filter(parsedData,function(item){
  return item.properties.GDPlevel === "high";
});

var mediumGDPFilter =_.filter(parsedData,function(item){
  return item.properties.GDPlevel === "medium";
});

var lowGDPFilter =_.filter(parsedData,function(item){
  return item.properties.GDPlevel === "low";
});



var myStyle=function(feature){
  switch(feature.properties.GDPlevel){
    case "high":return{color:"#00FFFF"};
    case "medium":return{color:"#0000FF"};
    case "low":return{color:"#FF7F50"};
  }
  return {};
};

var myFilter = function(feature) {
  if (feature.properties.GDPlevel===' ') {
  return false;
  }
  else {
    return true;
  }
};

console.log('Included:', filtered_data1.length);
console.log('Excluded:', filtered_out1.length);

//slide functions
var slide1 = function(){
};


var state = {
  "slideNumber": 0, // slideNumber keeps track of what slide you are on. It should increase when you
                    // click the next button and decrease when you click the previous button. It
                    // should never get so large that it is bigger than the dataset. It should never
                    // get so small that it is smaller than 0.
  "mapped":undefined,
  "slideData": [
    {
      "GDP level": "High",
      "description": "high GDP cities",
    },
    {
      "GDP level": "mediumn",
      "description": "medium GDP cities",
    },
    {
      "GDP level": "low",
      "description": "low GDP cities",
    }
  ]
};

console.log(ChineseCities);
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

//clicking functions
var clickNextButton = function() {
  if (state.slideNumber<slideData.length){
    state.slideNumber +=1;
    console.log('slide'+state.slideNumber);
  }
  else state.slideNumber = 0;
  return state.slideNumber;
};

var clickPreviousButton = function() {
  if (state.slideNumber>0){
    state.slideNumber -=1;
    console.log('slide'+state.slideNumber);
  }
  else state.slideNumber = 0;
  return state.slideNumber;
};

$('#next').click(function(){
  clickNextButton();
  document.getElementById("results").style.display = "inline";
  if (state.slideNumber === 1){
    state.mapped = L.geoJSON(highGDPFilter).addTo(map);
    $('#main-heading').text('the high GDPlevel');
    $('#slidenumber').text('Slide' + state.slideNumber);
    $('#description').text(state.slideData[slideNumber-1].description);
  }
});

$('#previous').click(function(){
  clickPreviousButton();
  document.getElementById("results").style.display = "inline";
  if (state.slideNumber === slideData.length){
    state.mapped = L.geoJSON(lowGDPFilter).addTo(map);
    $('#main-heading').text('the low GDPlevel');
    $('#slidenumber').text('Slide' + state.slideNumber);
    $('#description').text(state.slideData[slideNumber-1].description);
  }
});



$(document).ready(function(dataset){
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
        style: MondayStyle,
        filter: myFilter
      }).addTo(map);
    });
  });

var eachFeatureFunction = function(layer) {
   layer.on('click', function (event) {
   document.getElementById("results").style.display = "inline";
   console.log(layer.feature);
     switch (layer.feature.properties.GDPlevel){
       case 'high':
         $('.day-of-week').text('Monday');
         break;
       case 'medium':
         $('.day-of-week').text('Tuesday');
         break;
       case 'low':
         $('.day-of-week').text('Wednesday');
         break;
   }
 });
};
