const express = require("express");
const session = require("express-session");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");

const { createTables } = require("./config/tables");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Session management
app.use(
	session({
		genid: () => uuid.v4(),
		secret: process.env.AZURE_SQL_SESSION_SECRET, // Use environment variable
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: process.env.AZURE_SQL_NODE_ENV === "production", // Ensure secure in production
			httpOnly: true,
			sameSite: "lax",
		},
	})
);

// Import route modules
const usersRoute = require("./routes/users");
const { sessionsRoute } = require("./routes/sessions");
const { poolConnect, pool } = require("./config/config");

// Use route modules
app.use("/api/users", usersRoute);
app.use("/api/sessions", sessionsRoute);

async function readyDatabase() {
	try {
		console.log("Readying Azure SQL...");
		await poolConnect;
		const request = pool.request();
		const result = await request.query('SELECT 1'); // lightweight query to wake up the database
		console.log('Database is awake!');
	} catch (error) {
		console.log('Database sleeping error: ', error)
	}
}

let boolCreate = false; // variable to conditionally run the createTables function.

if (boolCreate) {
	createTables()
		.then(() => {
			const port = process.env.PORT || 3030;
			app.listen(port, () => {
				console.log(`Listening on port ${port}...`);
			});
		})
		.catch((err) => {
			process.exit(1);
		});
} else {
	const port = process.env.PORT || 3030;
	await readyDatabase();
	app.listen(port, () => {
		console.log(`Listening on port ${port}...`);
	});
}
