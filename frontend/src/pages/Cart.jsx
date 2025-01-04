import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title, CartTotal } from '../components/index'
import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { products, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()


  useEffect(() => {

    if(products.length > 0){

      
      const tempData = []
      for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
            
          })
          
        }
        
      }
    }
    setCartData(tempData)
  }

  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'}>
        </Title>
      </div>
      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find(product => product._id === item._id)
            return (
              <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_.5fr_.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4" key={index}>
                <div className="flex items-center gap-6">
                  <img src={productData.image[0]} alt={productData.name} className=" w-16 sm:w-20"></img>
                  <div className="">
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>${productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50" >{item.size}</p>
                    </div>

                  </div>

                </div>

                <input type="number" min={1} defaultValue={item.quantity} className='border border-gray-500 max-w-20 px-1 sm:px-2 py-1' onClick={(e) => e.target.value === '0' || e.target.value === '' ? null : updateQuantity(productData._id, item.size, Number(e.target.value))} />
                <FaTrash className='mr-4 cursor-pointer' onClick={(e) => updateQuantity(productData._id, item.size, 0)}></FaTrash>


              </div>
            )


          }


          )

        }
      </div>


      <div className='flex justify-end my-20'>
        <div className="w-full sm:w-[450px]">
          <CartTotal></CartTotal>

          <div className="w-full text-end mt-8">
                <button className='bg-black text-white px-16 py-3 text-sm' onClick={()=> navigate('/place-order')}>Proceed To Checkout</button>

            </div>


        </div>

      </div>
    </div>
  )
}

export default Cart