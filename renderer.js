const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

const input = document.getElementById("searchbar");

// using the enter key calls the function to get the current weather
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getCurrentWeather();
    console.log("weather fetching successful");
  }
  console.log("weather fetching unsuccessful");
})

async function getCurrentWeather() {
  // getting the name of the city the user is searching
  let cityName = document.getElementById("searchbar").value;

  const apiKey = await window.versions.getApiKey();

  // fetching the weather data corresponding to the user input
  let result = await fetch(apiUrl + cityName + '&appid=' + '&units=metric');
  let data = await result.json();

  // changing the html elements
  let temp = Math.round(data.main.temp);
  let comment;

  // adding a comment depending on the 
  if (temp < 0) {
    comment = "omg, it's freezing...";
  }
  else if (temp < 15 && temp >= 0) {
    comment = "chilly, isn't it ?";
  }
  else if (temp > 15 && temp <= 30) {
    comment = "perfect weather if you ask me !"
  }
  else if (temp > 30) {
    comment = "do you live in an oven ? "
  }

  let tempText = document.getElementById("displayText");
  tempText.innerHTML = "it's currently " + Math.round(data.main.temp) + "°C in " + data.name + ". " + comment;
}

function closeWindow() {
  window.close();
}