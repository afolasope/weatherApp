import {
  getElement,
  getStorageItem,
  setLocalStorage,
  topCities,
} from "./utils.js";
import { renderTopCities } from "./fetchTopCities.js";

const topCitiesCardContainer = getElement(".top-cities-section-con");
const favCitiesCardContainer = getElement(".fav-cities-section-con");
const favSection = getElement(".favorite-section");
const noCities = getElement(".no-cities");
let favoritesList = [];

const renderFavCities = function (element, items) {
  favSection.classList.remove("hidden");
  const display = items.map(function (city) {
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
                  <img src=${city.weather_icons[0]} alt="" />
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
              <button aria-label="bookmark">
                <i
                  class="fas fa-bookmark btn-bookmark favorite"
                  data-id="${city.id}"
                ></i>
              </button>
              <button aria-label="delete">
                <i class="fas fa-trash btn-trash" data-id="${city.id}"></i>
              </button>
            </div>
          </article>
        `;
  });
  element.innerHTML = display.join("");
};

if (topCitiesCardContainer) {
  topCitiesCardContainer.addEventListener("click", (event) => {
    let bookmark, del, cityLink;
    let path = event.path || (event.composedPath && event.composedPath());
    path.forEach((p) => {
      if (!p.classList) {
        return;
      }

      if (p.classList.contains("btn-bookmark")) {
        return (bookmark = p);
      }

      if (p.classList.contains("btn-trash")) {
        return (del = p);
      }
      if (p.classList.contains("city-link")) {
        return (cityLink = p);
      }
    });
    if (bookmark) {
      const dataId = event.target.dataset.id;
      event.target.classList.toggle("favorite");
      const isFavorite = event.target.classList.contains("favorite");
      if (isFavorite) {
        const check = getStorageItem("favlist");
        if (check) {
          favoritesList = check;
        }

        const topCities = getStorageItem("topCitiesDetails");
        const bmkCard = topCities.find(function (item) {
          return item.id === dataId;
        });
        favoritesList.push(bmkCard);
        favoritesList.sort(function (a, b) {
          return a.id > b.id ? 1 : -1;
        });

        setLocalStorage("favlist", favoritesList);
        renderFavCities(favCitiesCardContainer, favoritesList);
      }
      if (!isFavorite) {
        const bmkCardIndex = favoritesList.findIndex((item) => {
          return item.id === dataId;
        });
        favoritesList.splice(bmkCardIndex, 1);
        setLocalStorage("favlist", favoritesList);
        renderFavCities(favCitiesCardContainer, favoritesList);
        if (favoritesList.length < 1) {
          favSection.classList.add("hidden");
        }
      }
    }
    if (del) {
      const topCities = getStorageItem("topCitiesDetails");
      const favlist = getStorageItem("favlist");
      const cityCardCon =
        event.target.parentElement.parentElement.parentElement;
      cityCardCon.classList.add("hidden");
      const dataId = event.target.dataset.id;
      const deletedCard = topCities.find(function (item) {
        return item.id === dataId;
      });
      console.log(deletedCard.id);
      const getIndex = topCities.findIndex((item) => {
        return item.id === deletedCard.id;
      });
      topCities.splice(getIndex, 1);
      setLocalStorage("topCitiesDetails", topCities);
      if (topCities.length === 0) {
        noCities.classList.remove("hidden");
      }

      if (favlist) {
        const FavIndex = favlist.findIndex((item) => {
          return deletedCard.id === item.id;
        });
        console.log(FavIndex);
        if (FavIndex !== -1) {
          favlist.splice(FavIndex, 1);
          setLocalStorage("favlist", favlist);
          renderFavCities(favCitiesCardContainer, favlist);
        }
      }
      if (favlist.length < 1) {
        favSection.classList.add("hidden");
      }
    }
    if (cityLink) {
      const id = event.target.dataset.id;
      setLocalStorage("cityId", id);
    }
  });
}

if (favCitiesCardContainer) {
  favCitiesCardContainer.addEventListener("click", function (e) {
    const deleteCard = e.target.classList.contains("btn-trash");
    const bookmarkCard = e.target.classList.contains("btn-bookmark");
    const cityLink = e.target.classList.contains("city-link");

    if (deleteCard) {
      deleteCityCard(e);
    }
    if (bookmarkCard) {
      bookMarkCityCard(e);
    }
    if (cityLink) {
      gotoCityDetails(e);
    }
  });
}

const deleteCityCard = function (e) {
  const cityCardCon = e.target.parentElement.parentElement.parentElement;
  cityCardCon.classList.add("hidden");
  const cardId = e.target.dataset.id;
  const topCities = getStorageItem("topCitiesDetails");
  const favlist = getStorageItem("favlist");
  if (favlist) {
    favoritesList = favlist;
  }
  const findInTopcities = topCities.find((item) => item.id === cardId);
  if (findInTopcities) {
    const checkTopIndex = topCities.findIndex((item) => {
      return item.id === findInTopcities.id;
    });
    topCities.splice(checkTopIndex, 1);
    setLocalStorage("topCitiesDetails", topCities);
    renderTopCities(topCitiesCardContainer, topCities);

    const checkfavIndex = favoritesList.findIndex((item) => {
      return item.id === findInTopcities.id;
    });
    favoritesList.splice(checkfavIndex, 1);
    setLocalStorage("favlist", favoritesList);
    renderFavCities(favCitiesCardContainer, favoritesList);
  } else {
    const findInFavlist = favoritesList.findIndex((item) => item.id === cardId);
    favoritesList.splice(findInFavlist, 1);
    setLocalStorage("favlist", favoritesList);
    renderFavCities(favCitiesCardContainer, favoritesList);
  }

  if (favoritesList.length < 1) {
    favSection.classList.add("hidden");
  }
};
const bookMarkCityCard = function (e) {
  const topCities = getStorageItem("topCitiesDetails");
  const favlist = getStorageItem("favlist");
  const id = e.target.dataset.id;
  const index = favlist.findIndex(function (item) {
    return item.id === id;
  });
  favlist.splice(index, 1);
  setLocalStorage("favlist", favlist);
  renderFavCities(favCitiesCardContainer, favlist);
  renderTopCities(topCitiesCardContainer, topCities);
  if (favlist.length < 1) {
    favSection.classList.add("hidden");
  }
};

const gotoCityDetails = function (e) {
  const id = e.target.dataset.id;
  setLocalStorage("cityId", id);
};
export { renderFavCities, bookMarkCityCard, deleteCityCard };
