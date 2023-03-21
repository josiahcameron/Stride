import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import stride_logo from "../../assets/stride_logo.jpg";

// import {} from "../../assets/stride-logo";

function Header() {
	const { logout, isAuthenticated } = useContext(AuthContext);

	return (
		<div className="header-wrapper">
			<div className="logo-wrapper">
				<h1 className="title">STRIDE</h1>
				<img src={stride_logo} alt="" />
			</div>
			<div className="nav-container">
				<nav className="top-nav">
					<button
						type="button"
						className={`btn btn-primary top-button ${
							isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text" to="register">
							Register
						</NavLink>
					</button>
					<button
						type="button"
						className={`btn btn-primary top-button ${
							isAuthenticated && "hide"
						}`}
					>
						<NavLink className="nav-text" to="login">
							Login
						</NavLink>
					</button>

					<button
						type="button"
						className="btn btn-primary top-button hide"
					>
						<NavLink className="nav-text " to="/">
							Habits
						</NavLink>
					</button>
					<button
						type="button"
						className="btn btn-primary top-button hide"
					>
						{/* <NavLink className="nav-text" to="home">
							Home
						</NavLink> */}
					</button>
					<button
						onClick={logout}
						type="button"
						className={`btn btn-danger logout ${
							!isAuthenticated && "hide"
						}`}
					>
						Logout
					</button>
				</nav>
			</div>
		</div>
	);
}

export default Header;
