import { getElement, getStorageItem } from "./utils.js";

const citySearchCon = getElement(".search-items");

const city = getElement(".report-city");
const country = getElement(".report-country");
const temp = getElement(".report-temp");
const text = getElement(".report-text");
const image = getElement(".report-image");
const region = getElement(".report-region");
const lon = getElement(".report-lon");
const lat = getElement(".report-lat");
const timezone = getElement(".report-tz");
const ltime = getElement(".report-ltime");
const otime = getElement(".report-otime");
const wspeed = getElement(".report-wspeed");
const wdegree = getElement(".report-wdegree");
const wdir = getElement(".report-wdir");
const precip = getElement(".report-precip");
const pressure = getElement(".report-press");
const humidity = getElement(".report-hum");

const displayCityDetails = function (info) {
  citySearchCon.classList.add("hidden");
  city.textContent = `${info.cityName}`;
  country.textContent = `${info.country}`;
  temp.textContent = `${info.temperature}℃`;
  text.textContent = `${info.weather_descriptions[0]}`;
  image.src = `${info.weather_icons[0]}`;
  region.textContent = `${info.region}`;
  lon.textContent = `${info.lon}`;
  lat.textContent = `${info.lat}`;
  timezone.textContent = `${info.timezone_id}`;
  ltime.textContent = `${info.localtime}`;
  otime.textContent = `${info.obsTime}`;
  wspeed.textContent = `${info.wind_speed} Kmph`;
  wdegree.textContent = `${info.wind_degree}º`;
  wdir.textContent = `${info.wind_dir}`;
  precip.textContent = `${info.precip}mm`;
  pressure.textContent = `${info.pressure}mb`;
  humidity.textContent = `${info.humidity}`;
};
export { displayCityDetails };
