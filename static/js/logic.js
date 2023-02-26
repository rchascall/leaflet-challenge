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
    // Return new layer for each feature
    pointToLayer: function(feature, latlng) {
        // Determine the depth of each earthquake and set the fill color
        var depth = feature.geometry.coordinates[2];
        var markerFillColor;
        if (depth > 90) {
            markerFillColor = "#ff0000";
        } else if (depth > 70) {
            markerFillColor = "#ff6600";
        } else if (depth > 50) {
            markerFillColor = "#ff9900";
        } else if (depth > 30) {
            markerFillColor = "#ffff00";
        } else if (depth > 10) {
            markerFillColor = "#99ff33";
        } else {
            markerFillColor = "#009933";
        }
        // Return the circle marker with the appropriate radius and fill color
        return L.circleMarker(latlng, {
            radius: feature.properties.mag * 5,
            fillColor: markerFillColor,
            color: "#000",
            weight: .3,
            opacity: 1,
            fillOpacity: 0.8
        });
    },  
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);   
}

function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
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
    L.control.layers(baseMaps, null, {
      collapsed: false
    }).addTo(myMap);

    function getColor(depth) {
        if (depth > 90) {
            return "#ff0000";
        } else if (depth > 70)  {
            return "#ff6600";
        } else if (depth > 50)  {
            return "#ff9900";
        } else if (depth > 30)  {
            return "#ffff00";
        } else if (depth > 10)  {
            return "#99ff33";
        } else  {
            return "#009933";
        }

    }

    // Create a legend to display information about the depth ranges
    var legend = L.control({
        position: "bottomright"
      });

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        var depths = [-10, 10, 30, 50, 70, 90];
        var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
        // Write dynamic html for legend
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML += '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' + labels[i] + '<br>';
        }
        return div;
    };
  
    legend.addTo(myMap);
  }