const newNotesBtn = document.querySelector('#new-notes');
const notesBlock = document.querySelector('.notes');
const notesNew = document.querySelector('.notes__new');
const btnCancel = document.querySelector('#btn-cancel');
const btnSave = document.querySelector('#btn-save');
const titleNewNote = document.querySelector('.title-new');
const textarea = document.querySelector('.textarea');
let notesCount = 0;
const titleSecond = document.querySelector('.title__second');
let date = new Date();


let notesList = [];

window.onload = function() {
    if (localStorage.getItem('note')) {
        notesBlock.innerHTML = localStorage.getItem('note');
    } 
}

/* Действие на кнопку "новая заметка"  */
function showBlock() {
    notesBlock.style.display = 'none';
    notesNew.classList.add("show");
    newNotesBtn.style.display = 'none';
    titleNewNote.value = '';
    textarea.value = '';
  }
  newNotesBtn.addEventListener('click', showBlock);

/* Действие на кнопку "отмена" */
function hideBlock() {
    notesNew.classList.remove('show');
    notesBlock.style.display = 'flex';
    newNotesBtn.style.display = 'block';
};
  btnCancel.addEventListener('click', hideBlock);
    


/* Действие на кнопку "сохранить" */
btnSave.addEventListener('click', function() {
    let note = {
        title: titleNewNote.value,
        text: textarea.value
    };

    hideBlock();
    notesList.push(note);
    // notesCount++;
    // titleSecond.textContent = notesCount + ' заметка';
    newNotesBtn.style.display = 'block';
    showNotes();
});

function showNotes() {
    let showNote = '';

    for (let i = 0; i < notesList.length; i++ ) {
        showNote += `
        <div class="notes__wrapper">
            <div class="notes__item" id="item_${i}">
                <p class="item__title">`+ notesList[i].title +`</p>
                <p class="item__text">`+ notesList[i].text +`</p>
                <p class="item__date">` + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() +`</p>
            </div>
            <button class="btn" id="btn-delete" uk-icon='icon: trash; ratio: 1.5'></button>
        </div>`
        
        
            
        notesBlock.innerHTML = showNote;
        localStorage.setItem('note', notesBlock.innerHTML);
    }
};