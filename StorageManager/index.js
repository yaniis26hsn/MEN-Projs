import dotenv from 'dotenv' 
import express from 'express';
import connectDB from './db/connect.js';

dotenv.config()

const app = express() 

// middleware 
app.use(express.json())

app.get('/' , (req,res)=>{res.send("hala")})

const port = process.env.PORT || 4000 ;
const start = async ()=>{

try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port , () =>{ console.log(`we are listening at the port : ${port}`) }) ;
} catch(err){
 console.log(err)
}


}
start()
