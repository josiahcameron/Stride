// import { Navbar, Nav } from "react-bootstrap";

// const UnauthenticatedHeader = () => {
// 	return (
// 		<Navbar bg="light" expand="lg">
// 			<Navbar.Brand href="#home">Home</Navbar.Brand>
// 			<Navbar.Toggle aria-controls="basic-navbar-nav" />
// 			<Navbar.Collapse id="basic-navbar-nav">
// 				<Nav className="ml-auto">
// 					<Nav.Link href="#about">About</Nav.Link>
// 					<Nav.Link href="#contact">Contact</Nav.Link>
// 				</Nav>
// 			</Navbar.Collapse>
// 		</Navbar>
// 	);
// };

// export default UnauthenticatedHeader;
import Cookies from "js-cookie";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { useContext, useState, useEffect } from "react";
import stride_logo from "../../assets/stride_logo.jpg";
import { CgProfile } from "react-icons/cg";
import { IoFootstepsSharp } from "react-icons/io5";
import { IoJournalSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// import {} from "../../assets/stride-logo";

function Header() {
	const { isAuthenticated } = useContext(AuthContext);
	// Front-end authentication filter for conditional rendering in React

	const handleError = (err) => {
		console.warn(err);
	};
	const [profile, setProfile] = useState(null);

	return (
		<div className="header-wrapper">
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
		</div>
	);
}

export default Header;
