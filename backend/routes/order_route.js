import express from 'express'
import {placeOrder,placeOrderRazorPay,placeOrderStripe,updateStatus,userOrders,allOrders,verifyRazorPay} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorPay)
orderRouter.post('/stripe',authUser,placeOrderStripe)

// user features
orderRouter.post('/userOrders',authUser,userOrders)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorPay)

export default orderRouter



