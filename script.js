const addNoteBtn = document.getElementById('addNote');
const notesContainer = document.getElementById('notes-container');

function getNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  notesContainer.innerHTML = '';
  const notes = getNotes();

  if (notes.length === 0) {
    notesContainer.innerHTML = `<p style="color: #777;">No notes yet. Start writing something colorful! 🌈</p>`;
    return;
  }

  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerHTML = `
      <h3>📌 ${note.title}</h3>
      <p>${note.body}</p>
      <button class="delete" onclick="deleteNote(${index})">🗑️ Delete</button>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

function addNote() {
  const title = document.getElementById('title').value.trim();
  const body = document.getElementById('body').value.trim();

  if (!title || !body) {
    alert('Both title and body are required! ✨');
    return;
  }

  const notes = getNotes();
  notes.push({ title, body });
  saveNotes(notes);
  renderNotes();

  document.getElementById('title').value = '';
  document.getElementById('body').value = '';
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  renderNotes();
}

// Initial load
renderNotes();

// Add note
addNoteBtn.addEventListener('click', addNote);