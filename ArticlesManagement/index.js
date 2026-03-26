
import express from "express";
import mongoose from "mongoose";
import path from "path";
import Article from "./models/Article.js";
import { fileURLToPath } from "url";
   const __dirname = path.dirname(fileURLToPath(import.meta.url));

// in the most of this cases , i didnt need to render in the server side 
// cz i a real project i would just need to send a json where we can extract content and 
// render it there 
// but i did that cz i wanned to keep it a full server side project 

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.set("view engine", "ejs");

// mongo
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
connectDB();

// routes
app.get("/hello", (req, res) => {
  res.send("hello man , this is my first backend project ");
});

// app.get("/getHTML", (req, res) => {
//   res.sendFile(
//     path.join(process.cwd(), "views", "numbers.html")
//   );
// });

app.post("/article", async (req, res) => {
  const newArt = new Article(req.body);
  await newArt.save();
  res.json(newArt);
});
app.get("/articles" , async (req , res)=>{
 const articles = await Article.find() ;
  res.send(articles) ;
})
app.get("/article/:id" , async (req , res)=>{
  
  const theId = req.params.id ;
  const theArticle = await Article.findById(theId) ;
  res.send(theArticle) ;
})

app.delete("/article/:id" , async (req , res)=>{
  
  const theId = req.params.id ;
  const theArticle = await Article.findById(theId) ;
  let year = theArticle.year ;
  await Article.findByIdAndDelete(theId) ;
  res.send("successfuly deleted and the article was in "+ String(year)  ) ;
}) ;

app.delete("/deleteOlderThan/:year", async (req , res)=>{
  let theYear = req.params.year ;
   // we could do :  let the deletedArticles = await Article.find({year: {$lt: Number(theYear)}}) ;
   // and then we delete them one by one using the id in the json named deletedArticles . but since we have deleteMany() i will just do :
   await Article.deleteMany({year : {$lt : Number(theYear)}}) ;

   
  res.send("successfuly deleted and that was from the year "+ String(theYear)  ) ;
 
}) ;
app.delete("/deleteEmptyOnes", async (req , res)=>{
 
   await Article.deleteMany({$or: [{body : ""} , {title : ""}]}) ;

  res.send("successfuly deleted the empty ones " ) ;
 
}) ;

app.put("/article/:id" , async (req,res)=>{
  let theId = req.params.id ;
  let updatedContent = req.body
  await Article.updateOne({"_id":theId} , updatedContent) ;
  res.send("the post was successfuly updated") ;

})

app.get("/sortedByYear", async (req , res)=>{
   const articles = await Article.find().sort({year:-1}) ;
  
  res.render("MaWebSite.ejs" , {Articles : articles}) ;
 
}) ;

app.get("/yearless", async (req , res)=>{
   const articles = await Article.find({} ,{body:true , title:true , _id : false}) ;

  res.render("yearless.ejs" , {Articles : articles})
 
}) ;

app.get("/sortedByAddingTime", async (req , res)=>{
   const articles = await Article.find() ;

  res.render("MaWebSite.ejs" , {Articles : articles})
 
}) ;
app.get("/getNewerThan/:year", async (req , res)=>{
  let theYear = req.params.year ;
   const articles = await Article.find({year: {$gt: Number(theYear)}}) ;

  res.render("MaWebSite.ejs" , {Articles : articles})
 
}) ;

app.get("/between/:year1/:year2", async (req , res)=>{
  let theSmallYear = Number(req.params.year1) > Number(req.params.year2) ? Number(req.params.year2) : Number(req.params.year1) ;
  let theOtherYear = Number(req.params.year1) < Number(req.params.year2) ? Number(req.params.year2) : Number(req.params.year1) ;
  const articles = await Article.find({year: {$lte: Number(theOtherYear) , $gte: Number(theSmallYear)}  }) ;
// i needed to add 'e' to gte and lte to deal with the case where the client wanted an exact year articles so 
// both years of the  are the equal 
  res.render("MaWebSite.ejs" , {Articles : articles})
  
}) ;

app.get("/getByYears", async (req , res)=>{
  // here you should send an array of defined years 
  let theYears = req.body.years ;
   const articles = await Article.find({year: {$in: theYears }}) ;

  res.render("MaWebSite.ejs" , {Articles : articles})
  
}) ;
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong: " + err.message);
});
//  i needed that so that express 5 will handle errors automatically 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

