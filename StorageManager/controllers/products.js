import { name } from "ejs";
import Product from "../models/products.js";

export const getAllProducts = async (req,res)=>{
    const {featured , company} = req.query ;
    const queryObject = {}
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false ;
    }
    if(company){
        queryObject.company = company ;
    }
    if(name){
            queryObject.company = company ;
    }
    const prods = await Product.find(queryObject) ;
    res.status(200).json({prods ,nbHits:prods.length} ) ;
}