require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();

// routes
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const subEventRoutes = require("./routes/subEventRoutes")
const participationRouter = require('./routes/ParticipationRouter');
const payment = require('./routes/paymentRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4500;

connectToDB();
app.use("/api/admin", adminRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/subEvent", subEventRoutes);
app.use("/api/participation", participationRouter);
app.use("/api/payment", payment);

// app.use("/", todosRoutes);

app.listen(PORT , ()=>console.log(`server starting on ${PORT}`))