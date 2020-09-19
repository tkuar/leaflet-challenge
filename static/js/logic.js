  
// Creating map object
var myMap = L.map("map").setView([34, -96], 4.5);

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v9",
  accessToken: API_KEY
}).addTo(myMap);

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "satellite-streets-v9",
//   accessToken: API_KEY
// }).addTo(myMap);



var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

function chooseColor(mag) {
    if (mag > 5){
        return "#ff3333";
    }
    else if (mag > 4){
        return "#f5692e";
    }
    else if (mag > 3){
        return "#ffa91f";
    }
    else if (mag > 2){
        return "#fdac4e";
    }
    else if (mag > 1){
        return "#b6f104";
    }
    else {
        return "#1cd91c";
    }
}

d3.json(geoData, function(data){
    // Set properties from the data to a variable
    var properties = data.features[1].properties;
    // Set mag from properties to its own variable
    var mag = properties.mag;
    // Set only the lat and lgn from geometry to its own variable
    var latlng = [data.features[1].geometry.coordinates[1],data.features[1].geometry.coordinates[0]];
// Create a circle and pass in some initial options
L.circle(latlng, {
    color: "black",
    fillColor: chooseColor(mag),
    fillOpacity: 1,
    radius: mag * 30000
}).bindPopup("<h3>" + properties.place + "<br>Magnitude: " + mag).addTo(myMap);
});