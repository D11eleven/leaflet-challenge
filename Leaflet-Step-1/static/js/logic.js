var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Load the GeoJSON data.
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// var geojson;

// Get the data with d3.
d3.json(geoData).then(function(data) {

  console.log(data);
})


//  1-7
// Loop through the cities array, and create one marker for each city object.
// for (var i = 0; i < countries.length; i++) {

//     // Conditionals for country points
//     var color = "";
//     if (countries[i].points > 200) {
//       color = "yellow";
//     }
//     else if (countries[i].points > 100) {
//       color = "blue";
//     }
//     else if (countries[i].points > 90) {
//       color = "green";
//     }
//     else {
//       color = "red";
//     }
  
//     // Add circles to the map.
//     L.circle(countries[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: color,
//       // Adjust the radius.
//       radius: Math.sqrt(countries[i].points) * 10000
//     }).bindPopup(`<h1>${countries[i].name}</h1> <hr> <h3>Points: ${countries[i].points}</h3>`).addTo(myMap);



// //  2-4 logicstep4
// // Set up the legend.
// var legend = L.control({ position: "bottomright" });
// legend.onAdd = function() {
//   var div = L.DomUtil.create("div", "info legend");
//   var limits = geojson.options.limits;
//   var colors = geojson.options.colors;
//   var labels = [];

//   // Add the minimum and maximum.
//   var legendInfo = "<h1>Median Income</h1>" +
//     "<div class=\"labels\">" +
//       "<div class=\"min\">" + limits[0] + "</div>" +
//       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//     "</div>";

//   div.innerHTML = legendInfo;

//   limits.forEach(function(limit, index) {
//     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//   });

//   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//   return div;
// };

// // Adding the legend to the map
// legend.addTo(myMap);

// });