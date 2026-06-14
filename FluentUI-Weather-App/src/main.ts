// cspell:disable-next-line
import "./style.css";
import "@fluentui/web-components/button.js";
import {
  FluentDesignSystem,
  setTheme,
  TextDefinition,
  ButtonDefinition,
  BadgeDefinition,
  TextInputDefinition,
  LabelDefinition,
  ImageDefinition,
  DialogDefinition,
  Label,
  TextInput,
  Text,
} from "@fluentui/web-components";

import { webLightTheme } from "@fluentui/tokens";
import { createLightTheme } from "@fluentui/tokens";
import type { BrandVariants } from "@fluentui/tokens";

// setTheme(webLightTheme);

const myBrand: BrandVariants = {
  10: "#060103",
  20: "#271018",
  30: "#431426",
  40: "#591732",
  50: "#721A3F",
  60: "#8B1D4C",
  70: "#A52059",
  80: "#BF2367",
  90: "#C93D77",
  100: "#D35787",
  110: "#DC6F98",
  120: "#E487A9",
  130: "#EC9FBA",
  140: "#F3B7CB",
  150: "#F8CFDC",
  160: "#FDE7ED",
};

const myTheme = createLightTheme(myBrand);
setTheme(myTheme);

import stormImg from "./images/icon-storm.webp";
import drizzleImg from "./images/icon-drizzle.webp";
import rainImg from "./images/icon-rain.webp";
import snowImg from "./images/icon-snow.webp";
import fogImg from "./images/icon-fog.webp";
import clearImg from "./images/icon-partly-cloudy.webp";
import cloudsImg from "./images/icon-overcast.webp";
import imgError from "./images/icon-error.svg";

ButtonDefinition.define(FluentDesignSystem.registry);
BadgeDefinition.define(FluentDesignSystem.registry);
TextDefinition.define(FluentDesignSystem.registry);
TextInputDefinition.define(FluentDesignSystem.registry);
LabelDefinition.define(FluentDesignSystem.registry);
ImageDefinition.define(FluentDesignSystem.registry);
DialogDefinition.define(FluentDesignSystem.registry);

const app = document.getElementById("app") as HTMLDivElement;

const textLabel = document.createElement("fluent-label") as Label;
textLabel.textContent = "Fluent UI Weather App";
textLabel.style.fontSize = "24px";
textLabel.style.fontWeight = "bold";
textLabel.style.marginBottom = "8px";

const errorText = document.createElement("fluent-label") as Label;
errorText.size = "large";
errorText.weight = "semibold";
errorText.style.color = "red";

const cityLabel = document.createElement("fluent-label") as Label;
cityLabel.style.display = "none";
cityLabel.style.color = myBrand[80];
cityLabel.size = "large";
cityLabel.weight = "semibold";

const temperatureLabel = document.createElement("fluent-label") as Label;
temperatureLabel.style.display = "none";
temperatureLabel.size = "medium";
temperatureLabel.weight = "semibold";

const descriptionLabel = document.createElement("fluent-label") as Label;
descriptionLabel.style.display = "none";
descriptionLabel.size = "medium";
descriptionLabel.weight = "regular";

const weatherImage = document.createElement("img") as HTMLImageElement;
weatherImage.style.display = "none";
weatherImage.style.width = "100px";
weatherImage.style.height = "100px";
weatherImage.style.objectFit = "cover";

const input = document.createElement("fluent-text-input") as TextInput;
input.placeholder = "Search for a city";
input.controlSize = "large";
input.appearance = "outline";
input.style.width = "100%";

const weatherCard = document.getElementById("card") as HTMLDivElement;
weatherCard.className = "card";

// YT video api key:
// const apiKey = "4d8fb5b93d4af21d66a2948710284366";

const apiKey = "730e2e036bdae4a91d271d73943798c9";
const weatherText = document.createElement("fluent-text") as Text;
weatherText.style.display = "none";
weatherCard.append(
  textLabel,
  input,
  weatherImage,
  cityLabel,
  temperatureLabel,
  descriptionLabel,
  weatherText,
);
app.appendChild(weatherCard);

input.addEventListener("keydown", async (e): Promise<void> => {
  const inputFieldValue = input.value.trim();
  const cityName = inputFieldValue;
  if (e.key === "Enter" && inputFieldValue !== "") {
    console.log("Input field value:", inputFieldValue);
    input.value = "";
    await fetchWeatherData(cityName);
  }
});

async function fetchWeatherData(cityName: string): Promise<void> {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    console.log("Response status:", response);

    const weatherData = await response.json();
    console.log("Weather data:", weatherData);

    if (!response.ok && !cityName) {
      console.error("Error fetching weather data:", weatherData.message);
      displayErrorMessage("Error fetching weather data. Please try again.");
    } else {
      displayWeatherData(weatherData);
      errorText.remove();
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayErrorMessage("Error fetching weather data. Please try again.");
  }
}

function displayWeatherData(weatherData: any): void {
  // Array destucturing where name is city, main is an object with temp and humidity, and weather is an array of objects with description and id
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = weatherData;
  console.log(
    "Weather data destructured:",
    temp,
    humidity,
    description,
    id,
    city,
  );

  weatherImage.style.display = "block";
  weatherImage.src = getWeatherAssets(id);
  // weatherText.style.display = "flex";

  cityLabel.style.display = "block";
  cityLabel.textContent = `Weather in ${city} • ${Math.round(temp)}°C`;

  descriptionLabel.style.display = "block";
  descriptionLabel.textContent = `${description}, Humidity: ${humidity}%`;
}

function getWeatherAssets(weatherID: number): string {
  switch (true) {
    case weatherID >= 200 && weatherID < 300:
      return stormImg;
    case weatherID >= 300 && weatherID < 500:
      return drizzleImg;
    case weatherID >= 500 && weatherID < 600:
      return rainImg;
    case weatherID >= 600 && weatherID < 700:
      return snowImg;
    case weatherID >= 700 && weatherID < 800:
      return fogImg;
    case weatherID === 800:
      return clearImg;
    case weatherID > 800 && weatherID < 900:
      return cloudsImg;
    default:
      return imgError;
  }
}

function displayErrorMessage(message: string): void {
  errorText.textContent = message;
  weatherText.textContent = "";
  weatherCard.appendChild(errorText);
}
