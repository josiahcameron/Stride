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

// const options = {
// 	method: "GET",
// 	url: "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote",
// 	params: { token: "ipworld.info" },
// 	headers: {
// 		"X-RapidAPI-Key":
// 			"624f6dea00msh6edd66797935dd3p10571bjsnad7010b1f799",
// 		"X-RapidAPI-Host":
// 			"quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
// 	},
// };

// axios
// 	.request(options)
// 	.then(function (response) {
// 		console.log(response.data);
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});

///////////////////////////

// useEffect(()=> {
//     axios.get(
// 		"https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote"
// 	).then(response => {
//         setData(response.data)
//     }).catch(error => {
//         console.log(error);
//     })
// },[])

///////////////////////////////////

// {
// 	data.map((item) => <div key={nanoid}>{item}</div>);
// }
