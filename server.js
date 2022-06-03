const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

let app = express();
let PORT = process.env.PORT || 5000;

var idCreate = () => {
  return 'id-' + Math.random().toString(36).substring(2, 16);
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

//   Home Page path
  app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// Notes Page path
  app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  app.get("/api/notes", (req, res) => {
    console.log(notes);
    return res.json(notes);
    });

  app.get("*", (req, res) => {
      res.sendFile(path.join(_dirname, "./public/index.html"));
  });

  app.post("/api/notes", (req,res) => {
    let newNote = req.body;
    newNote.id = idCreate();
    notes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
})

app.delete("/api/notes/:id", (req, res) => {
  let noteDelete = req.params.id;

  for (let i = 0; i < notes.length; i++) {
      if (noteDelete === notes[i].id) {
          notes.splice(i,1);
          fs.writeFileSync("./db/db.json", JSON.stringify(notes));
          return res.json(notes);
      }
  }
  return res.json(false);
})

  app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
  });