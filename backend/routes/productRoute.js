import express from 'express'
import {addProduct,productList,removeProduct,singleProduct, removeAll} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'


const productRouter = express.Router()

productRouter.post('/add',adminAuth,addProduct)
productRouter.get('/list', productList)
productRouter.delete('/remove/:id',adminAuth, removeProduct)
productRouter.get('/single/:id', singleProduct)
productRouter.delete('/removeAll',removeAll)

export default productRouter