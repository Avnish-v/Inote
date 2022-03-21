import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = () => {
	const context = useContext(NoteContext);
	const { notes } = context;
	const { getNotes, editNote } = context;
	let history = useNavigate();
	useEffect(() => {
		if (localStorage.getItem('token')) {
			getNotes();
		} else {
			history("/login")
		}
	}, []);
	const [note, setnote] = useState({
		id: "",
		etitle: " ",
		edescription: " ",
		etag: "general",
	});
	const updateNote = (currentnote) => {
		ref.current.click();
		setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

	}
	const handleclick = (e) => {
		editNote(note.id, note.etitle, note.edescription, note.etag);
		refclose.current.click();


	}
	const ref = useRef(null);
	const refclose = useRef(null);
	const onchange = e => {
		setnote({ ...note, [e.target.name]: [e.target.value] });
	};
	return (
		<>

			<AddNote />

			<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">EDIT NOTE</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form className="my-3" method="POST">
								<div className="mb-3">


									<label htmlFor="title" className="form-label">
										Title
									</label>
									<input
										required
										minLength={3}
										value={note.etitle}
										onChange={onchange}
										type="text"
										className="form-control"
										id="etitle"
										name="etitle"
										aria-describedby="emailHelp"
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="Description" className="form-label">
										Description
									</label>
									<input
										required
										minLength={5}
										value={note.edescription}
										onChange={onchange}
										type="text"
										className="form-control"
										id="edescription"
										name="edescription"
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="TAG" className="form-label">
										Tag
									</label>
									<input
										value={note.etag}
										onChange={onchange}
										type="text"
										className="form-control"
										id="etag"
										name="etag"
									/>
								</div>


							</form>
						</div>
						<div className="modal-footer">
							<button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={handleclick} >Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row my-3 mx-2">
				<h2 className="text-center bd-highlight fw-bolder">Your notes</h2>
				<div className="container ">


					{notes.length === 0 && "NO Notes To Display"}	</div>
				{notes.map(note => {

					return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
				})}

			</div>
		</>
	);
};
export default Notes;
