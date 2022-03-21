// import react from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
	// const [alert, setAlert] = useState(null);
	const [alert, setalert] = useState({ msg: "", type: "" })
	const showAlert = (message, type) => {
		setalert({
			msg: message,
			type: type
		})
		setTimeout(() => {
			setalert(null);
		}, 1500);
	}
	return (
		<>
			<NoteState>
				<Router>
					<Navbar showAlert={showAlert} />
					<Alert alert={alert} />

					<div className="container">
						<Routes>
							<Route exact path="/about" element={<About />} />
							<Route exact path="/" element={<Home showAlert={showAlert} />} />
							<Route exact path="/Login" element={<Login showAlert={showAlert} />} />
							<Route exact path="/SignUp" element={<SignUp showAlert={showAlert} />} />
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
