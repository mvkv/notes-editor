import { useAuth0 } from "@auth0/auth0-react";
import isEmpty from "is-empty";
import React, { useState, useEffect } from "react";

import globalStyles from "./../../css/App.module.css";

export default function EditNote(props) {
  const [state, setState] = useState({
    _id: "",
    title: "New note",
    body: "",
    isNoteUpdate: false,
  });

  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (event) => {
    const value = event.target.value;

    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      _id: props.activeNote._id,
      title: props.activeNote.title,
      body: props.activeNote.body,
    });
  }, [props.activeNote]);

  const submitNote = async () => {
    const token = await getAccessTokenSilently();
    if (isEmpty(state._id)) {
      const newNote = { title: state.title, body: state.body };
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const resData = await res.json();
      props.newNoteHandler({ ...newNote, _id: resData._id });
    } else {
      const newNote = { title: state.title, body: state.body };
      const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/notes/${state._id}`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const resData = await res.json();
      props.newNoteHandler({ ...newNote, _id: resData._id });
    }
  };

  return (
    <div className={props.styles.noteEditor}>
      <div className={globalStyles.buttonBar}>
        <div
          className={`${globalStyles.button} ${props.styles.noteBtn}`}
          onClick={props.clearActiveNote}
        >
          &#8592;
        </div>
        <div
          className={`${globalStyles.button} ${props.styles.noteBtn}`}
          onClick={submitNote}
        >
          Save
        </div>
      </div>
      <input
        type="text"
        className={props.styles.noteEditorTitle}
        name="title"
        value={state.title}
        onChange={handleChange}
      ></input>

      <textarea
        value={state.body}
        placeholder="Write some text here..."
        name="body"
        className={props.styles.noteEditorBody}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
