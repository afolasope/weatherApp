import { getElement, getStorageItem } from './src/utils.js';
import { fetchTopCities, renderTopCities } from './src/fetchTopCities.js';
import { renderFavCities } from './src/handleFavoriteCities.js';
import './src/handleFavoriteCities.js';
import './src/searchForm.js';
import './src/geolocation.js';

const favSection = getElement('.favorite-section');
const favCitiesCardContainer = getElement('.fav-cities-section-con');
const topCitiesCardContainer = getElement('.top-cities-section-con');

window.addEventListener('DOMContentLoaded', function () {
  const topCities = getStorageItem('topCitiesDetails');
  if (topCities) {
    renderTopCities(topCitiesCardContainer, topCities);
  } else {
    fetchTopCities();
  }

  const favlist = getStorageItem('favlist') || [];
  if (favlist.length === 0) {
    favSection.classList.add('hidden');
  } else {
    favSection.classList.remove('hidden');
    renderFavCities(favCitiesCardContainer, favlist);
  }
});
