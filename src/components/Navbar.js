import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar(props) {
	let history = useNavigate();
	let location = useLocation();
	// useEffect(() => {}, [location]);
	const logout = () => {
		localStorage.removeItem("token");
		history("/login")
		props.showAlert("logut sucessfully done", "danger")
	}
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link
						className={`navbar-brand ${location.pathname === "/" ? "active" : " "
							}`}
						to="/"
					>
						I-NoteBook
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/" ? "active" : " "
										}`}
									aria-current="page"
									to="/"
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/about" ? "active" : " "
										}`}
									to="/about"
								>
									About
								</Link>
							</li>
						</ul>
						{!localStorage.getItem("token") ? <form className="d-flex">

							<Link className="btn btn-primary mx-1 btn-sm" to="/login" role="button">Login</Link>
							<Link className="btn btn-primary mx-1 btn-sm" to="/signUp" role="button">SignUp</Link>
						</form> : <Link className="btn btn-primary mx-1 btn-sm" to="/login" role="button" onClick={logout}>Logout</Link>}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
