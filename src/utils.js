import apiKey from '../apiKey.js';

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

const topCities = [
  'Beijing',
  'Buenos Aires',
  'Cairo',
  'Chongqing',
  'Delhi',
  'Dhaka',
  'Karachi',
  'Mexico City',
  'Mumbai',
  'New York',
  'Osaka',
  'Seoul',
  'Sao Paulo',
  'Shangai',
  'Tokyo',
];

const setLocalStorage = function (name, item) {
  localStorage.setItem(name, JSON.stringify(item));
};
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);
  if (!storageItem) {
    return null;
  }

  return JSON.parse(localStorage.getItem(item));
};

const KEY_WEATHER = apiKey.weather;
const GOOGLE_MAP = apiKey.googleMap;

export {
  getElement,
  topCities,
  setLocalStorage,
  getStorageItem,
  KEY_WEATHER,
  GOOGLE_MAP,
};
