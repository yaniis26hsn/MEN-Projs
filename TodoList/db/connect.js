import mongoose from "mongoose";


// mongoose.connect(connectionString).then(()=>{
//     console.log("the db was successfully connected")
// }).catch((err)=>{
//     console.log(`error while connecting to the db :${err}`)
// })
const connectDB = (url) => {
  return mongoose.connect(url)
}

export default connectDB