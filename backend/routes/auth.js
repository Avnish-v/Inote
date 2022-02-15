const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const fetchuser = require("../middleware/fetchuser");

//create  a user using post "/api/auth/"
//!route 1: create
router.post(
	"/create-user",
	[
		body("email").isEmail(),
		body("password").isLength({ min: 6 }),
		body("name").isLength({ min: 3 }),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
		}

		// check user with same user.. by email
		try {
			let user = await User.findOne({ email: req.body.email });
			console.log(user);
			if (user !== null) {
				return res
					.status(400)
					.json({ error: "please enter the correct credential" });
			}
			const salt = await bcrypt.genSalt(10);
			const secpass = await bcrypt.hash(req.body.password, salt);
			user = await User.create({
				name: req.body.name,
				password: secpass,
				email: req.body.email,
			});
			let data = {
				id: user.id,
			};
			const AuthToken = jwt.sign(data, jwt_sc);

			res.json({ AuthToken });
		} catch (error) {
			console.error("something is wrong", error);
			res.status(500).send("Internal Server Error");
		}
	}
);
//!route 2 :login
router.post(
	"/login",
	[
		body("email").isEmail(),
		body("password", "password can not be blank").exists(),
	],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).json({ errors: err.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ error: "please try to login correct cardential" });
			}
			const passwordcompare = await bcrypt.compare(password, user.password);
			if (!passwordcompare) {
				return res
					.status(400)
					.json({ error: "Please try to login with correct credentials" });
			}
			const data = {
				user: {
					id: user.id,
				},
			};
			const AuthToken = jwt.sign(data, jwt_sc);
			res.json({ AuthToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
);
//!route 3 :  get user details using post ... /api/auth/getuser.............
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		const userid = req.user.id;
		const user = await User.findById(userid).select("-password");
		res.send(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
