import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //TODO : API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNDBmNTgxODFiY2NkMWI2OTI4YjNiIn0sImlhdCI6MTY3Mjc0NzgxMH0.hNepZecggxLfOQ5oa5sLr9xYgSwqj86ylgfH9AxWO4c",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    // setNotes
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO : API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNDBmNTgxODFiY2NkMWI2OTI4YjNiIn0sImlhdCI6MTY3Mjc0NzgxMH0.hNepZecggxLfOQ5oa5sLr9xYgSwqj86ylgfH9AxWO4c",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    console.log("Adding a new note");
    const note = {
      _id: "63b51443cb461a2a8d5d9559",
      user: "63b40f58181bccd1b6928b3b",
      title: title,
      description: description,
      tag: tag,
      date: "2023-01-04T05:53:07.471Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNDBmNTgxODFiY2NkMWI2OTI4YjNiIn0sImlhdCI6MTY3Mjc0NzgxMH0.hNepZecggxLfOQ5oa5sLr9xYgSwqj86ylgfH9AxWO4c",
      },
    });
    const json = response.json();
    console.log(json);
    console.log("Delete the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNDBmNTgxODFiY2NkMWI2OTI4YjNiIn0sImlhdCI6MTY3Mjc0NzgxMH0.hNepZecggxLfOQ5oa5sLr9xYgSwqj86ylgfH9AxWO4c",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id == id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
