
import userModel from "../models/UserModel.js"

//  add to cart

const addToCart  = async(req,res)=>{
    try{
        const {userId, itemId, size} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success : true, message : "added to cart"})

    }

    catch(error){
        console.log(error)
        res.json({success : false, message : error.message})


    }

}




// update cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success : true, message : "cart updated"})
    }
    catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})

    }
}



// get user cart data
const getUserCart  = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData
        res.json({success : true, cartData : cartData})
    }
    catch(error){
        console.log(error)
        res.json({success : false, message : error.message})

    }
}
    
export {
    addToCart,
    updateCart,
    getUserCart
}