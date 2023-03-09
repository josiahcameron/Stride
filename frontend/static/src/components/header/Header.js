import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Header() {
	const { logout } = useContext(AuthContext);

	return (
		<>
			<h1 className="title">STRIDE</h1>
			<nav className="top-nav">
				<button type="button" className="btn btn-primary top-button">
					<NavLink className="nav-text" to="register">
						Register
					</NavLink>
				</button>
				<button type="button" className="btn btn-primary top-button ">
					<NavLink className="nav-text" to="login">
						Login
					</NavLink>
				</button>

				<button type="button" className="btn btn-primary top-button">
					<NavLink className="nav-text" to="/">
						Home
					</NavLink>
				</button>
				<button
					onClick={logout}
					type="button"
					className="btn btn-danger logout"
				>
					Logout
				</button>
			</nav>
		</>
	);
}

export default Header;
