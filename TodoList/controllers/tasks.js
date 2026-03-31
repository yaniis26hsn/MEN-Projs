import Task from '../models/Task.js';
const getAllTasks = async (req,res) =>{  try{

     const myTasks = await Task.find() ;
    res.status(200).json({myTasks})

    }catch(error){
        res.status(500).json({msg:error})
    }
} 
const createTask = async (req,res)=>{
    try{ // express 5 handles them automatically but anyway 

    const task = new Task(req.body) 
   await task.save() ;
    //const task = await Task.create(req.body)

    res.status(201).json({task})

    }catch(error){
        res.status(500).json({msg:error})
    }
    
   
}
const updateTask = async (req,res)=>{
  //  const theTask = await Task.findByIdAndUpdate({_id:req.params.id},req.body)
     const theTask = await Task.findOneAndUpdate({_id:req.params.id},req.body, {
        new:true , runValidators : true 
     })
    if(!theTask) return res.status(404).json({msg :"error : element was not found"})
    res.status(200).json(theTask) ;
}   
const getTask = async (req,res)=>{
    const thatTask = await Task.findById(req.params.id) 
    if(!thatTask) return res.status(404).json({msg :"error : element was not found"})
    res.status(200).json(thatTask) 
}
const deleteTask = async (req,res)=>{
    const thatTask = await Task.findByIdAndDelete(req.params.id) 
    if(!thatTask) return res.status(404).json({msg :"error : element was not found"})
    res.status(200).json(thatTask) 
}


 
export { getAllTasks, createTask, updateTask, getTask, deleteTask };
