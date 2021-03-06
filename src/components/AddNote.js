import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
	const context = useContext(NoteContext);
	const { addNote } = context;
	const [note, setnote] = useState({
		title: "",
		description: "",
		tag: "",
	});
	const HandleClick = e => {
		e.preventDefault();
		addNote(note.title[0], note.description[0], note.tag[0]);
		setnote({
			title: "",
			description: "",
			tag: "",
		})
		props.showAlert("note has been successfully added", "success");

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
						value={note.title}
						required
						minLength={3}
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
						value={note.description}
						required
						minLength={5}
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
						value={note.tag}
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
