function checkStorage() {
    let notesArray = window.localStorage.getItem('notePad');

    if (notesArray) {
        notesArray = JSON.parse(notesArray);
        createNoteGrid(notesArray);
    }
}

function createNoteGrid(notesArray) {
    notesArray.forEach(note => {
        printNoteItem(note)
    });
}

function save(e) {
    e.preventDefault();

    const note = document.getElementById(`mainNotePad`).value
    const date = document.getElementById(`taskDate`).value
    const time = document.getElementById(`taskTime`).value

    const currentTime = new Date();
    const id = currentTime.getTime();

    let newNote = {
        "mainNotePad": note,
        "taskDate": date,
        "taskTime": time,
        "id": "" + id
    }

    saveToLocalStorage(newNote)
    printNoteItem(newNote)
}

function saveToLocalStorage(newNote) {

    let notePad = window.localStorage.getItem('notePad');
    if (!notePad) {
        notePad = []
    } else {
        notePad = JSON.parse(notePad);
    }

    notePad.push(newNote);
    window.localStorage.setItem(`notePad`, JSON.stringify(notePad));
}

function printNoteItem(savedNote) {
    let newNote = document.createElement(`div`);
    newNote.setAttribute("id", savedNote.id);
    newNote.setAttribute("class", "newNoteWrapper");

    let noteElement = document.createElement(`span`);
    noteElement.innerText = savedNote.mainNotePad;
    noteElement.setAttribute("class", "note");

    let dateElement = document.createElement(`span`);
    dateElement.innerText = savedNote.taskDate
    dateElement.setAttribute("class", "date");

    let timeElement = document.createElement(`span`);
    timeElement.innerText = savedNote.taskTime
    timeElement.setAttribute("class", "time");
    const deleteNote = () => {
        deleteItem(savedNote.id)
    }

    let closeElement = document.createElement(`span`);
    closeElement.setAttribute("class", "close");
    closeElement.addEventListener("click", deleteNote);
    closeElement.innerText = "❌";

    newNote.appendChild(noteElement);
    newNote.appendChild(dateElement);
    newNote.appendChild(timeElement);
    newNote.appendChild(closeElement);

    notePrint = document.getElementById(`notePrint`);
    notePrint.appendChild(newNote);

}

function deleteItem(id) {
    const noteId = document.getElementById(id)

    noteId.remove();

    const mynotes = JSON.parse(window.localStorage.getItem(`notePad`));

    const newArray = mynotes.filter((item) => item.id !== id)

    window.localStorage.setItem(`notePad`, JSON.stringify(newArray));
}