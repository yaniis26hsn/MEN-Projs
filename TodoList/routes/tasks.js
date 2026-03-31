import express from 'express';
const router = express.Router() ;
import {getAllTasks , createTask , updateTask , getTask , deleteTask  } from "../controllers/tasks.js"


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').put(updateTask).delete(deleteTask).get(getTask)


export default router ;