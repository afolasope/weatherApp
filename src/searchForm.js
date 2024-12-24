import { getElement, KEY_WEATHER, setLocalStorage } from './utils.js';

const searchFormCon = getElement('.city-input');
const searchCardCon = getElement('.search-items');
const searchInput = getElement('.city-search-input');
const errorHandle = getElement('.error-handle');

searchInput.addEventListener('keyup', async function () {
    errorHandle.classList.remove('hidden');
    errorHandle.textContent = 'please wait';
    console.log('first|||||||||||||||||||||||');
    try {
        const value = searchInput.value;
        searchCardCon.style.display = 'none';
        const fetchData = await fetch(`http://api.weatherstack.com/current?access_key=${KEY_WEATHER}&query=${value}`);
        const response = await fetchData.json();
        searchCardCon.style.display = 'block';

        if (response.request) {
            errorHandle.classList.remove('hidden');
            errorHandle.classList.add('hidden');
            const { results } = response;

            console.log(results);
            console.log('first||||||||||||||||||||||||||||||||||||||');

            // const info = results.map(function (result) {
            //     const items = [result.name, result.country];
            //     return items;
            // });

            const info = [results.location.name, results.location.country];
            console.log({ info });

            console.log(results);

            searchCardCon.classList.remove('hidden');

            const searchDisplay = info.map(function (item) {
                return `
           <a href="./citydetails.html" class="search-item" data-id="${item[0]}, ${item[1]}">${item[0]}, ${item[1]}</a>
            `;
            });
            searchCardCon.innerHTML = searchDisplay.join('');
        }
        if (response.error || response.error.code === 602 || response.error.code === 601) {
            errorHandle.textContent = 'no result found';
            searchCardCon.style.display = 'none';
            setTimeout(() => {
                errorHandle.classList.add('hidden');
            }, 1000);
        }
    } catch (error) {}
});

searchInput.addEventListener('focusout', function (e) {
    if (e.relatedTarget && e.relatedTarget.classList.contains('search-item')) {
        return;
    }
    searchCardCon.style.display = 'none';
    searchInput.value = '';
});

const searchItems = getElement('.search-items');
searchFormCon.addEventListener('click', async function (e) {
    try {
        const searchItem = e.target.classList.contains('search-item');
        if (searchItem) {
            const id = e.target.dataset.id;
            setLocalStorage('cityId', id);
        }
    } catch (error) {
        console.log(error);
    }
});
