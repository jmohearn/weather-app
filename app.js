// Declare variables

const appImg = document.querySelector(".app-image");
const locationTitle = document.querySelector("#location");
const locationInput = document.getElementById("location-input");
const sunriseText = document.querySelector(".sunrise");
const sunsetText = document.querySelector(".sunset");
const currentTempText = document.querySelector("#current-temp");
const highTempText = document.querySelector("#temp-high");
const lowTempText = document.querySelector("#temp-low");
const windText = document.querySelector("#wind");
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
  const clouds = data.weather[0].description;
  const windSpeed = data.wind.speed;
  let windDirectionDeg = data.wind.deg;
  let windDirectionQuad;

  function getQuad(degRaw) {
    let degree = Number(degRaw);
    let quad;
    if (degree === 0) {
      quad = "N";
    } else if (degree > 0 && degree < 90) {
      quad = "NE";
    } else if (degree === 90) {
      quad = "NE";
    } else if (degree > 90 && degree < 180) {
      quad = "SE";
    } else if (degree === 180) {
      quad = "S";
    } else if (degree > 180 && degree < 270) {
      quad = "SW";
    } else if (degree === 270) {
      quad = "W";
    } else if (degree > 270 && degree < 359) {
      quad = "NW";
    } else {
      quad = "No wind data";
    }
    return quad;
  }

  function kelvinToF(f) {
    const tempF = Math.round((Number(f) - 273.15) * (9 / 5) + 32);
    return tempF;
  }

  locationTitle.textContent = locationName;
  currentTempText.innerHTML = `
  <h2>Now: ${kelvinToF(temp)}&deg; F &amp; ${clouds}</h2>
  `;
  highTempText.innerHTML = `
  <h2 class="app-info--text temp">
            <i class="fa-solid fa-temperature-arrow-up"></i> ${kelvinToF(
              highTemp
            )}&deg; F
          </h2>
  `;
  lowTempText.innerHTML = `
  <h2 class="app-info--text temp">
            <i class="fa-solid fa-temperature-arrow-up"></i> ${kelvinToF(
              lowTemp
            )}&deg; F
          </h2>
  `;
  windText.innerHTML = `
  <i class="fa-solid fa-wind"></i>
          <h2 class="app-info--text wind">${Math.round(
            windSpeed * 2.237
          )} mph from ${getQuad(windDirectionDeg)}</h2>
  `;

  console.log(
    `Current temperature in ${locationName} is:${kelvinToF(
      temp
    )} degrees F, Today's high is: ${kelvinToF(highTemp)}
     degrees F, Today's Low is: ${kelvinToF(
       lowTemp
     )} degrees F. Sunrise: ${sunrise} Sunset: ${sunset}${clouds}`
  );
}
