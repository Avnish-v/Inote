import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = () => {
	const context = useContext(NoteContext);
	const { notes, getNotes } = context;
	useEffect(() => {
		return () => {
			getNotes();
		};
	}, []);

	return (
		<>
			<AddNote />

			{console.log("thidccs ", notes)}
			{console.log(notes)}
			<div className="row my-3 mx-2">
				<h2 className="text-center bd-highlight fw-bolder">Your notes</h2>
				{notes.map(note => {
					return <NoteItem key={note._id} note={note} />;
				})}
			</div>
		</>
	);
};
export default Notes;
