const form = document.querySelector("form");
const locationInput = document.querySelector("#weather-location-input");
const errorOutput = document.querySelector("#errorOutput");
const locationOutput = document.querySelector("#locationOutput");
const temperatureOutput = document.querySelector("#temperatureOutput");
const precipitationChanceOutput = document.querySelector(
  "#precipitationChanceOutput"
);
const forecastOutput = document.querySelector("#forecastOutput");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (locationInput.value.toString().trim() != "") {
    document.getElementById("loader").style.display = "block";
    document.getElementById("errorOutput").style.display = "none";
    document.getElementById("icon").style.display = "none";
    errorOutput.textContent = "";
    locationOutput.textContent = "";
    temperatureOutput.textContent = "";
    precipitationChanceOutput.textContent = "";
    forecastOutput.textContent = "";
    const location = locationInput.value;
    fetch("/weather?address=" + location).then(res => {
      res.json().then(data => {
        document.getElementById("loader").style.display = "none";
        if (data.error) {
          errorOutput.textContent = data.error;
          document.getElementById("errorOutput").style.display = "block";
        } else {
          console.log(data);
          document
            .getElementById("icon")
            .setAttribute("src", "/images/" + data.icon + ".svg");
          document.getElementById("icon").style.display = "block";
          locationOutput.textContent = data.address;
          temperatureOutput.textContent = "Temperature : " + data.temperature;
          precipitationChanceOutput.textContent =
            "Rain Chance : " + (data.precipitation * 100).toString() + "%";
          forecastOutput.textContent = "Forecast : " + data.weatherForecast;
        }
      });
    });
  }
});
