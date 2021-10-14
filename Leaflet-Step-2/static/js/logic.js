
var map = L.map("map", {
  center: [39.099724, -94.578331],
  zoom: 4,
});

//  https://docs.mapbox.com/mapbox-gl-js/example/
var litemap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    accessToken: API_KEY,
    attribution:
      "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 15,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    
  }
);
litemap.addTo(map);





// get json
var url =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url).then(function (data) {
  console.log(data);
  
  // fill markers
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      // color: "#000000",
      stroke: true,
      weight: 0.3,
      radius: getRadius(feature.properties.mag),

//   1-5    // Create a red circle over Dallas.
// L.circle([32.7767, -96.7979], {
//   color: "red",
//   fillColor: "red",
//   fillOpacity: 0.75,
//   radius: 10000
      
    };
  }



  // function getcolor(depth){
  //   // console.log(feature.geometry.coordinates[2]);
  //
    


  // https://stackoverflow.com/questions/63496932/switch-case-return    scott b 


  function getColor(depth) {
    switch (true) {
      case depth > 100:
        return "rgb(63,131,163)"
            break;
      case depth > 75:
        return "rgb(98,131,155)"
            break;
      case depth > 50:
        return "rgb(162,130,126)"
            break;
      case depth > 25:
        return "rgb(193,129,103)"
            break;
      case depth > 10:
        return "rgb(220,129,73)"
            break;
      default:
        return "#DFFF00";
    }
  }


  
  function getRadius(mag) {
    if (mag === 0) {
      return 1;
    }

    return mag * 3;
  }
  // POPUP

  L.geoJSON(data, {
    pointToLayer: function (feature, LatLng) {
      return L.circleMarker(LatLng);
    },
    style: styleInfo,

    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: " +
          feature.properties.mag +
          "<br>Depth: " +
          feature.geometry.coordinates[2] +
          "<br>Location: " +
          feature.properties.place
      );
    },
  }).addTo(map);

  // add legend   2-4  step4js 

  var legend = L.control({
    position: "bottomright",
  });

  
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 10, 25, 50, 75, 100];
      var colors = ["#DFFF00", "rgb(220,129,73)", "rgb(162,130,126)", "rgb(162,130,126)", "rgb(98,131,155)", "rgb(63,131,163)"];
      
      var legendinfo = "<h2> Depth(km) </>";

      div.innerHTML = legendinfo;

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
      return div;
  };

  legend.addTo(map);
});





// var legendInfo = "<h1>Median Income</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };