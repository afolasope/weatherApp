import { getElement } from "./utils.js";

const geolocationErr = getElement(".geolocation-error");

const extractInfo = async function (city) {
  const info = await city;
  try {
    if (info.current) {
      const {
        current: {
          observation_time: obsTime,
          humidity,
          precip,
          pressure,
          temperature,
          wind_degree,
          wind_dir,
          wind_speed,
          weather_descriptions,
          weather_icons,
        },
      } = info;
      const {
        location: {
          country,
          name: cityName,
          lat,
          lon,
          localtime,
          timezone_id,
          region,
        },
      } = info;
      let id = `${cityName}, ${country}`;
      return {
        id,
        obsTime,
        humidity,
        precip,
        pressure,
        temperature,
        wind_degree,
        wind_dir,
        wind_speed,
        weather_descriptions,
        weather_icons,
        country,
        cityName,
        lat,
        lon,
        localtime,
        timezone_id,
        region,
      };
    }
    if (info && info.error.code === 105) {
      geolocationErr.classList.remove("hidden");
      geolocationErr.textContent = "Something went wrong";

      setTimeout(() => {
        geolocationErr.classList.add("hidden");
      }, 1000);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export { extractInfo };
