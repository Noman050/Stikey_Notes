// Retrieve notes from local storage or initialize an empty array
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const noteList = document.getElementById("note-list");
const defaultMessage = document.getElementById("default-message");

// Function to create a new note item
function createNoteItem(note) {
  const li = document.createElement("li");
  li.textContent = note;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    removeNoteItem(note);
  });
  li.appendChild(deleteButton);
  return li;
}

// Function to add a note to the list and local storage
function addNoteItem(note) {
  const noteItem = createNoteItem(note);
  noteList.appendChild(noteItem);
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  toggleDefaultMessage();
  noteInput.value = "";
}

// Function to remove a note from the list and local storage
function removeNoteItem(note) {
  const index = notes.indexOf(note);
  if (index !== -1) {
    const confirmation = confirm(`Are you sure you want to remove the note: ${note}?`);
    if (confirmation) {
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteList.removeChild(noteList.childNodes[index]);
      toggleDefaultMessage();
    }
  }
}


// Function to toggle the display of the default message
function toggleDefaultMessage() {
  if (notes.length > 0) {
    defaultMessage.style.display = "none";
  } else {
    defaultMessage.style.display = "block";
  }
}

// Event listener for the note form submission
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const note = noteInput.value.trim();
  if (note !== "") {
    addNoteItem(note);
  }
});

// Populate the note list from local storage on page load
if (notes.length > 0) {
  notes.forEach((note) => {
    const noteItem = createNoteItem(note);
    noteList.appendChild(noteItem);
  });
  toggleDefaultMessage();
}
