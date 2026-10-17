import express from 'express'

const router = express.Router()

import {
getAllProducts
} from "../controllers/products.js"

router.get('/',getAllProducts) ;


export default router ;