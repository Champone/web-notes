const newNotesBtn = document.querySelector('#new-notes');
const notesBlock = document.querySelector('.notes');
const notesWrapper = document.querySelector('.notes__wrapper');
const notesNew = document.querySelector('.notes__new');
const btnCancel = document.querySelector('#btn-cancel');
const btnSave = document.querySelector('#btn-save');
const titleNewNote = document.querySelector('.title-new');
const textarea = document.querySelector('.textarea');
let notesCount = 0;
const titleSecond = document.querySelector('.title__second');
let date = new Date();
let noteTitle;
let noteText;
let noteId;


let notesList = [];

/* Загрузка заметок, если они есть */
window.onload = function() {
    if (localStorage.getItem('note')) {
        notesList = JSON.parse(localStorage.getItem('note'));
        showNotes();
    }
    notesCount = notesList.length;
    titleSecond.innerHTML = 'Всего: ' + notesCount;
}
/* =============================== */

/* Действие на кнопку "новая заметка"  */
function showBlock() {
    notesBlock.style.display = 'none';
    notesNew.classList.add("show");
    titleNewNote.value = '';
    textarea.value = '';
  }
  newNotesBtn.addEventListener('click', showBlock);
/* =============================== */  

/* Действие на кнопку "отмена" */
function hideBlock() {
    notesNew.classList.remove('show');
    notesBlock.style.display = 'flex';
};
  btnCancel.addEventListener('click', hideBlock);
/* =============================== */    


/* Действие на кнопку "сохранить" */
btnSave.addEventListener('click', function() {
    let note = {
        title: titleNewNote.value,
        text: textarea.value
    };

    if (note.title === '' && note.text === '') return;

    if (notesList[noteId]) {
        notesList[noteId] = note;
    }
    else {
        notesList.push(note);
    }
    notesCount = notesList.length;
    titleSecond.innerHTML = 'Всего: ' + notesCount;
    hideBlock();
    localStorage.setItem('note', JSON.stringify(notesList));
    showNotes();
});

function showNotes() {
    let newData= '';
    for (let i = 0; i < notesList.length; i++ ) {
        newData += 
        `
        <div class="notes__wrapper" id="${i}">
            <div class="notes__item">
                <p class="item__title">`+ notesList[i].title +`</p>
                <p class="item__text">`+ notesList[i].text +`</p>
                <p class="item__date">` + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() +`</p>
            </div>
            <button class="btn btn-edit" id="btn-edit${i}" uk-icon='icon: pencil; ratio: 1.5' onclick="editNote(this)"></button>
            <button class="btn btn-delete" id="btn-delete_${i}" uk-icon='icon: trash; ratio: 1.5' onclick="deleteNote(this)"></button>
        </div>
        `
    }
    notesBlock.innerHTML = newData;
    
};
/* =============================== */

/* Действие на кнопку удалить заметку */

function deleteNote(el) {
    let parent = el.parentElement;
    parent.style.display = 'none';
    notesList.splice(parent.id);
    localStorage.setItem('note', JSON.stringify(notesList));
    notesCount = notesList.length;
    titleSecond.innerHTML = 'Всего: ' + notesCount;
};
/* =============================== */

/* Действие на кнопку изменить заметку */

function editNote(el) {
    let parent = el.parentElement;
    noteId = parent.id;
    noteTitle = parent.querySelector('.item__title').textContent;
    noteText = parent.querySelector('.item__text').textContent;
    showEditBlock();
};

function showEditBlock() {
    notesBlock.style.display = 'none';
    notesNew.classList.add("show");
    titleNewNote.value = noteTitle;
    textarea.value = noteText;
};

/* ================================= */

const toggleSwitch = document.querySelector('.toggle-btn');
const theme = document.querySelector('#theme');
toggleSwitch.onclick = function() {

    const lightTheme = "css/light.css";
    const darkTheme = "css/dark.css";
    let currentTheme = theme.getAttribute("href");

    if (currentTheme == lightTheme) {
        currentTheme = darkTheme;
        toggleSwitch.classList.add('toggle-active');
    }
    else {
        currentTheme = lightTheme;
        toggleSwitch.classList.remove('toggle-active');
    } 

    theme.setAttribute("href", currentTheme);
    localStorage.setItem('theme', currentTheme);
};

if (localStorage.getItem('theme')) {
    let curThem = localStorage.getItem('theme');
    theme.setAttribute("href", curThem);
    if (curThem == 'css/light.css') {
        toggleSwitch.classList.remove('toggle-active');
    }
    else {
        toggleSwitch.classList.add('toggle-active');
    }
}
else {
    theme.setAttribute("href", 'css/light.css');
};

/* ================================= */

const btnSettings = document.querySelector('.btn-settings');
const menu = document.querySelector('.menu');
const content = document.querySelector('.content');

btnSettings.addEventListener('click', () => {
    menu.classList.toggle('menu-show');
});

content.addEventListener('click', () => {
    menu.classList.remove('menu-show');
});

/* ================================= */

const btnView = document.querySelector('#btn-view');

btnView.addEventListener('click', function(){

    if (notesBlock.classList.contains('box')) {
        notesBlock.classList.remove('box')
        localStorage.setItem('view', 'line')
    }
    else {
        notesBlock.classList.add('box');
        localStorage.setItem('view', 'box');
    }
});

if (localStorage.getItem('view') === 'line') {
    notesBlock.classList.remove('box')
}
else {
    notesBlock.classList.add('box');
};


