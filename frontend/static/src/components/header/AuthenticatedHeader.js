import Cookies from "js-cookie";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
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
	const { logout, isAuthenticated } = useContext(AuthContext);
	// Front-end authentication filter for conditional rendering in React
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;

	const handleError = (err) => {
		console.warn(err);
	};
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(`/api_v1/profile/`);
				const data = await response.data[0];
				setProfile(data);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchProfile();
	}, []);
	if (profile === null) {
		return <div>Loading...</div>;
	}
	return (
		<Navbar fixed="top" className="header-wrapper">
			<div className="logo-wrapper">
				<h1 className="title">STRIDE</h1>

				{/* <img src={stride_logo} alt="" /> */}
			</div>
			<div className="user">
				{profile && <h2>{profile.display_name}</h2>}
				{profile && <h2>Tier: {profile.tier}</h2>}
			</div>
			<div className="nav-container">
				<nav className="top-nav">
					<button
						type="button"
						className={`btn btn-danger btn-lg top-button ${
							!isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text " to="/profile">
							<CgProfile /> Profile
						</NavLink>
					</button>
					<button
						type="button"
						className={`btn btn-danger btn-lg top-button ${
							!isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text " to="/">
							<IoFootstepsSharp /> Steps
						</NavLink>
					</button>
					<button
						type="button"
						className={`btn btn-danger btn-lg top-button ${
							!isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text " to="/journal">
							<IoJournalSharp /> Journal
						</NavLink>
					</button>

					<button
						onClick={logout}
						type="button"
						className={`btn btn-danger btn-lg top-button logout ${
							!isAuthenticated && "hide"
						}`}
					>
						<MdLogout /> Logout
					</button>
				</nav>
			</div>
		</Navbar>
	);
}

export default Header;
