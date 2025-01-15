
// placing orders using cod method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'


// gatewy initialize
const currency = 'inr'

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


const placeOrder = async(req,res)=>{
    try{
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "cod",
            payment : false,
            date : Date.now(),

        }
        const newRrder = new orderModel(orderData)
        await newRrder.save()
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success : true, message:"order placed"})


    }
    catch(error){
        console.log(error.message)
        res.json({success : false, message : error.message})

    }

}

// place order using Stripe
const placeOrderStripe = async(req,res)=>{
}

// place order razorPay
const placeOrderRazorPay = async(req,res)=>{
    try{
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "razorpay",
            payment : false,
            date : Date.now(),
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        const options = {
            amount : amount * 100,
            currency : "INR",
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if (error){
                console.log(error)
                res.json({success : false, message : error.message})
            }
            res.json({success : true, order})



        })
    }
    catch(error){
        console.log(error.message)
        res.json({success : false, message : error.message})

    }

}

// verify razor pay
const verifyRazorPay = async(req,res)=>{
    try {
        const {userId, razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status == 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment : true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success : true, message : "Payment Successfull"})

        }
        else{
            res.json({success : false, message : "Payment Failed"})
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message})
        
    }
}


// all orders data for admin panel
const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success : true, orders})
        
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message})
        
    }
}


// user orser data for frontend
const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success : true, orders})


        
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message})
        
    }
}

// update order status
const updateStatus = async(req,res)=>{
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success : true, message : "status updated"})
        
    } catch (error) {
        console.log(error.message)
        res.json({success : false, message : error.message})
        
    }

}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorPay,
    userOrders,
    updateStatus,
    allOrders,
    verifyRazorPay
}