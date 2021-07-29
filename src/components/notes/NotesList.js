import React from "react";
import isEmpty from "is-empty";

import globalStyles from "./../../css/App.module.css"

export const NotesList = (props) => {
  return (
    <div className={props.styles.notesList}>
      {isEmpty(props.notes) ? (
        <div className={props.styles.emptyNotes}>
          <p>No notes to be shown</p>
        </div>
      ) : (
        props.notes
          .map((note) => {
            return (
              <div
                className={props.styles.noteItem}
                key={note._id}
                onClick={() => props.showSelectedNote(note)}
              >
                <div>
                  <h6 className={props.styles.noteTitle}>{note.title}</h6>
                  <p className={props.styles.noteBody}>{note.body.substr(0, 20) + (note.body.length > 20 ? "..." : "")}</p>
                </div>
                <div
                  onClick={() => props.deleteNoteHandler(note._id)}
                  className={globalStyles.closeButton}
                >
                  &#215;
                </div>
              </div>
            );
          })
          .reverse()
      )}
    </div>
  );
};
