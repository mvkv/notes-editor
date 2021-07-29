import React from "react";
import isEmpty from "is-empty";
import EditNote from "./EditNote";
import { NotesList } from "./NotesList";

import globalStyles from "./../../css/App.module.css";
import styles from "./../../css/NotesDesktop.module.css";

export const NotesDesktop = (props) => {
  return (
    <div className={styles.notes}>
      <div className={styles.NotesLeft}>
        <div className={`${globalStyles.button} ${styles.noteBtn}`} onClick={props.showNewNote}>
          New note
        </div>
        <NotesList
          notes={props.notes}
          deleteNoteHandler={(id) => props.deleteNoteHandler(id)}
          showSelectedNote={(note) => props.showSelectedNote(note)}
          styles={styles}
        />
      </div>
      <div className={styles.notesRight}>
        {!isEmpty(props.activeNote) && (
          <EditNote
            newNoteHandler={props.newNoteHandler}
            activeNote={props.activeNote}
            clearActiveNote={props.clearActiveNote}
            styles={styles}
          />
        )}
      </div>
    </div>
  );
};
