const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const userRoutes=require('./routes/userRoutes.js')

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://127.0.0.1:5173&#39', 'http://localhost:5173&#39' ]
}))

app.use('/api/users', userRoutes)

module.exports = app