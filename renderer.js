const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

const input = document.getElementById("searchbar");

// using the enter key calls the function to get the current weather
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getCurrentWeather();
  }
})

async function getCurrentWeather() {
  // getting the name of the city the user is searching
  let cityName = document.getElementById("searchbar").value;

  const apiKey = await window.versions.getApiKey();

  // fetching the weather data corresponding to the user input
  let result = await fetch(apiUrl + cityName + '&appid=' + apiKey + '&units=metric');
  let data = await result.json();

  // changing the html elements
  let tempText = document.getElementById("displayText");
  tempText.innerHTML = "it's currently " + data.main.temp + "°C in " + data.name + ".";
}