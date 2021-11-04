import { getElement, getStorageItem, setLocalStorage } from "./utils.js";

const bookmarkBtn = getElement(".report-fav-btn");

let favoritesList = [];

bookmarkBtn.addEventListener("click", function (e) {
  const elem = e.currentTarget.firstElementChild;
  elem.classList.toggle("favorite");
  const isFav = elem.classList.contains("favorite");
  const cityId = getStorageItem("cityId");

  if (isFav) {
    const details = getStorageItem("cityDetailsBkmark");
    const favlist = getStorageItem("favlist");
    if (favlist) {
      favoritesList = favlist;
    }
    favoritesList.push(details);
    console.log(details);
    favoritesList.sort(function (a, b) {
      return a.id > b.id ? 1 : -1;
    });
    setLocalStorage("favlist", favoritesList);
  } else {
    const checkIndex = favoritesList.findIndex((item) => item.id === cityId);
    console.log(checkIndex);
    favoritesList.splice(checkIndex, 1);
    setLocalStorage("favlist", favoritesList);
  }
});
