import { KEY_WEATHER } from './utils.js';

const fetchCity = async function (city) {
  try {
    const data = await fetch(
      `https://api.weatherstack.com/current?access_key=${KEY_WEATHER}&query=${city}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { fetchCity };
