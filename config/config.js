const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
	user: process.env.AZURE_SQL_USERNAME,
	password: process.env.AZURE_SQL_PASSWORD,
	server: process.env.AZURE_SQL_SERVER,
	database: process.env.AZURE_SQL_DATABASE,
	options: {
		encrypt: true, // Set to true if connecting to Azure SQL Database
		trustServerCertificate: false, // Optional: for local dev
	},
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Handling connection errors at the top level once
poolConnect
	.then(() => {
		console.log("Connected to the database.");
	})
	.catch((err) => {
		console.error("Database Connection Failed:", err);
	});;

module.exports = { sql, pool, poolConnect };
