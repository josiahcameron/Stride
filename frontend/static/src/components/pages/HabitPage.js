import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Habits from "../habits/Habits";
import { AuthContext } from "../context/AuthContext";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";

import { Card, Form, Col, Row, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function dateFormat(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	if (month.length < 1) {
		return `${year}-0${month}-${day}`;
	} else {
		return `${year}-0${month}-${day}`;
	}
}

function HabitPage() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const { user } = useContext(AuthContext);
	const handleError = (err) => {
		console.warn(err);
	};

	const [profile, setProfile] = useState(null);
	const [tier, setTier] = useState(null);
	const [habits, setHabits] = useState(null);
	const [habitCompletion, setHabitCompletion] = useState(false);
	const [quote, setQuote] = useState(null);
	const [progress, setProgress] = useState(0);

	// if (habits){const denominator = habits.length;
	let denominator = 0;
	let maxHabits = denominator;
	let habitCount = 0;

	const secretKey = process.env.REACT_APP_API_KEY;
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
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(`/api_v1/profile/`);
				const data = await response.data[0];
				setProfile(data);
				console.log(profile);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchProfile();
	}, []);
	if (profile === null || quote === null) {
		return <div>Loading...</div>;
	}
	const setDenominator = (tier) => {
		switch (tier) {
			case "first":
				denominator = 4;
				break;
			case "second":
				denominator = 6;
				break;
			case "third":
				denominator = 8;
				break;
			case "fourth":
				denominator = 10;
				break;
			case "fifth":
				denominator = 10;
				break;
			case "master":
				denominator = 15;
				break;
			default:
				console.log("error");
		}
	};
	setDenominator(profile.tier);
	const logUserActivity = async () => {
		const response = await axios.post(`/add-user-record/`, user);
		if (!response.status) {
			throw new Error("Network response was not OK");
		}
		const data = await response.data;
	};
	if (habits) {
		habitCount = habits.length;
	}
	return (
		<div className="habit-page wrapper">
			<div className="page-top">
				<div className="box progress-qotd">
					<section className="progress-QOTD">
						<div className="profile">
							<div className="profile-image">
								<img src={profile.avatar} alt="" />
							</div>
							<div className="profile-info">
								<p>{profile.display_name}</p>
							</div>
						</div>
						<div className="qotd-container">
							<div className="qotd">
								<p className="quote">{quote.text}</p>
								<p className="quote-author">- {quote.author}</p>
							</div>
						</div>
						<div className="progress">
							<CircularProgressbarWithChildren
								value={75}
								strokeWidth={8}
								styles={buildStyles({
									pathColor: "#f00",
									trailColor: "transparent",
								})}
							>
								{/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
								<div style={{ width: "84%" }}>
									<CircularProgressbarWithChildren
										value={70}
										styles={buildStyles({
											trailColor: "transparent",
										})}
									>
										<div style={{ width: "84%" }}>
											<CircularProgressbar
												value={70}
												styles={buildStyles({
													pathColor: "green",
													trailColor: "transparent",
												})}
											/>
										</div>
									</CircularProgressbarWithChildren>
								</div>
							</CircularProgressbarWithChildren>
						</div>
					</section>
				</div>
			</div>
			<div className="habit-type-selection-wrapper">
				<h5>My Steps:</h5>
			</div>
			<div className="habits-wrapper">
				<Habits
					denominator={denominator}
					logUserActivity={logUserActivity}
				/>
			</div>
		</div>
	);
}

export default HabitPage;

{
	/* <section className="habit-type-selection-navbar">
					<ul className="nav nav-pills nav-fill">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="c"
							>
								Daily Strolls
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Weekly Jaunts
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Monthly Treks
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Overview
							</a>
						</li>
					</ul>
				</section> */
}
