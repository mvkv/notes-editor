import React from "react";
import isEmpty from "is-empty";
import EditNote from "./EditNote";
import { NotesList } from "./NotesList";
import { useState } from "react";

import globalStyles from "./../../css/App.module.css";
import styles from "./../../css/NotesMobile.module.css";

export const NotesMobile = (props) => {
  const [state, setState] = useState({
    displayNote: false,
  });

  return (
    <div className={styles.notes}>
      {isEmpty(props.activeNote) ? (
        <div className={styles.notesLeft}>
          <div
            className={`${globalStyles.button} ${styles.noteBtn}`}
            onClick={props.showNewNote}
          >
            New note
          </div>
          <NotesList
            notes={props.notes}
            deleteNoteHandler={(id) => props.deleteNoteHandler(id)}
            showSelectedNote={(note) => props.showSelectedNote(note)}
            styles={styles}
          />
        </div>
      ) : (
        <div className={styles.notesRight}>
          <EditNote
            newNoteHandler={props.newNoteHandler}
            activeNote={props.activeNote}
            clearActiveNote={props.clearActiveNote}
            styles={styles}
          />
        </div>
      )}
    </div>
  );
};
