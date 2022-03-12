import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = () => {
	const context = useContext(NoteContext);
	const { addNote } = context;
	const [note, setnote] = useState({
		title: " ",
		description: " ",
		tag: "default",
	});
	const HandleClick = e => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
	};
	const onchange = e => {
		setnote({ ...note, [e.target.name]: [e.target.value] });
	};
	return (
		<div className="container my-3">
			<h2 className="text-center bd-highlight fw-bolder">Add a Note</h2>
			<form className="my-3" method="POST">
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						onChange={onchange}
						type="text"
						className="form-control"
						id="title"
						name="title"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="Description" className="form-label">
						Description
					</label>
					<input
						onChange={onchange}
						type="text"
						className="form-control"
						id="description"
						name="description"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="TAG" className="form-label">
						Tag
					</label>
					<input
						onChange={onchange}
						type="text"
						className="form-control"
						id="tag"
						name="tag"
					/>
				</div>

				<button type="submit" className="btn btn-primary" onClick={HandleClick}>
					ADD
				</button>
			</form>
		</div>
	);
};

export default AddNote;
