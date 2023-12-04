import { useEffect } from 'react';	
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Login() {
	const [ _cookies, setCookie ] = useCookies(['userData']);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const ticket = urlParams.get('ticket');

		if (ticket) {
			axios.post("/api/login", { ticket }).then((res) => {
				setCookie('userData', JSON.stringify(res.data), {
					maxAge: 60 * 60 * 24 * 30
				})

				window.location.replace("/app");
			}).catch((err) => {
				let errorText = err.response?.data || "try+logging+in+again"
				window.location.replace(`/?error=${errorText}`)
			});
		} else {
			window.location.href = "https://login.gatech.edu/cas/login?service=http://localhost:3000/login";
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			logging in ...
		</div>
	)
}