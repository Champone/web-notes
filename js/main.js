const newNotesBtn = document.querySelector('#new-notes');
const notesBlock = document.querySelector('.notes');
const notesNew = document.querySelector('.notes__new');

newNotesBtn.addEventListener("click", function() {
    notesBlock.style.display = 'none';
    notesNew.style.display = 'flex';
})