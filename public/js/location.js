/* jshint esversion: 9 */
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// function showPosition(position) {
//   content = position.coords.longitude + "," + position.coords.latitude;
//   location.assign(`http://localhost:3000/api/v1/views/mapbox-weather/${content}?types=poi`);
// }

function showPosition(position) {
  content = position.coords.longitude + "," + position.coords.latitude;
  fetch(`http://localhost:3000/api/v1/views/mapbox-weather/${content}?types=poi`).then((response) => {
    response.json().then((data) => {
      x.innerHTML = data.location + " " + data.coordinates;
  });
});
}