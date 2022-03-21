import React, { useContext } from "react";
import notecontext from "../context/notes/NoteContext";

const NoteItem = props => {
	const context = useContext(notecontext);
	const { deleteNote, } = context;

	const { note, updateNote } = props;

	return (
		<>
			<div className="card" style={{ width: "18rem", margin: "20px 20px" }}>
				<div className="card-body">
					<div className="d-flex align-items-center">
						<h5 className="card-title">{note.title}</h5>
						<i
							className="fa fa-trash mx-2"
							aria-hidden="true"
							onClick={() => {
								deleteNote(note._id);
							}}
						></i>
						<i className="fa fa-pencil-square-o mx-2" onClick={() => { updateNote(note) }} aria-hidden="true"></i>
					</div>
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</>
	);
};
export default NoteItem;
