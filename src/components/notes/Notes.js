import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import isEmpty from "is-empty";
import { NotesDesktop } from "./NotesDesktop";
import { NotesMobile } from "./NotesMobile";

import globalStyles from "./../../css/App.module.css"

const Notes = () => {
  const [state, setState] = useState({
    notes: [],
    activeNote: {},
    addedNewNote: false,
  });

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Gets the notes from API and puts into state
    const getNotes = async () => {
      console.log("updating...");
      try {
        const token = await getAccessTokenSilently();

        const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const notes = await response.json();
        setState({
          ...state,
          notes: notes,
        });

        if (isEmpty(notes)) {
          showNewNote();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getNotes();
    console.log(state.notes);
  }, [state.addedNewNote]);

  const showNewNote = () => {
    setState({
      ...state,
      activeNote: {
        _id: "",
        title: "New note",
        body: "",
      },
    });
  };

  const showSelectedNote = (note) => {
    setState({
      ...state,
      activeNote: note,
    });
  };

  const clearActiveNote = () => {
    setState({
      ...state,
      activeNote: "",
    })
  }

  const newNoteHandler = (note) => {
    let noteUpdate = false;
    state.notes.map((item) => {
      if (item._id == note._id) {
        item.title = note.title;
        item.body = note.body;
        noteUpdate = true;
      }
    });
    if (!noteUpdate) {
      setState({
        ...state,
        activeNote: note,
        notes: [...state.notes, note],
      });
    } else {
      setState({
        ...state,
      });
    }
  };

  const deleteNoteHandler = async (noteId) => {
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes/delete/${noteId}`;
    const token = await getAccessTokenSilently();
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedNotes = state.notes.filter((note) => note._id != noteId);
    setState({
      ...state,
      activeNote: state.activeNote._id == noteId ? "" : state.activeNote,
      notes: updatedNotes,
    });
  };

  const isMobile = () => {
    if (window.innerWidth < 768) {
      return true
    } else return false;
  };

  const notesPageProps = {
    notes: state.notes,
    activeNote: state.activeNote,
    newNoteHandler: newNoteHandler,
    deleteNoteHandler: (noteId) => deleteNoteHandler(noteId),
    showSelectedNote: (note) => showSelectedNote(note),
    showNewNote: showNewNote,
    newNoteHandler: newNoteHandler,
    clearActiveNote: clearActiveNote,
  }

  return (
    <div className={globalStyles.pageContent}>
      {isMobile() ? (<NotesMobile {...notesPageProps} />): (<NotesDesktop {...notesPageProps} />)}
    </div>
  );
};

export default Notes;
