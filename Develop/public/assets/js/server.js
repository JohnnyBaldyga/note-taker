const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Generate unique IDs
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));

// API Routes
// GET all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes.' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST a new note
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Assign a unique ID to the new note
  fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes.' });
      return;
    }
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save note.' });
        return;
      }
      res.json(newNote);
    });
  });
});

// HTML Routes
// GET notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// GET index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});