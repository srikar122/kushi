import React from 'react'
import {NavLink} from 'react-router-dom'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";



const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">

    <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
        <IoIosAddCircleOutline className='' size={30}/>
        <p className='hidden md:block'>add items</p>
        </NavLink>
        <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
        <CiViewList size={30} />
        <p className='hidden md:block'>List items</p>
        </NavLink>
        <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-lg'>
        <IoBagHandleOutline size={30}/>
        <p className='hidden md:block'>Orders</p>
        </NavLink>
    </div>
    </div>
  )
}

export default Sidebar