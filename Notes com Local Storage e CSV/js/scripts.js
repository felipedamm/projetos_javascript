const addNoteInput = document.querySelector("#add-note-input");
const addNoteBtn = document.querySelector("#add-note-btn");
const notesContainer = document.querySelector("#notes-container");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#export-csv-btn");


const showNotes = () => {
    cleanNotes();
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);
        notesContainer.appendChild(noteElement);
    })
}

const cleanNotes = () => {
    notesContainer.replaceChildren([]);
}

const addNote = () => {

    const notes = getNotes();

    const noteObject = {
        id: generateId(),
        content: addNoteInput.value,
        fixed: false,
    }

    if (!noteObject.content) return;
    
    const note = createNote(noteObject.id, noteObject.content)
    notesContainer.appendChild(note);




    notes.push(noteObject);

    saveNotes(notes);

    addNoteInput.value = ""
}

const toggleFixNote = (id) => {
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0]

    targetNote.fixed = !targetNote.fixed;
    saveNotes(notes);
    showNotes();
}

const deleteNote = (id, note) => {
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);

    notesContainer.removeChild(note);


}

const searchNotes = (search) => {

    const searchResults = getNotes().filter((note) => {
        return note.content.includes(search);
    });

    if(search !== "") {
        cleanNotes();
        searchResults.forEach((note) => {
            const noteElement = createNote(note.id, note.content)
            notesContainer.appendChild(noteElement);
        });
        return;
    }

    cleanNotes();

    showNotes();

}

const copyNote = (id) => {

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id: generateId(),
        content: targetNote.content,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);

}

const createNote = (id, content, fixed) => {
    const note = document.createElement("div");
    note.classList.add("note");

    
    note.innerHTML = 
    `<p>${content}</p>
    <i class="bi bi-pin"></i>
    <i class="bi bi-x-lg"></i>
    <i class="bi bi-file-earmark-plus"></i>`

    if (fixed) {
        note.classList.add("fixed");
    }

    note.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixNote(id);
    });

    note.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, note);
    });

    note.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        copyNote(id);
    });

    return note;
}

const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1))
    return orderedNotes;
}

const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

const exportData = () => {

    const notes = getNotes();
    const csvString = [
        ["ID", "Conteúdo", "Fixado"],
        ...notes.map((note) => [note.id, note.content, note.fixed])
    ].map((e) => e.join(",")).join("\n")

    const element = document.createElement("a");

    element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);

    element.target = "_blank";
    element.download = "notes.csv";
    element.click();

}

function generateId() {
    return Math.floor(Math.random()*5000);
}


addNoteBtn.addEventListener("click", (e) => {
    addNote();
})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    searchNotes(search);
})

addNoteInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addNote();
    }
})

exportBtn.addEventListener("click", () => {
    exportData();
})

showNotes();