const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="


async function getCurrentWeather() {
  // getting the name of the city the user is searching
  let cityName = document.getElementById("searchbar").value

  const apiKey = await window.versions.getApiKey();

  // fetching the weather data corresponding to the user input
  let result = await fetch(apiUrl + cityName + '&appid=' + apiKey + '&units=metric');
  let data = await result.json();

  // changing the html elements
  let tempText = document.getElementById("currTemp");
  let cityText = document.getElementById("currCity")
  tempText.innerHTML = data.main.temp + "°C";
  cityText.innerHTML = data.name;
}