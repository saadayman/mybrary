const mognoose  = require('mongoose')

let authorSchema =  new mognoose.Schema({
    name:{
        type:String,
        required:true,
    }
})

module.exports = mognoose.model("Author", authorSchema);