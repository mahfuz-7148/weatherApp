const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const api = "95ea6c5948df8308359dd128f9ea35d7";

weatherForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const city = cityInput.value
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      weatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      errorDisplayy(error);
    }
  } else {
    errorDisplayy(`enter a city bruh!!`);
  }
});
const getWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
};
const weatherInfo = (data) => {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const describesDisplay = document.createElement("p");
  const weatherDisplay = document.createElement("p");
  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  describesDisplay.textContent = description;
  weatherDisplay.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  describesDisplay.classList.add("describesDisplay");
  weatherDisplay.classList.add("weatherDisplay");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(describesDisplay);
  card.appendChild(weatherDisplay);
};
const getWeatherEmoji = (weatherId) => {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌦️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "🌩️";
    case weatherId >= 700 && weatherId < 800:
      return "⛈️";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "⁉️";
  }
};
const errorDisplayy = (message) => {
  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(error);
};
