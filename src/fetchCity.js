const fetchCity = async function (city) {
  try {
    const data = await fetch(
      `http://api.weatherstack.com/current?access_key=46f95323dfebd3959827ebf1cdcc4079&query=${city}`
    );
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { fetchCity };
