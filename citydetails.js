import { getStorageItem, getElement, setLocalStorage } from './src/utils.js';
import './src/handleNotes.js';
import { displayCityDetails } from './src/displayCityDetails.js';
import './src/searchForm.js';
import { extractInfo } from './src/extractInfo.js';
import { fetchCity } from './src/fetchCity.js';
import './src/geolocation.js';
import { editItem, deleteItem } from './src/handleNotes.js';
import './src/addToFavList.js';

const bookmrkBtn = getElement('.btn-bookmark');

let favoritesList = [];

window.addEventListener('DOMContentLoaded', async function () {
  // city details info
  const cityId = getStorageItem('cityId');
  const localInfo = getStorageItem('topCitiesDetails') || [];

  let info = localInfo.find(function (item) {
    return item.id === cityId;
  });

  if (!info) {
    const response = await fetchCity(cityId);
    info = await extractInfo(response);
  }
  setLocalStorage('cityDetailsBkmark', info);
  displayCityDetails(info);

  //  city details bookmark functionality
  const favlist = getStorageItem('favlist');
  if (favlist) {
    favoritesList = favlist;
  }
  const filterItems = favoritesList.filter((item) => item.id === cityId);
  if (filterItems.length !== 0) {
    bookmrkBtn.classList.add('favorite');
  }

  //  Notes functionality
  const notesContainer = getElement('.note-items');
  const notesObj = getStorageItem('notes');
  if (!notesObj) {
    return;
  }
  if (notesObj) {
    const checkCityId = notesObj.find((items) => {
      return items.cityId === cityId;
    });
    if (!checkCityId) {
      return;
    }
    const notes = checkCityId.notes;
    const display = notes.map((note) => {
      const elem = document.createElement('div');
      elem.classList.add('note-item');
      let attr = document.createAttribute('data-id');
      attr.value = `${note.id}`;
      elem.setAttributeNode(attr);
      elem.innerHTML = `
        <p class="note-text">${note.text}</p>
          <div class="note-btns">
               <button class="btn-edit">
               <i class="fas fa-edit"></i>
               </button>
               <button class="btn-del">
               <i class="fas fa-trash"></i>
               </button>
         </div>
      `;
      const deleteBtn = elem.querySelector('.btn-del');
      deleteBtn.addEventListener('click', deleteItem);
      const editBtn = elem.querySelector('.btn-edit');
      editBtn.addEventListener('click', editItem);

      notesContainer.insertAdjacentElement('beforeend', elem);
    });
  }
});
