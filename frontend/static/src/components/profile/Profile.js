import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import {
	Button,
	Form,
	Card,
	Col,
	Row,
	Container,
	ListGroup,
	Offcanvas,
	Collapse,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import Tooltip from "@mui/material/Tooltip";
import { AiFillEdit } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { TfiWrite } from "react-icons/tfi";

const INITIAL_FORM_DATA = {
	text: "",
};

function Profile() {
	const secretKey = process.env.REACT_APP_API_KEY;
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const handleError = (err) => {
		console.warn(err);
	};
	const [show, setShow] = useState(true);
	const [quote, setQuote] = useState(null);
	const [date, setDate] = useState(null);
	let denominator,
		daysToComplete = 0;
	const [profile, setProfile] = useState(null);
	const [previousEntries, setPreviousEntries] = useState(null);

	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [open, setOpen] = useState(false);

	const [entry, setEntry] = useState([]);
	const [editMode, setEditMode] = useState(true);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	// useEffect(() => {
	// 	async function getCurrentDate() {
	// 		let currentDate = new Date();
	// 		const day = currentDate.getDate();
	// 		const month = currentDate.getMonth() + 1;
	// 		const year = currentDate.getFullYear();

	// 		if (month.length > 1 && day.length > 1) {
	// 			currentDate = `${month}-${day}-${year}`;
	// 		} else {
	// 			currentDate = `${month}-${day}-${year}`;
	// 		}
	// 		setDate(currentDate);
	// 	}
	// 	getCurrentDate();
	// }, []);

	useEffect(() => {
		const fetchQuotes = async () => {
			try {
				const res = await axios.get(
					"https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote",
					{
						headers: {
							"X-RapidAPI-Key": secretKey,
							"X-RapidAPI-Host":
								"quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
						},
						params: { token: "ipworld.info" },
					}
				);
				setQuote(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchQuotes();
	}, [secretKey]);

	// Fetch previous entries
	useEffect(() => {
		const fetchJournals = async () => {
			const response = await axios.get(`/api_v1/journal/`);
			if (!response.status) {
				throw new Error("Network response was not OK");
			}
			const data = await response.data;
			setPreviousEntries(data);
		};
		// Trigger the API Call
		fetchJournals();
	}, []);
	if (previousEntries === null) {
		return <div>Loading...</div>;
	}

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

	const chooseEntry = (entry) => {
		console.log(entry);
		setEntry(entry);
	};

	const journalHTML = entry?.map((entry) => (
		<div key={entry.id}>
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
		</div>
	));

	const journalList = previousEntries.map((entry) => (
		<Button
			key={entry.id}
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

	if (profile === null) {
		return <div>Fetching Profile...</div>;
	}
	if (quote === null) {
		return <div>Fetching Inspiration...</div>;
	}
	const setDenominator = (tier) => {
		switch (tier) {
			case "first":
				denominator = 4;
				daysToComplete = 7;
				break;
			case "second":
				denominator = 6;
				daysToComplete = 14;
				break;
			case "third":
				denominator = 8;
				daysToComplete = 21;
				break;
			case "fourth":
				denominator = 10;
				daysToComplete = 28;
				break;
			case "master":
				denominator = 15;
				daysToComplete = "Max";
				break;
			default:
				console.log("error");
		}
	};
	setDenominator(profile.tier);

	return (
		<>
			<Offcanvas
				id="profile-container"
				show={show}
				scroll={true}
				backdrop={false}
			>
				<div className="left-content">
					<div className="user-wrapper">
						<div className="user-image">
							{/* <Tooltip className="edit-icon" title="edit">
						<AiFillEdit />
					</Tooltip> */}
							<img src={profile.avatar} alt="" />
						</div>

						<div className="user-meta-wrapper">
							<div className="username fade-in-text">
								<h4>
									<b>{profile.display_name}</b>
								</h4>
							</div>
							<div className="user-info-wrapper fade-in-text">
								{/* <div className="streak">
								<p>Streak: {profile.streak}</p>
							</div> */}
								<div className="tier fade-in-text">
									<p>Tier: {profile.tier}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="progress-section">
						<div className="progress-brief">
							<h2>Progress</h2>
						</div>

						<div className="next-level">
							<p>
								Days to complete to unlock the next Tier:{" "}
								{daysToComplete - profile.progress}
							</p>
						</div>
						<ul className="list-group-flush progress-brief-info">
							<li>You've completed {profile.progress} days.</li>
							<li>
								Your current streak is {profile.streak} days.
							</li>

							<li>
								At your current Tier, you can add up to{" "}
								{denominator} steps a day.
							</li>
						</ul>
					</div>
				</div>
			</Offcanvas>
			<div className="right-container">
				<div className="qotd-container">
					<div className="qotd fade-in-text">
						<p className="quote">{quote.text}</p>
						<p className="quote-author">- {quote.author}</p>
					</div>
				</div>

				<div className="journal-container">
					<h2>Journal</h2>
					<Button
						onClick={() =>
							!editMode ? setEditMode(true) : setEditMode(false)
						}
						className="add-entry"
					>
						<TfiWrite /> {`${!editMode ? "Add entry" : "cancel"}`}
					</Button>
					<div className="journal-body-container">
						<Form
							className={`${editMode ? "show" : "hide"}`}
							onSubmit={() => {
								createEntry();
							}}
						>
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
							<Button
								variant="danger"
								onClick={() => setEditMode(false)}
							>
								Cancel
							</Button>
						</Form>
					</div>
					{journalList}
				</div>
			</div>

			{/* <div className="user-QOTD-wrapper">
				
					<div className="user-QOTD-container">
						<div className="user-wrapper">
							

							
						</div>

						
					</div>
				</div>
			</div> */}
		</>
	);
}

export default Profile;
