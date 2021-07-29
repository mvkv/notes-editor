const mongoose = require("mongoose");
const Note = require("./NoteSchema");

const User = new mongoose.Schema({
  id: String,
  notes: [Note],
});

module.exports = mongoose.model("users", User);
