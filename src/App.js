// import react from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
// import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react/cjs/react.production.min";

function App() {
	// const [alert, setAlert] = useState(null);
	// const showAlert = (message, type) => {
	// 	setAlert({
	// 		msg: message,
	// 		type: type
	// 	})
	// 	setTimeout(() => {
	// 		setAlert(null);
	// 	}, 1500);
	// }
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					{/* <Alert alert={alert} /> */}

					<div className="container">
						<Routes>
							<Route exact path="/about" element={<About />} />
							<Route exact path="/" element={<Home />} />
							<Route exact path="/Login" element={<Login />} />
							<Route exact path="/SignUp" element={<SignUp />} />
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
