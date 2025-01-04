import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <h2 className='font-bold text-3xl text-gray-900'>KUSHI(Amdin)</h2>
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-lg' onClick={()=>setToken('')}>Logout</button>

    </div>
  )
}

export default Navbar