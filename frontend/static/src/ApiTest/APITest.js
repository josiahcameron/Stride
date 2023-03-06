import axios from "axios";
import { useState, useEffect } from "react";
import nanoid from "nanoid";

function APITest() {
	const [response, setResponse] = useState(null);
	const secretKey = process.env.REACT_APP_API_KEY;

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
			setResponse(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		// Trigger the API Call
		fetchQuotes();
	}, []);

	return (
		<>
			<div>
				{
					// If the response is not null, display the quote.
					response && <span>{response.text}</span>
				}
			</div>
		</>
	);
}

export default APITest;
