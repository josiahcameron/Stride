import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Form } from "react-bootstrap";

function JournalEntry() {
	const [journalEntry, setJournalEntry] = useState("");
	const [date, setDate] = useState(null);

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

	return (
		<div className="journal-entry-wrapper">
			<div className="journal-header-wrapper">
				<header>{date}</header>
				<div className="journal-prompt">
					<p>
						Take a moment and imagine yourself in thirty days. The
						you now is responsible for that future version of you.
						That may sound scary, but it's fine because they aren't
						here just yet. Take a moment and write down a message to
						future you. It can be short or a couple of paragraphs.
						Encourage yourself, share your fears, or tell that
						version of you how proud you are of them. Whatever you
						want to tell them, go ahead. Moving forward, the you now
						will hold future you accountable.
					</p>
				</div>
			</div>
			<div className="journal-body-container">
				<Form.Label htmlFor=""></Form.Label>
				<Form.Control
					type="password"
					id="inputPassword5"
					className="journal-input"
					aria-describedby="passwordHelpBlock"
					placeholder="Hello Future Me..."
				/>
				<Form.Text id="journal-prompt" muted></Form.Text>
			</div>
		</div>
	);
}
export default JournalEntry;
