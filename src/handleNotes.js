import { setLocalStorage, getStorageItem, getElement } from "./utils.js";

const noteContainer = getElement("textarea");
const noteItemsCon = getElement(".note-items");
const addNotebtn = getElement(".add-note");
const noteTitle = getElement(".note-title");

let editElement;
let editFlag = false;
let editID = "";

const cityId = getStorageItem("cityId");

addNotebtn.addEventListener("click", function () {
  const value = noteContainer.value;
  if (value && !editFlag) {
    const id = new Date().getTime().toString();
    const elem = document.createElement("div");
    elem.classList.add("note-item");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    elem.setAttributeNode(attr);
    elem.innerHTML = `
    <p class="note-text">${value}</p>
         <div class="note-btns">
             <button class="btn-edit">
             <i class="fas fa-edit"></i>
             </button>
             <button class="btn-del">
             <i class="fas fa-trash"></i>
             </button>
       </div>
    `;
    noteItemsCon.insertAdjacentElement("beforeend", elem);

    let notesObj = getStorageItem("notes") || [];

    let noteObj = notesObj.find((obj) => obj.cityId === cityId);
    if (!noteObj) {
      noteObj = {
        cityId,
        notes: [],
      };

      notesObj.push(noteObj);
    }
    noteObj.cityId = cityId;
    noteObj.notes.push({ id, text: value });
    const deleteBtn = elem.querySelector(".btn-del");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = elem.querySelector(".btn-edit");
    editBtn.addEventListener("click", editItem);
    setLocalStorage("notes", notesObj);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    noteTitle.style.color = "red";
    noteTitle.textContent = "NOTE CANNOT BE EMPTY !";
    setTimeout(() => {
      setBackToDefault();
    }, 1000);
  }
});

function setBackToDefault() {
  noteContainer.value = "";
  editFlag = false;
  editID = "";
  addNotebtn.textContent = "Add Note";
  noteTitle.textContent = "Notes Report";
  noteTitle.style.color = "#fff";
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  noteItemsCon.removeChild(element);
  noteContainer.focus();
  // setBackToDefault();
  if (id === editID) {
    setBackToDefault();
  }

  removeFromLocalStorage(id);
}
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  noteContainer.focus();
  noteContainer.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  addNotebtn.textContent = "Edit";
}
function removeFromLocalStorage(id) {
  let noteObj = getStorageItem("notes") || [];
  let cityId = getStorageItem("cityId") || [];

  const city = noteObj.find((items) => {
    return (items.cityId = cityId);
  });

  if (!city) {
    return;
  }

  const notes = city.notes.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  city.notes = notes;

  setLocalStorage("notes", noteObj);
}

function editLocalStorage(id, value) {
  const noteObj = getStorageItem("notes");
  let cityId = getStorageItem("cityId");

  const city = noteObj.find((items) => {
    return (items.cityId = cityId);
  });

  if (!city) {
    return;
  }

  const notes = city.notes.map(function (item) {
    if (item.id === id) {
      item.text = value;
    }
    return item;
  });

  city.notes = notes;
  setLocalStorage("notes", noteObj);
}

export { deleteItem, editItem };
