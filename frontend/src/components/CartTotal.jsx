import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Title} from './'

const CartTotal = () => {

    
    const {getCartAmount, delivery_fee, cartItems} = useContext(ShopContext)
    
    // useEffect(()=>{
    //     getCartAmount()
    // },[cartItems])

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2 = {'TOTALS'}/>

        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p className="">Cart Total</p>
                <p className="">{getCartAmount()}.00</p>

            </div>
            <hr />
            <div className="flex justify-between">
                <p className="">Delivery Fee</p>
                <p className="">{delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p className="">Total</p>
                <p className="">{getCartAmount() + delivery_fee}.00</p>
            </div>

        </div>
    </div>
  )
}

export default CartTotal