import {
  topCities,
  getElement,
  setLocalStorage,
  getStorageItem,
} from "./utils.js";
import { fetchCity } from "./fetchCity.js";
import { extractInfo } from "./extractInfo.js";
const topCitiesCardContainer = getElement(".top-cities-section-con");
const loaderImg = getElement(".loader-cont");
const topCitiesSection = getElement(".top-cities-section");

const renderTopCities = function (element, info) {
  const favoriteList = getStorageItem("favlist") || [];
  const articles = info.map(function (city) {
    const favorite = favoriteList.find((fav) => fav.id === city.id);

    return `
     <article class="city-card-con">
            <div class="city-card">
              <div class="city-texts">
                <div class="weather-info">
                  <p class="city-name">${city.cityName},</p>
                  <p class="country-name">${city.country}</p>
                  <h4>${city.temperature}℃</h4>
                </div>
                <div class="weather-img">
                  <img src=${
                    city.weather_icons[0]
                  } alt="${city.weather_descriptions[0]} weather image" />
                </div>
              </div>
              <a
                href="./citydetails.html"
                class="city-link"
                aria-label = "weather details"
                data-id="${city.id}"
              ></a>
            </div>
            <div class="btn-container">
              <button aria-label= "bookmark">
                <i
                  class="fas fa-bookmark btn-bookmark ${
                    favorite ? "favorite" : ""
                  }"
                  data-id="${city.id}"
                ></i>
              </button>
              <button aria-label= "delete">
                <i class="fas fa-trash btn-trash" data-id="${city.id}"></i>
              </button>
            </div>
          </article>

    `;
  });

  if (element && Array.isArray(articles) && articles.length > 0) {
    topCitiesCardContainer.innerHTML = articles.join("");
  }
};

const fetchTopCities = async function () {
  const data = topCities.map(async function (city) {
    loaderImg.classList.remove("hidden");
    const response = await fetchCity(city);
    if (response.error && response.error.code === 104) {
      topCitiesSection.innerHTML = `<h1>🔴🔴🔴 Something went wrong</h1>`;
    }
    const info = await extractInfo(response);
    return info;
  });
  const topCityDetails = await Promise.all(data);
  loaderImg.classList.add("hidden");
  setLocalStorage("topCitiesDetails", topCityDetails);

  renderTopCities(topCitiesCardContainer, topCityDetails);
};

export { fetchTopCities, renderTopCities };
