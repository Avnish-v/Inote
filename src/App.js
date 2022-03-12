// import react from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert msg={"hello w"} />
					<div className="container">
						<Routes>
							<Route exact path="/about" element={<About />} />
							<Route exact path="/" element={<Home />} />
						</Routes>
					</div>
				</Router>
			</NoteState>
		</>
	);
}

export default App;
