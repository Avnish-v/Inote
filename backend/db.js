const mongoose = require("mongoose");

const connectomongo = () => {
	mongoose.connect("mongodb://localhost:27017/inotes", () => {
		console.log("you are connected");
	});
};
module.exports = connectomongo;
