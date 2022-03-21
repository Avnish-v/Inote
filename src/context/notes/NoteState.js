import { useState } from "react";
import NoteContext from "./NoteContext";

//!

const NoteState = props => {
	const host = "http://localhost:5000";
	const notesIntial = [];

	const [notes, setnotes] = useState(notesIntial);

	//! get notes:
	const getNotes = async () => {
		//!todo api calls
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"auth-token":
					localStorage.getItem("token")
			},
		});

		const json = await response.json();
		setnotes(json);
	};

	//! add a note
	const addNote = async (title, description, tag) => {
		//!todo api calls;
		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"auth-token": localStorage.getItem("token")

			},

			body: JSON.stringify({ title, description, tag }),

		});
		const note = await response.json();

		setnotes(notes.concat(note));
	};
	//*Delete note
	const deleteNote = async id => {
		const response = await fetch(`${host}/api/notes/deletion/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				"auth-token":
					localStorage.getItem("token")
			},
		});
		// const json = await response.json();

		const newNotes = notes.filter(note => {
			return note._id !== id;
		});
		setnotes(newNotes);
	};

	//!edit note
	const editNote = async (id, title, description, tag) => {
		//api calls

		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				"auth-token":
					localStorage.getItem("token")
			},
			body: JSON.stringify({ title, description, tag }),
		});
		// const json = await response.json();
		//!logic
		let newnotes = JSON.parse(JSON.stringify(notes));
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				newnotes[index].description = description[0];
				newnotes[index].title = title[0];
				newnotes[index].tag = tag[0];
				break;
			}
		}
		setnotes(newnotes)
	};
	return (
		<NoteContext.Provider
			value={{ notes, editNote, deleteNote, addNote, getNotes }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};
export default NoteState;
