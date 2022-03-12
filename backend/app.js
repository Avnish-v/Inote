const connectomongo = require("./db");
connectomongo();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const port = 5000;

app.use(express.json());
//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
	console.log(`you are listening to the ${port}`);
});
