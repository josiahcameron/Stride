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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

function Profile() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.get["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.delete["X-CSRFToken"] = csrftoken;
	axios.defaults.headers.patch["X-CSRFToken"] = csrftoken;
	const handleError = (err) => {
		console.warn(err);
	};
	const { profile } = useContext(AuthContext);
	const [quote, setQuote] = useState(null);
	const secretKey = process.env.REACT_APP_API_KEY;
	const [date, setDate] = useState(null);
	let denominator,
		daysToComplete = 0;

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
			<div className="user-QOTD-wrapper">
				<div className="user-QOTD">
					<div className="user-QOTD-container">
						<div className="user-wrapper">
							<div className="user-image">
								<img src={profile.avatar} alt="" />
							</div>
							<div className="user-meta-wrapper">
								<div className="username fade-in-text">
									<h4>
										<b>{profile.display_name}</b>
									</h4>
								</div>
								<div className="user-info-wrapper fade-in-text">
									<div className="streak">
										<p>Streak: {profile.streak}</p>
									</div>
									<div className="tier fade-in-text">
										<p>Tier: {profile.tier}</p>
									</div>
								</div>
								<div className="next-level">
									{" "}
									<p>
										Days to complete to unlock the next
										Tier:{" "}
										{daysToComplete - profile.progress}
									</p>
								</div>
							</div>
						</div>

						<div className="progress-section">
							<div className="progress-brief">
								<h2>Progress</h2>
							</div>
							<ul className="list-group-flush progress-brief-info">
								<li>
									You've completed {profile.progress} days.
								</li>
								<li>
									Your current streak is {profile.streak}{" "}
									days.
								</li>

								<li>
									At your current Tier, you can add up to{" "}
									{denominator} steps a day.
								</li>
							</ul>
						</div>

						<div className="qotd-container">
							<div className="qotd fade-in-text">
								<p className="quote">{quote.text}</p>
								<p className="quote-author">- {quote.author}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Profile;
