const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const draftRoute = require('./routes/meeting')
const approveRoute = require('./routes/approve')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB')
})

app.use("/api/meetings", draftRoute)
app.use("/approve", approveRoute)

app.get('/', (req, res) => {
  res.send('Server is running')
})



app.listen(5000, () => {
  console.log('Server running on port 6000')
})