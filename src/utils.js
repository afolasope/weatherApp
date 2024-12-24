const getElement = (selection) => {
    const element = document.querySelector(selection);
    if (element) return element;
    throw new Error(`Please check "${selection}" selector, no such element exist`);
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

const KEY_WEATHER = '6fb2350322db6ae123184c88adf5c5ed';
const GOOGLE_MAP = 'AIzaSyCa7ux5MjN9vMKX3ETuyvP5Al9glu3sFqY';

export { getElement, getStorageItem, GOOGLE_MAP, KEY_WEATHER, setLocalStorage, topCities };
