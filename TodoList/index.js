import express from 'express'
import tasks from './routes/tasks.js'
import dotenv from 'dotenv'
import connectDB from './db/connect.js';

dotenv.config()

const app = express() 
// middleware
app.use(express.json()) ;
app.use(express.static('./public'))


//routes 
// app.use(tasks)
app.use('/api/v1/tasks',tasks)

app.get('/hala' , (req,res)=>{
    res.send("sahit imala ayamdakliw okstwilghara , an3di kan imala molac aneness dayi nigh amk") ;
})

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