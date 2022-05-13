const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const { v1: uuidv1 } = require("uuid");

let app = express();
let PORT = process.env.port || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

var createId = () => {
    return 'id-' + Math.random().toString(36).substring(2, 16);
  };

//   Home Page path
  app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// Notes Page path
  app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

//   Listed Notes
  app.get("/api/notes", (req, res) => {
      return res.json(db);
  });

  app.post("/api/notes", (req, res) => {
      let note= req.body;
      note.id = uuidv1();
      db.push(note);
      fs.writerFileSync("./db/db.json", JSON.stringify(db));
      res.json(db);
  });

  app.get("*", (req, res) => {
      res.sendFile(path.join(_dirname, "./public/index.html"));
  });

  app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
  });