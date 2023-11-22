// Declare variables

const appImg = document.querySelector(".app-image");
const locationTitle = document.querySelector(".location");
const locationInput = document.getElementById("location-input");
const sunriseText = document.querySelector(".sunrise");
const sunsetText = document.querySelector(".sunset");
const tempText = document.querySelector(".temp");
const windText = document.querySelector(".wind");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Cannot access location data");
  }
}

getLocation();
function showPosition(position) {
  const coords = position.coords;
  console.log(coords);
}

const request = new XMLHttpRequest();

request.open(
  "GET",
  "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
);

request.addEventListener("load", function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
