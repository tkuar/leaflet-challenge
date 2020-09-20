# leaflet-challenge

## Leaflet-Step-1 Summary: Basic Visualization

* This part of the homework utilizes both **HTML** and **Javascript**

* The data set come from the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page
   * This is the specific link that is used: <https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson>

* **GOALS**: Create a map using Leaflet that plots all of the earthquakes from the data set based on their latitude and longitude.
   
   * The data markers reflect the magnitude of the earthquake in both size and color. Earthquakes with higher magnitudes are larger and darker in color.
   
   * Each marker includes popups that provide additional information about the earthquake when it's clicked.
   
   * There is a legend that provides context for the map data.

## Leaflet-Step-2 Summary:  More Data

* This part of the homework contains all of the same features as in **Leaflet-Step-1**.

* The purpose of this part is to show the relationship between tectonic plates and seismic activity using data on tectonic plates from <https://github.com/fraxen/tectonicplates>
  
  * This is the specific link that is used: <https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json>

* **GOALS**:
  
  * Plot a tectonic plate data set on the map.
  
  * Add a number of base maps to choose from as well as separate out the two different data sets into overlays that can be turned on and off independently.
  
  * Add layer controls to the map.

### How to Run
* First, clone this repository.

* Next, add your `API_KEY` to the config.js files in _Leaflet-Step-1/static/js_ and _Leaflet-Step-2/static/js_, and run `python -m http.server` in your terminal or launch a live server.

* Then, navigate to **Leaflet-Step-1/index.html** and open in your default browser to run the first part of the homework.

* Lastly, navigate to **Leaflet-Step-2/index.html** and open in your default browser to run the second part of the homework.

### Resources

* <https://leafletjs.com/reference-1.7.1.html>

* <https://leafletjs.com/examples/geojson/>

* <https://leafletjs.com/examples/choropleth/>

* <https://stackoverflow.com/questions/37166172/mapbox-tiles-and-leafletjs>
