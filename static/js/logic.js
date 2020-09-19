// Creating map object
var myMap = L.map("map").setView([18, -66], 4);

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

// Create a circle and pass in some initial options
L.circle([45.52, -122.69], {
    color: "green",
    fillColor: "green",
    fillOpacity: 0.75,
    radius: 500
}).addTo(myMap);
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"