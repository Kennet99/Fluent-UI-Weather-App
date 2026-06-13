import "./style.css";
// cspell:disable-next-line
// Import fluent UI web components
import "@fluentui/web-components/button.js";
import {
  FluentDesignSystem,
  setTheme,
  TextDefinition,
  ButtonDefinition,
  BadgeDefinition,
  TextInputDefinition,
} from "@fluentui/web-components";
import { webLightTheme } from "@fluentui/tokens";
setTheme(webLightTheme);

import { Button, Badge, TextInput, Text } from "@fluentui/web-components";
// const app = document.querySelector<HTMLDivElement>("#app")!;
const app = document.getElementById("app") as HTMLDivElement;

const textLabel = document.createElement("fluent-text") as Text;
textLabel.textContent = "Fluent UI Weather App";
textLabel.style.fontSize = "24px";
textLabel.style.fontWeight = "bold";
textLabel.style.marginBottom = "10px";
// textLabel.size = "1000";
app.appendChild(textLabel);

// Button experimentation:
ButtonDefinition.define(FluentDesignSystem.registry);
BadgeDefinition.define(FluentDesignSystem.registry);
TextDefinition.define(FluentDesignSystem.registry);
TextInputDefinition.define(FluentDesignSystem.registry);

const button1 = document.createElement("fluent-button");
button1.setAttribute("appearance", "subtle");
button1.textContent = "Click me";
// document.querySelector<HTMLDivElement>("#app")!.appendChild(button1);
app.appendChild(button1);

// Option 2 (better) use the typed property instead of setAttribute
const button2 = document.createElement("fluent-button") as Button;
button2.appearance = "primary";
button2.textContent = "Hello Fluent!";
// document.querySelector<HTMLDivElement>("#app")!.appendChild(button2);
app.appendChild(button2);

const badge = document.createElement("fluent-badge") as Badge;
badge.textContent = "New";
badge.style.marginLeft = "10px";
app.appendChild(badge);

const input = document.createElement("fluent-text-input") as TextInput;
input.placeholder = "Search for a city";
input.controlSize = "large";
input.appearance = "outline";
// app.appendChild(input);

// const weatherCard = document.createElement("div");
const weatherCard = document.getElementById("card") as HTMLDivElement;
weatherCard.className = "card";
app.appendChild(weatherCard);
weatherCard.append(textLabel, input);

// Fetch weather data from OpenWeatherMap API
// My key:
// const apiKey = "730e2e036bdae4a91d271d73943798c9";

const apiKey = "4d8fb5b93d4af21d66a2948710284366";
// const city = input.value.trim();
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const inputFieldValue = input.value;
console.log("Input field value:", inputFieldValue);

// const weatherInfo = document.createElement("div");
const weatherText = document.createElement("fluent-text") as Text;
weatherText.innerHTML = "";
weatherCard.appendChild(weatherText);
// app.appendChild(weatherInfo);

// Fetch approach with .then() chaining
/*fetch(apiUrl)
  // Log the response object
  // .then((response) => {
  //   console.log("Response status:", response);
  //   return response.json();
  // })
  .then((response) => response.json())
  .then((data) => {
    console.log("Weather data:", data);
  });*/

// Fetch approach with async/await
async function fetchWeatherData(cityName: string) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    console.log("Response status:", response);
    const weatherData = await response.json();
    console.log("Weather data:", weatherData);

    if (response.ok) {
      // Destructuring the JSON response to extract relevant weather data
      // const {
      //   name: city,
      //   main: { temp: temperature },
      //   weather: [{ description }],
      // } = weatherData;

      // const { name: city, timezone } = weatherData;
      const { main, name, sys, weather } = weatherData;

      console.log("Weather data destructured:", main, name, sys, weather);

      // Get an array of weather descriptions from the weather array
      const weatherDescriptions = weather.map(
        (weatherItem: any) => weatherItem.description,
      );
      weatherText.textContent = `Weather in ${name}: ${main.temp}°C, ${weatherDescriptions.join(", ")}`;
      console.log("Weather descriptions:", weatherDescriptions);
    } else {
      console.error("Error fetching weather data:", weatherData.message);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Event listener to fetch weather data when search is performed
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cityName = input.value.trim();
    input.value = "";
    fetchWeatherData(cityName);
  }
});
