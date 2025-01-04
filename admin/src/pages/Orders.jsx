import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FaBoxOpen } from "react-icons/fa";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (token === "") return null;

    try {
      const response = await axios.post(backendUrl + 'api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        console.log(response.data.orders);
        setOrders(response.data.orders.reverse());
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const statusHandler = async(event, orderId)=>{
    try{
      const response = await axios.post(backendUrl + 'api/order/status', {orderId, status : event.target.value}, { headers:{token}})
      if(response.data.success){
        await fetchOrders()
        toast.success(response.data.message)

      }

    }
    catch(error){
      console.log(error.message);
      toast.error(error.message);

    }
  }


  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="grid gap-6">
        {orders.map((order, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaBoxOpen className="text-blue-500 mr-3 text-xl" />
              <h2 className="text-lg font-semibold">Order #{index + 1}</h2>
            </div>
            <div className="mb-4">
              {order.items.map((item, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {item.name} x {item.quantity} <span>({item.size})</span>
                  {index !== order.items.length - 1 && ','}
                </p>
              ))}
            </div>
            <p className="text-sm font-medium">{order.address.firstName} {order.address.lastName}</p>
            <div className="text-sm text-gray-600">
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.pincode}</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">Phone: {order.address.phone}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <p className="text-sm font-medium">Items: {order.items.length}</p>
              <p className="text-sm font-medium">Method: {order.paymentMethod}</p>
              <p className="text-sm font-medium">Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p className="text-sm font-medium">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-lg font-semibold mt-4">Rs {order.amount}</p>
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className="mt-4 p-3 border border-gray-300 rounded-md w-full bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="order placed">Order Placed</option>
              <option value="packing">Packing</option>
              <option value="shipped">Shipped</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
