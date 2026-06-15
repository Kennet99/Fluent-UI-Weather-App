/*export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}*/

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

ButtonDefinition.define(FluentDesignSystem.registry);
BadgeDefinition.define(FluentDesignSystem.registry);
TextDefinition.define(FluentDesignSystem.registry);
TextInputDefinition.define(FluentDesignSystem.registry);

// Button experimentation:
// Option 1 (not recommended) use setAttribute to set the appearance
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

// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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

// OLD ASYNC CODE:
/*async function fetchWeatherData(cityName: string) {
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
      // main = array of temp details
      // name = city name
      // sys = sunrise and sunset
      // weather = array of weather conditions
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
}*/
