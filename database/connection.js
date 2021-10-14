const mongoose = require("mongoose");

let connectDB = async ()=>{
    try{
        let con = await mongoose.connect(process.env.URI,{
           useNewUrlParser:true,

        })
    }
  catch{
      console.log('dATA BASE WAS NOT CONNECTED')
  }
}
const db = mongoose.connection
db.once('open',()=>{console.log('Conncted')})
module.exports= connectDB
