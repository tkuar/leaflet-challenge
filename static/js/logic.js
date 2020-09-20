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
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
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

// Create a map object
var myMap = L.map("map", {
    center: [34, -96],
    zoom: 5,
    layers: [graymap, earthquakes]
});

// Pass map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// URL to earthquake data from USGS
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Grab the data with d3
d3.json(url, function (data) {
    // Loop through data
    for (var i = 0; i < data.features.length; i++) {
        // Set features' properties to a variable
        var properties = data.features[i].properties;

        // Check if it exists
        if (properties.mag) {
            // Set mag from properties a variable
            var mag = properties.mag;
        }

        // Check if it exists
        if (properties.place) {
            var place = properties.place;
        }

        // Check if it exists
        if (properties.time) {
            var time = properties.time;
        }

        // Set coordinates from features' geometry to a variable
        var coordinates = data.features[i].geometry.coordinates;

        // Check if it exists
        if (coordinates) {
            // Reformat the coordinates from features' geometry to [lat, lgn] and set to its own variable
            var latlng = [coordinates[1], coordinates[0]];
        }

        // Create a circle markers for earthquakes
        var markers = L.circle(latlng, {
            color: "black",
            fillColor: chooseColor(mag),
            fillOpacity: 1,
            weight: 0.5,
            radius: mag * 30000
        }).bindPopup(`<h4>Location: ${place}<hr>Magnitude: ${mag}<br>When: ${Date(time)}</h4>`).addTo(myMap);

        // Add marker to earthqakes overlayer
        markers.addTo(earthquakes);
    }
});

// Create a custom legend control
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0, 1, 2, 3, 4, 5];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add legend to map
legend.addTo(myMap);