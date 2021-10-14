const express = require('express')
const app = express()
const epxressLayouts = require('express-ejs-layouts')
const dotenv = require('dotenv')
const indexRouter = require('./routes/routes')
const connectDB = require('./database/connection')

dotenv.config({path:"config.env"})

connectDB()

app.set("view engine",'ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(epxressLayouts)
app.use(express.static('public'))
app.use('/',indexRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})