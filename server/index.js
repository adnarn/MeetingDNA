const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const draftRoute = require('./routes/meeting')
const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meeting");

const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://meetingdna.vercel.app'],
  credentials: true
}))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

app.use("/api/meetings", draftRoute)
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);


app.get('/', (req, res) => {
  res.send('Server is running')
})



app.listen(5000, () => {
  console.log('Server running on port 5000')
})