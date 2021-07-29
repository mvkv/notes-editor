const mongoose = require("mongoose");

const Note = new mongoose.Schema({
  title: String,
  body: String,
});

//NB: Note is a Schema, not a model 
module.exports = Note;
