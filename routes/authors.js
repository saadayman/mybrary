const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const  Author = require('../models/author')
/*
 @description 
Get home route 

*/
//to get all the authors page

router.get("/", async (req, res) => {
    let searchOptions = {}
    if(req.query.name != null && req.query.name !=''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
       
    const authors = await Author.find(searchOptions)
      res.render("authors/index",{
    authors, 
    searchOptions:req.query
});
    }
    catch{
       res.render("layout", {
         author: author,
         errorMessage: "Error fetching the authors",
       });
    }

});
// Create new author page
router.get('/new',(req,res)=>{
    res.render("authors/new",{author : new Author() })
})
//to create a new author 
router.post('/', async (req,res)=>{
const author = new Author({
    name:req.body.name
})
try{
  const newAuthor = await author.save();
  // res.redirect(`authors/${newAuthor.id}`)
  res.redirect(`authors`);
}catch{
    res.render('authors/new',{
         author:author,
           errorMessage :'ERORR CREATING AUTHOR'
        
        })
}


})

module.exports = router;
