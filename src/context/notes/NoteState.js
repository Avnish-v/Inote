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
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjE5MmRlNGZmNjliZTIwYjU4YzZhIn0sImlhdCI6MTY0NDg5NDg0Mn0.ZU8LMdP9rKSIagHRtg-xh7VGwim4TbYMZBHzSm4W0mc",
			},
		});

		const json = await response.json();
		setnotes(json);
	};

	//! add a note
	const addNote = async (title, description, tag) => {
		//!todo api calls
		console.log("this is the des", description, title);

		const response = await fetch(`${host}/api/notes/addnote`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjE5MmRlNGZmNjliZTIwYjU4YzZhIn0sImlhdCI6MTY0NDg5NDg0Mn0.ZU8LMdP9rKSIagHRtg-xh7VGwim4TbYMZBHzSm4W0mc",
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const note = {
			_id: "6211ed975635868d8c69e4ea",
			user: "620b192de4ff69be20b58c6a",
			title: title,
			tag: tag,
			description: description,
			date: "2022-02-20T07:28:23.342Z",
			__v: 0,
		};

		setnotes(notes.concat(note));
	};
	//*Delete note
	const deleteNote = async id => {
		const response = await fetch(`${host}/api/notes/deletion/${id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYjJhYTlmM2U4MzM0YTE3ZWViZGQ3In0sImlhdCI6MTY0Njk5NjE2Mn0.wUOxfGTJBHHgM0vt97_aF87p91qJJO2ptDsL8ESHR_0",
			},
		});
		const json = await response.json();
		console.log(json);
		const newNotes = notes.filter(note => {
			return note._id !== id;
		});
		setnotes(newNotes);
	};

	//!edit note
	const editNote = async (id, title, description, tag) => {
		//api calls

		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjE5MmRlNGZmNjliZTIwYjU4YzZhIn0sImlhdCI6MTY0NDk0MTI1NX0.KIlZhJjf071iknt5dJ71tF2GszYPgWps0V50CjC2yJk",
			},
			body: JSON.stringify({ title, description, tag }),
		});
		// const json = await response.json();
		//!logic
		for (let index = 0; index < notes.length; index++) {
			const element = notes[index];
			if (element._id === id) {
				element.description = description;
				element.title = title;
				element.tag = tag;
			}
		}
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
