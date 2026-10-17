import dotenv from 'dotenv' 
import express from 'express';
// import connectDB from './db/connect.js';
import productsRouter from './routes/products.js';
// import express-asyn-error 
dotenv.config()

const app = express() 

// middleware 
app.use(express.json())

// routes
app.get('/' , (req,res)=>{res.send("<h1> hala </h1>")})
app.use('/api/v1',productsRouter)

const port = process.env.PORT || 4000 ;
const start = async ()=>{

try{
    // await connectDB(process.env.MONGO_URI)
    app.listen(port , () =>{ console.log(`we are listening at the port : ${port}`) }) ;
} catch(err){
 console.log(err)
}


}
start()
