const express = require('express')
const app = express()
const epxressLayouts = require('express-ejs-layouts')
const dotenv = require('dotenv')
const indexRouter = require('./routes/routes')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
// const bodyparser = require('body-parser')
const methodOverride = require('method-override')
const connectDB = require('./database/connection')

dotenv.config({path:"config.env"})

connectDB()
app.use(express.json());
app.use(express.urlencoded({ limit:'10mb', extended: true }));
app.set("view engine",'ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(epxressLayouts)
app.use('/',express.static('public'))
app.use(methodOverride('_method'))
app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use("/books", bookRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})