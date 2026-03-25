const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const userRoutes=require('./routes/userRoutes')
const flightRoutes = require('./routes/flightRoutes')
const ticketOrdersRoutes = require('./routes/ticketOrdersRoutes')
const airlinesRoutes = require('./routes/airlinesRoutes')
const hotelsRoutes = require('./routes/hotelsRoutes')
const citiesRoutes = require('./routes/citiesRoutes')
const attractionsRoutes = require('./routes/attractionsRoutes')

const hotelOrdersRoutes = require('./routes/hotelOrdersRoutes')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173' ],
    credentials: true
}))

app.use('/api/users', userRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/ticketorders', ticketOrdersRoutes)
app.use('/api/airlines' , airlinesRoutes)
app.use('/api/cities', citiesRoutes)
app.use('/api/attractions', attractionsRoutes)
app.use('/api/hotelorders', hotelOrdersRoutes)
app.use('/api/hotels', hotelsRoutes)

module.exports = app