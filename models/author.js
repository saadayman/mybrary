const mognoose  = require('mongoose')
const Book = require('./book.js')
let authorSchema =  new mognoose.Schema({
    name:{
        type:String,
        required:true,
    }
})
authorSchema.pre('remove',function(next){
Book.find({author: this.id},(err,books)=>{
    if(err)  {
        next(err)
    }else if(books.length >  0 ){
        next(new Error('This author has books still'))
    }else{
        next()
    }
})
})
module.exports = mognoose.model("Author", authorSchema);