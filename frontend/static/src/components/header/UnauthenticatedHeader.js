import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function Header() {
	const { isAuthenticated } = useContext(AuthContext);
	// Front-end authentication filter for conditional rendering in React

	const handleError = (err) => {
		console.warn(err);
	};
	const [profile, setProfile] = useState(null);

	return (
		<Navbar fixed="top" className="header-wrapper">
			<div className="logo-wrapper">
				<h1 className="title">STRIDE</h1>

				{/* <img src={stride_logo} alt="" /> */}
			</div>

			<div className="nav-container">
				<nav className="top-nav">
					<button
						type="button"
						className={"btn btn-primary top-button btn-lg"}
					>
						<NavLink className="nav-text" to="/register">
							Register
						</NavLink>
					</button>
					<button
						type="button"
						className={`btn btn-primary top-button btn-lg`}
					>
						<NavLink className="nav-text" to="/login">
							Login
						</NavLink>
					</button>
				</nav>
			</div>
		</Navbar>
	);
}

export default Header;
