import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState("");

	async function login(event) {
		event.preventDefault();
		
		const response = await fetch("http://heuer.ovh:8080/whatsflat/users/try_login", {
			method: "POST",
			body: JSON.stringify({
				"username": username,
				"password": password
			}),
			headers: {
				"Content-Type": "application/json",
			}
		});

		if (!response.ok) {
			alert("Login failed due to unknown reasons");
		} else {
			const result = Boolean.parse(response.body.toString());
			alert("Login successful" ? result : "Login failed");
		}
	}

	return (
		<main>
			<Head>
				<title>WhatsFlat Home</title>
				<meta name="description" content="WhatsFlat Webapp" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="centered-box">
				<h1>Welcome to WhatsFlat 📫</h1>
				<form>
					<div className="input-with-label">
						<label>Username:</label>
						<input
							type="text"
							onChange={(element) => setUsername(element.value)}
						/>
					</div>

					<div className="input-with-label">
						<label>Password:</label>
						<input
							type="text"
							onChange={(element) => setPassword(element.value)}
						/>
					</div>

					<button className="login-button" onClick={(event) => login(event)}>
						Login
					</button>
				</form>
			</div>
		</main>
	);
}
