// const mongoose = require("mongoose") ;
// const Schema = mongoose.Schema ;

// const articleSchema = new Schema({
// title : String  ,
// year : Number ,
// body : String 
// }) ;

// const Article = mongoose.model("Article" , articleSchema ) ;
// export default mongoose.model("Article", articleSchema);
// // module.exports = Article ;

import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  year: Number,
  body: String
});

export default mongoose.model("Article", articleSchema);