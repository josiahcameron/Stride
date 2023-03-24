import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import stride_logo from "../../assets/stride_logo.jpg";
import { CgProfile } from "react-icons/cg";
import { IoFootstepsSharp } from "react-icons/io5";
import { IoJournalSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// import {} from "../../assets/stride-logo";

function Header() {
	const { logout, isAuthenticated } = useContext(AuthContext);

	return (
		<div className="header-wrapper">
			<div className="logo-wrapper">
				<h1 className="title">STRIDE</h1>

				{/* <img src={stride_logo} alt="" /> */}
			</div>
			<div className="user">
				{/* <h2>{profile.display_name}</h2>
				<h2>Tier: {profile.tier}</h2> */}
			</div>
			<div className="nav-container">
				<nav className="top-nav">
					<button
						type="button"
						className={`btn btn-primary top-button btn-lg ${
							isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text" to="/register">
							Register
						</NavLink>
					</button>
					<button
						type="button"
						className={`btn btn-primary top-button btn-lg ${
							isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text" to="/login">
							Login
						</NavLink>
					</button>
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
						type="button"
						className="btn btn-primary top-button btn-lg hide"
					>
						{/* <NavLink className="nav-text" to="home">
							Home
						</NavLink> */}
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
		</div>
	);
}

export default Header;
