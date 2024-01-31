require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");

// routes
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const subEventRoutes = require("./routes/subEventRoutes")
const participationRouter = require('./routes/ParticipationRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4500;

connectToDB();
app.use("/admin", adminRoutes);
app.use("/event", eventRoutes);
app.use("/subEvent", subEventRoutes);
app.use("/participation", participationRouter);

// app.use("/", todosRoutes);

app.listen(PORT , ()=>console.log(`server starting on ${PORT}`))