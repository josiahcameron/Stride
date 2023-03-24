import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
	Form,
	Card,
	Button,
	Collapse,
	Offcanvas,
	ListGroup,
} from "react-bootstrap";
import { Paper } from "@mui/material";

import { IoIosArrowForward } from "react-icons/io";

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
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [entry, setEntry] = useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	const chooseEntry = (entry) => {
		setEntry(entry.id);
	};

	const journalHTML = previousEntries.map((entry) => (
		<>
			<article>
				<Button
					onClick={() => setOpen(!open)}
					aria-controls="example-collapse-text"
					aria-expanded={open}
				>
					{entry.created_at.slice(0, 10)}
				</Button>
				<Collapse in={open}>
					<div id="example-collapse-text">{entry.text}</div>
				</Collapse>
			</article>
		</>
	));
	const journalList = previousEntries.map((entry) => (
		<Button
			className="entry-date"
			variant="light"
			action
			onClick={() => chooseEntry(entry)}
		>
			<div className="entry-container">
				<p>{entry.created_at.slice(0, 10)}</p>
				<IoIosArrowForward className="arrow" />
			</div>
		</Button>
	));
	return (
		<div className="journal-wrapper">
			<div className="journal-header-wrapper">
				{/* <header>{date}</header> */}
				<div className="journal-prompt">
					<h4>How do you feel today?</h4>
				</div>
			</div>
			<Button variant="primary" onClick={handleShow}>
				Launch
			</Button>
			<Offcanvas
				show={show}
				onHide={handleClose}
				className="entry-list-canvas"
			>
				<Offcanvas.Header className="entries-title" closeButton>
					<Offcanvas.Title>
						<h3>Previous Entries</h3>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ListGroup variant="flush" defaultActiveKey="#link1">
						{journalList}
					</ListGroup>
				</Offcanvas.Body>
			</Offcanvas>
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
