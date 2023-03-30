import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";
const AuthenticatedHeader = () => {
	const { logout } = useContext(AuthContext);
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="#home">Home</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link href="#about">About</Nav.Link>
					<Nav.Link href="#contact">Contact</Nav.Link>
					<Button onClick={logout}>Logout</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default AuthenticatedHeader;
