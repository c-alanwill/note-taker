const path = require('path');
const fs = require('fs');
// const uuid = require('./uuid.js')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
// Not sure this port would be right when using Heroku

const notesData = require('./db.json');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (request, response) => {
    response.sendFile(path.resolve(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(notesData));

app.post('/api/notes', (req, res) => {
    // req.body.id = uuid()
   const note = req.body 
   notesData.push(note)
   res.json(notesData)
   fs.writeFileSync("./db.json", JSON.stringify(notesData))
});

// Related to deleting note:
// app.delete('/api/nodes/:id', (req,res) => {
//     const id = req.params.id
//     for (let index = 0; index < array.length; index++) {
//         const element = array[index];
//     }
// });

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, './public/index.html'));
});



app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });