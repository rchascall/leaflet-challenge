// Store API endpoint as queryUrl
// Past 30 days M2.5+ Earthquakes
var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

// Perform GET request to query the URL
d3.json(queryUrl).then(function (data) {
    // Once response is received, send the data.features object to the createFeatures function
    createFeatures(data.features);
    console.log(data)
});

function createFeatures(earthquakeData) {

  // Define a function for each feature in the features array
  // Give each quake a features popup that describes the place, time, magnitude and depth of the earthquake. Also includes
  // a link to the page for the earthquake on the USGS site.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
                     <p>${new Date(feature.properties.time)}</p>
                     <h4>Magnitude: ${feature.properties.mag}</h4>
                     <h4>Depth(km): ${feature.geometry.coordinates[2]}</h4>
                     <a href="${feature.properties.url}" target="_blank">Earthquake Details</a>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);   
}

function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // Add circles to the map sized according to magnitude
  
  }