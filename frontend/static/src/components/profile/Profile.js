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

	let denominator,
		daysToComplete = 0;

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
				<Card className="user-QOTD">
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
							</div>
						</div>
						<div className="qotd-container">
							<div className="qotd fade-in-text">
								<p className="quote">{quote.text}</p>
								<p className="quote-author">- {quote.author}</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
			<Card style={{}}>
				<Card.Body>
					<Card.Title>Progress</Card.Title>
					<Card.Text>
						At your current Tier, you can add up to {denominator}{" "}
						steps a day.
					</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroup.Item>
						Your current streak is {profile.streak} current days.
					</ListGroup.Item>
					<ListGroup.Item>
						You've completed {profile.progress} days.
					</ListGroup.Item>
					<ListGroup.Item>
						Days remaining until next Tier:{" "}
						{daysToComplete - profile.progress}
					</ListGroup.Item>
				</ListGroup>
			</Card>
		</>
	);
}

export default Profile;
