require('dotenv').config()

const PORT = process.env.PORT || 5001
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const vehiclesRouter = require('./routes/Vehicles')
app.use('/vehicles', vehiclesRouter)

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))