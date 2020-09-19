// Function to change circle marker color based on magnitude
function chooseColor(mag) {
    if (mag > 5) {
        return "#780000";
    }
    else if (mag > 4) {
        return "#dc0000";
    }
    else if (mag > 3) {
        return "#fd8c00";
    }
    else if (mag > 2) {
        return "#fdc500";
    }
    else if (mag > 1) {
        return "#32CC32";
    }
    else {
        return "#00ac46";
    }
}

// Create base layer
// Grayscale Layer
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v9",
    accessToken: API_KEY
});
// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "satellite-streets-v9",
//   accessToken: API_KEY
// }).addTo(myMap);

// Create a layer group for earthquakes
var earthquakes = L.layerGroup();

// Create a baseMaps object
var baseMaps = {
    "Grayscale": graymap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Earthquakes": earthquakes
  };
  // Creating map object
var myMap = L.map("map",{
    center: [34, -96],
    zoom: 5,
    layers: [graymap, earthquakes]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Grab the data with d3
d3.json(geoData, function (data) {
    // Loop through data
    for (var i = 0; i < data.features.length; i++) {
        // Set features' properties to a variable
        var properties = data.features[i].properties;
        
        // Set mag from properties to its own variable
        var mag = properties.mag;
        
        // Reformat the coordinates from features' geometry to [lat, lgn] and set to its own variable
        var latlng = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]];

        // Create a circle markers for earthquakes
        var markers = L.circle(latlng, {
            color: "black",
            fillColor: chooseColor(mag),
            fillOpacity: 1,
            weight: 0.5,
            radius: mag * 30000
        }).bindPopup(`<h4>Location: ${properties.place}<hr>Magnitude: ${mag}<br>When: ${Date(properties.time)}</h4>`).addTo(myMap);
    
        // Add marker to earthqakes overlayer
        markers.addTo(earthquakes);
    }

});