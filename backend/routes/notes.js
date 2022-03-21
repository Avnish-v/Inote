const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//!route 1 get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		res
			.status(401)
			.json({ error: "can not get data because of internal server error" });
	}
});
//! adding notes route 2  //login required
router.post(
	"/addnote",
	fetchuser,
	[
		body("title", "please enter the valid title").isLength({ min: 3 }),
		body("description", "descriptiobn must be altleast 5 char").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		try {
			const error = validationResult(req);
			const { title, description, tag } = req.body;
			if (!error.isEmpty()) {
				return res.status(401).json({ error: "please enter the valid " });
			}
			const note = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			console.log("this is the error", note);

			const savednotes = await note.save();

			res.json(savednotes);
			console.log("thie is saved note", savednotes);
		} catch (error) {
			console.log('this is the error',error);
			
			
			res.status(401).json({ error});
		}
	}
);
//! route  3 update an existing note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;
	try {
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (title) {
			newNote.description = description;
		}
		if (title) {
			newNote.tag = tag;
		}
		//find the note to be updated
		var note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(404).json({ error: "something went wrong" });
		}
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("not allowed");
		}
		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.json({ "this is note": note });
	} catch (error) {
		console.log("internal server error");
		res.send("internal server error");
	}
	//new note object;
});
//! this the route 3 for deletion
router.delete("/deletion/:id", fetchuser, async (req, res) => {
	try {
		let note = await Notes.findById(req.params.id);
		if (!note) {
			return res.status(401).send("unable to delete ");
		}
		//allow deletion only user is true
		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("unable to delete ");
		}
		if (note.user.toString() === req.user.id) {
			note = await Notes.findByIdAndDelete(req.params.id);
			res.json({ sucess: "deletion as been done thankyou keep using" });
		}
	} catch (error) {
		console.log("internal server error",error);
		res.json({error})
		
	}
});

module.exports = router;
