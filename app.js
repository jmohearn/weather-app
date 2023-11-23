// Declare variables

const appImg = document.querySelector(".app-image");
const locationTitle = document.querySelector(".location");
const locationInput = document.getElementById("location-input");
const sunriseText = document.querySelector(".sunrise");
const sunsetText = document.querySelector(".sunset");
const tempText = document.querySelector(".temp");
const windText = document.querySelector(".wind");
const searchBtn = document.querySelector(".search-btn");
const apiKey = "a9083f84ed84924bb939a800022aae5c";
let data;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Cannot access location data");
  }
}

getLocation();

function showPosition(position) {
  const { latitude, longitude } = position.coords;
  console.log(latitude, longitude);

  const request = new XMLHttpRequest();

  request.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  request.send();

  request.addEventListener("load", function () {
    data = JSON.parse(this.responseText);
    console.log(data);
    updateUI(data);
  });
}

function updateUI(data) {
  const temp = data.main.temp;
  const highTemp = data.main.temp_max;
  const lowTemp = data.main.temp_min;
  const locationName = data.main.name;

  function kelvinToF(f) {
    const tempF = Math.round((Number(f) - 273.15) * (9 / 5) + 32);
    return tempF;
  }

  console.log(kelvinToF(temp), kelvinToF(highTemp), kelvinToF(lowTemp));
}
