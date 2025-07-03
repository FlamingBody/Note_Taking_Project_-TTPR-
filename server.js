const express = require('express');
const app = express();
const PORT = 3000;

let notes = [];

app.use(express.json());
app.use(express.static('public'));

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// POST a new note
app.post('/notes', (req, res) => {
  const note = req.body;
  note.id = Date.now();
  notes.push(note);
  res.status(201).json(note);
});

// DELETE a note by ID
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});