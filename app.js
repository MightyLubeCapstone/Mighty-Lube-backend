const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { dbConnect } = require("./config/config");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import route modules
const usersRoute = require("./routes/users");
const fglmRoute = require("./routes/fglm");
const fgcoRoute = require("./routes/fgco");
const { sessionsRoute } = require("./routes/sessions");
const cartRoute = require("./routes/cart");
const draftsRoute = require("./routes/drafts");
const emailRoute = require("./routes/email");
const configurationsRoute = require("./routes/configurations");

// Use route modules
app.use("/api/users", usersRoute);
app.use("/api/sessions", sessionsRoute);
app.use("/api/fglm", fglmRoute);
app.use("/api/fgco", fgcoRoute);
app.use("/api/orders", ordersRoute);


const port = process.env.PORT || 3030;
app.listen(port, () => {
	dbConnect();
	console.log(`Listening on port ${port}...`);
});