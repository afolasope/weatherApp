import { getElement, setLocalStorage, getStorageItem } from "./utils.js";

const geolocationBtn = getElement(".get-location-btn");
const geolocationError = getElement(".geolocation-error");

const getCoords = function () {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      console.log(position);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(lat, lon);
      const data = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAG5CLuCdk131eR5JIHsc92jTxqIdDz4xM`
      );
      const res = await data.json();
      const city = res.plus_code.compound_code;
      const cityA = city.split(" ");
      const splice = cityA.splice(1);
      const id = `${splice[0]} ${splice[1]}`;
      console.log(id);
      setLocalStorage("cityId", id);
      document.location.replace("http://127.0.0.1:5500/citydetails.html");
    },
    function (error) {
      geolocationError.classList.remove("hidden");
      setTimeout(() => {
        geolocationError.classList.add("hidden");
      }, 1000);
    }
  );
};

geolocationBtn.addEventListener("click", async function () {
  getCoords();
});
