const { render } = require("ejs")
const express= require("express")
const router = express.Router()


/*
 @description 
Get home route 

*/

router.get('/',(req,res)=>{
     res.render('index')
   
})

module.exports = router