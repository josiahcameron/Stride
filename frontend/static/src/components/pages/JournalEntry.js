import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Form, Card, Button } from "react-bootstrap";

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
				<h2>{entry.created_at}</h2>
				<p>{entry.text}</p>
			</article>
		</>
	));
	return (
		<div className="journal-entry-wrapper">
			<div className="journal-header-wrapper">
				<header>{date}</header>
				<div className="journal-sprompt">
					<p>
						Take a moment and write to your future self. It can be a
						few words or a few paragraphs. Encourage yourself, share
						your fears, or tell that version of you how proud you
						are of them. Whatever you want to tell them, go ahead.
						The 'you' now will hold future 'you' accountable.
					</p>
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
		</div>
	);
}
export default JournalEntry;
