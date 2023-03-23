import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Form, Card, Button } from "react-bootstrap";
import { Paper } from "@mui/material";

const INITIAL_FORM_DATA = {
	text: "",
};
function JournalEntry() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const [journalEntry, setJournalEntry] = useState("");
	const [previousEntries, setPreviousEntries] = useState(null);
	const [date, setDate] = useState(null);
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	useEffect(() => {
		async function getCurrentDate() {
			let currentDate = new Date();

			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1;
			const year = currentDate.getFullYear();

			if (month.length > 1 && day.length > 1) {
				currentDate = `${month}-${day}-${year}`;
			} else {
				currentDate = `${month}-${day}-${year}`;
			}
			setDate(currentDate);
		}
		getCurrentDate();
	}, []);
	useEffect(() => {
		const fetchJournals = async () => {
			try {
				const response = await axios.get(`/api_v1/journal/`);
				const data = await response.data;
				setPreviousEntries(data);
				console.log(previousEntries);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchJournals();
	}, []);

	const handleInput = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	const createEntry = async (event) => {
		event.preventDefault();
		const response = await axios.post("/api_v1/journal/", formData);
		const data = await response.data;
		setPreviousEntries([...previousEntries, data]);
	};
	if (previousEntries === null) {
		return <div>Loading...</div>;
	}

	const journalHTML = previousEntries.map((entry) => (
		<>
			<article>
				<h5>{entry.created_at.slice(0, 10)}</h5>
				<p>{entry.text}</p>
			</article>
		</>
	));
	return (
		<div className="journal-entry-wrapper">
			<Paper>
				<div className="journal-header-wrapper">
					{/* <header>{date}</header> */}
					<div className="journal-prompt">
						<h4>How do you feel today?</h4>
					</div>
				</div>
				<div className="journal-body-container">
					<Form onSubmit={createEntry}>
						<Form.Label htmlFor=""></Form.Label>
						<Form.Control
							type="text"
							name="text"
							value={formData.text}
							onChange={handleInput}
							placeholder="Hello Future Me..."
						/>
						<Form.Text id="journal-prompt" muted></Form.Text>
						<Button variant="primary" type="submit">
							Submit Entry
						</Button>
					</Form>
				</div>

				{previousEntries && journalHTML}
			</Paper>
		</div>
	);
}
export default JournalEntry;
