import logo from "./logo.svg";
import "./App.css";
import APITest from "./ApiTest/APITest";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<APITest />
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
