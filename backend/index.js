require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { MongoClient } = require('mongodb');

// routes
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const subEventRoutes = require("./routes/subEventRoutes")
const participationRouter = require('./routes/ParticipationRouter');
const payment = require('./routes/paymentRouter');
const winner = require('./routes/winnerRouter');

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
app.use("/api/winner", winner);


//get all allow student
app.get('/api/allowStudentList', async(req , res)=>{
    try{

        const client = new MongoClient(process.env.MONGO_URL);
        await client.connect();
        const db = client.db('event_management_system');
    const collection = db.collection('allowStudents');
    const cursor = collection.find({});
    const results = await cursor.toArray();

    res.send({success : true , data : results});

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
})

// app.use("/", todosRoutes);

app.listen(PORT , ()=>console.log(`server starting on ${PORT}`))