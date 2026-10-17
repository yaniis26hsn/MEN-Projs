import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "name is required"] 
    } ,
    price : {
        type : Number ,
        required : [true , "price is required"] 
    }
    ,
    featured :{
        type : Boolean ,
        default : false 
    }
    ,
    rating : {
        type : Number ,
        default : 3.0 
    } ,
    createdAt : {
        type : Date ,
        default : Date.now()
    }
    ,
    company : {
        type : String ,
        enum:['ikea','caressa','liddy','marcos'] ,
    }

});
export default mongoose.model("Procuct",productSchema) ;