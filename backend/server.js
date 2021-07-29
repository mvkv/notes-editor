const express = require("express");
const app = express();
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const { default: jwtDecode } = require("jwt-decode");

// .env loading (to remove in production)
require("dotenv").config();

// App addons
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("open", () => {
  console.log("MongoDB connection successful!");
});

// Authorization header handler (Auth0)
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

const checkScopes = jwtAuthz(["read:notes", "update:notes"]);


// Utils functions

const getUserIdFromJwt = (token) => jwtDecode(token).sub.split("|").pop();

// Routes

// GET /api/notes
// @route-type: private
// @description: Retrieve notes list
app.get("/api/notes", checkJwt, (req, res) => {
  const token = req.headers.authorization;
  const userId = getUserIdFromJwt(token)

  const user = User.findById(userId, (err, user) => {
    res.json(user.notes);
  });
});

// POST /api/notes
// @route-type: private
// @description: Adds a note to the list
app.post("/api/notes", checkJwt, (req, res) => {
  console.log("Adding note");
  const newNote = {
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
  }
  const token = req.headers.authorization;
  const userId = getUserIdFromJwt(token)
  const user = User.findById(userId, (err, user) => {
    user.notes.push(newNote);
    user.save();
  });
  console.log("Note added");
  res.send({status: "done", _id: newNote._id})
});

// UPDATE /api/notes/<note_id>
// @route-type: private
// @description: Updates a note to the list
app.post("/api/notes/:noteId", checkJwt, (req, res) => {
  console.log("Updating note");
  const noteId = req.params.noteId;
  const token = req.headers.authorization;
  const userId = getUserIdFromJwt(token)
  const user = User.findById(userId, (err, user) => {
    note = user.notes.id(noteId)
    note.title = req.body.title;
    note.body = req.body.body;
    user.save();
  });
  console.log("Note updated");
  res.send({status: "done", _id: noteId})
});

// DELETE /api/notes/delete/<note_id>
// @route-type: private
// @description: Remove a note to the list
app.delete("/api/notes/delete/:noteId", checkJwt, (req, res) => {
  console.log("Deleting note");
  const noteId = req.params.noteId;
  console.log(noteId);
  const token = req.headers.authorization;
  const userId = getUserIdFromJwt(token)
  const user = User.findById(userId, (err, user) => {
    user.notes.pull({_id: mongoose.Types.ObjectId(noteId)});
    user.save();
  });
  console.log("Note deleted");
  res.send({status: "done", _id: noteId})
})

// Starting server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API server started on port: ${port}`);
});
