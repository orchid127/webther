const input = document.getElementById("searchbar");

// using the enter key calls the function to get the current weather
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getCurrentWeather();
  }
})

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="

async function getCurrentWeather() {
  // getting the name of the city the user is searching
  let cityName = document.getElementById("searchbar").value;

  // fetching the weather data corresponding to the user input
  let apiKey = await window.versions.getApiKey();
  let result = await fetch(apiUrl + cityName + '&appid=' + apiKey + '&units=metric');
  let data = await result.json();

  // changing the html elements
  let temp = Math.round(data.main.temp);
  let comment;

  // adding a comment depending on the temperature
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

// function to close the window
document.getElementById("close").addEventListener("click", closeWindow);
function closeWindow() {
  window.close();
}

//function to minimise the window
document.getElementById("minimize").addEventListener("click", minimizeWindow);
function minimizeWindow () {
  window.innerWidth = 100;
  window.innerHeight = 100;
  window.screenX = screen.width;
  window.screenY = screen.height;
  alwaysLowered = true;
}