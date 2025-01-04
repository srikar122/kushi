import React, { useContext, useEffect, useState } from 'react'
import { Title } from '../components/'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async(req, res) =>{
    try{
      if(token === ''){
        return null
      }
      const response = await axios.post(backendUrl + 'api/order/userOrders',{}, {headers : {token}})
      if(response.data.success){
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod 
            item['date'] = order.date
            allOrdersItem.push(item)
          })

        })
        // console.log(allOrdersItem)
        setOrderData(allOrdersItem.reverse())
      }
      else{
        console.log(response.data.message)
        toast.error(response.data.message)
      }
     

    }
    catch(error){

    }

  }

  useEffect(()=>{
    loadOrderData()

  },[token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}></Title>

      </div>
      <div>
        {
          orderData &&
          orderData.map((item, index) => {
            return (
              <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 " key={index}>
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.image[0]} alt="image" className='w-16 sm:w-20' />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex gap-3 mt-2 text-base text-gray-700">
                      <p>{item.price}</p>
                      <p>Quantity : {item.quantity}</p>
                      <p>size : {item.size}</p>
                    </div>
                    <p>Date :<span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p>Payment : <span className='text-gray-400'>{item.paymentMethod}</span></p>

                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className='flex items-center gap-2'>
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                </div>
              </div>
            )

          })
        }
      </div>

    </div>
  )
}

export default Orders