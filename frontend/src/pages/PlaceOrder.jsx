import React, {useContext, useState} from 'react'
import {Title, CartTotal} from '../components/'
import { FaStripe } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {

  const [method,setMethod] = useState('cod')
  const  [formData, setFormData] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      street : "",
      city : "",
      state : "",
      pincode : "",
      country : "",
      phone : ""
    }
  )
  const {backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext)

  const onChangeHaldnler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setFormData({...formData, [name]: value})

  }

  const initPay = (order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: 'INR',
      name: 'order payment',
      description: 'order payment',
      order_id : order.id,
      receipt : order.receipt,
      handler: async (response) =>{
        try{
          const {data} = await axios.post(backendUrl + 'api/order/verifyRazorPay', response, {headers : {token}})
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        }
        catch(error){
          console.log(error)
          toast.error(error)

        }

      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()



  }

  const onSumbithandler = async(e)=>{
    e.preventDefault()
    try{
      let OrderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product=>product._id === items))
            if(itemInfo)[
              itemInfo.size = item,
              itemInfo.quantity = cartItems[items][item],
              OrderItems.push(itemInfo)
            ]
          }


        }

      }
      let orderData = {
        address : formData,
        items : OrderItems,
        amount : getCartAmount() + delivery_fee,
      }
      switch(method){
        case 'cod':
          const response = await axios.post(backendUrl + 'api/order/place', orderData, {headers : {token}})
          if(response.data.success === true){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message )
          }

        break;

        case 'razorpay':
          const responseRazorpay = 
          await axios.post(backendUrl + 'api/order/razorpay', orderData, {headers : {token}})
          if(responseRazorpay.data.success === true){
            initPay(responseRazorpay.data.order)
          }


        break


        default : 
        break;
      }

    }
    catch(error){
      console.error(error)
      toast.error(error.message)

    }


  }

  const navigate = useNavigate()

  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t' onSubmit={onSumbithandler}>

        {/* left */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className='text-xl sm:text-2xl my-3'>
                <Title text1={'Delivery'} text2={'Information'}></Title>
            </div>
            <div className="flex gap-3 ">
              <input required onChange={onChangeHaldnler} type="text" name='firstName' value={formData.firstName} placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
              <input required type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

            </div>
            <input required type="email" onChange={onChangeHaldnler} name='email' value={formData.email}  placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <input required type="text"  onChange={onChangeHaldnler} name='street' value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <div className="flex gap-3 ">
              <input required type="text"  onChange={onChangeHaldnler} name='city' value={formData.city} placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
              <input required type="text"  onChange={onChangeHaldnler} name='state' value={formData.state} placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

            </div>
            <div className="flex gap-3 ">
              <input required type="text"  onChange={onChangeHaldnler} name='pincode' value={formData.pincode} placeholder='Pin Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
              <input required type="text"  onChange={onChangeHaldnler} name='country' value={formData.country} placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />

            </div>
            <input required type="number"  onChange={onChangeHaldnler} name='phone' value={formData.phone} placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />


      </div>
      {/* right */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
          <CartTotal />
          </div>
          <div className="mt-8">

            <Title text1={'PAYMENT'} text2={'METHOD'}></Title>
          </div>

          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 min-h-3.5 border border-gray-400 rounded-full
                ${method === 'stripe' && 'bg-green-400'}
                `}>
              </p>
              <FaStripe color='#5167FC' size={40}/>
            </div>
            <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 min-h-3.5 border border-gray-400 rounded-full
              ${method === 'razorpay'  && 'bg-green-400'}`


              } >
              </p>
              <SiRazorpay color='#5167FC' size={30}/><span className='flex items-center justify-center text-blue-500 font-semibold'>Razorpay</span>
            </div>
            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 min-h-3.5 border border-gray-400 rounded-full flex gap-3
                  ${method === 'cod'  && 'bg-green-400'}

                `} >
              </p>
              <p className="text-gray-500">
                  CASH ON DELIVERY
              </p>
            </div>



            </div>
            <div className="w-full text-end mt-8">
              <button type='submit' className="px-12 py-2 text-white bg-black  rounded">Place Order</button>
            </div>
            

          </div>

    </form>
  )
}

export default PlaceOrder