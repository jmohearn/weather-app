// Declare variables

const appImg = document.querySelector(".app-image");
const locationTitle = document.querySelector(".location");
const locationInput = document.getElementById("location-input");
const sunriseText = document.querySelector(".sunrise");
const sunsetText = document.querySelector(".sunset");
const tempText = document.querySelector(".temp");
const windText = document.querySelector(".wind");
const searchBtn = document.querySelector(".search-btn");
const apiKey = secret.key;
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
  const locationName = data.name;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;

  function kelvinToF(f) {
    const tempF = Math.round((Number(f) - 273.15) * (9 / 5) + 32);
    return tempF;
  }

  console.log(
    `Current temperature in ${locationName} is: ${kelvinToF(
      temp
    )} degrees F, Today's high is: ${kelvinToF(
      highTemp
    )} degrees F, Today's Low is: ${kelvinToF(
      lowTemp
    )} degrees F. Sunrise: ${sunrise} Sunset: ${sunset}`
  );
}
