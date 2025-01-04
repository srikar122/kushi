import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'
const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandle = async(e)=>{
        try{
            e.preventDefault()
            const response = await axios.post(backendUrl+'api/user/adminlogin',
                {email, password}
            )
            if(response.data.success){
                setToken(response.data.token)
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)

            }

        }
        catch(error){
            console.log(error.message)
            toast.error(error.message)
        }


    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>

    <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form action="" onSubmit={onSubmitHandle}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mt-2'>Email Address</p>
                <input type="email" placeholder='enter your email address' required className='rounded-md w-full border border-gray-300 outline-none px-3 py-2' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mt-2'>Password</p>
                <input type="password" placeholder='enter your password' required className='rounded-md w-full border border-gray-300 outline-none px-3 py-2'  onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button className='text-white bg-black px-6 py-2 w-full rounded-lg'>Login</button>

        </form>
    </div>
    </div>
  )
}

export default Login