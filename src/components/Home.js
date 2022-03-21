import React from "react";
// import AddNote from "./AddNote";
// import NoteItem from "./NoteItem";
import Notes from "./Notes";

const Home = (props) => {

	return (
		<>
			<Notes showAlert={props.showAlert} />
		</>
	);
};
export default Home;
