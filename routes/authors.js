const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const  Author = require('../models/author')
const Books  = require('../models/book')
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
       
    const authors = await Author.find(searchOptions)//find({name : name  ?  get it  : get everything })
 
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
  res.redirect(`authors/${newAuthor.id}`)
  
}catch{
  
    res.render('authors/new',{
         author:author,
         errorMessage :'ERORR CREATING AUTHOR'
        
        })
}


})

router.get('/:id', async (req,res)=>{
try{
const author = await Author.findById(req.params.id) 
const books = await Books.find({author: author.id}).limit(6).exec()
res.render('authors/show',{
  author: author, 
  booksByAuthor : books
})

}catch{
res.redirect('/')
}
})
router.get('/:id/edit', async (req,res)=>{
  try{
    let author = await Author.findById(req.params.id)
       res.render("authors/edit", {
      author
})
  }catch{
    res.redirect('/authors')
  }
})

router.put('/:id', async (req,res)=>{
let author
try {
   author  =  await Author.findById(req.params.id)
   author.name = req.body.name
   await author.save()
      // author = await Author.findByIdAndUpdate(req.params.id, req.body.name);

  // res.redirect(`authors/${newAuthor.id}`)
  res.redirect(`/authors/${author.id}`);
} catch {
  if(author==null){
    res.redirect('/')
  }else{
  res.render("authors/edit", {
    author: author,
    errorMessage: "ERORR updating AUTHOR",
  });
  }

}

})
router.delete('/:id', async (req,res)=>{
let author
try {
   author  =  await Author.findById(req.params.id)

   await author.remove()
      // author = await Author.findByIdAndUpdate(req.params.id, req.body.name);

  // res.redirect(`authors/${newAuthor.id}`)
  res.redirect(`/authors`);
} catch {
  if(author==null){
    res.redirect('/')
  }else{
 res.redirect(`/authors/${author.id}`)
  }

}
})
module.exports = router;
