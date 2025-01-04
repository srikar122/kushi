import React,{useContext} from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { FaShoppingCart } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import {ShopContext} from '../context/ShopContext'


const Nav = () => {

  const [visible, setVisible] = useState(false)
  const {showSearch,setShowSearch, token, setToken, setCartItems} = useContext(ShopContext)
  const navigate = useNavigate()

  const logout  = ()=>{
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }





  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <p className='text-gray-900 text-3xl'>Kushi</p>

      <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>
        <li className=''>
          <Link to='/' className='flex flex-col items-center gap-1'>
            <p className=''>Home</p>
            <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
          </Link>
        </li>
        <li className=''>
          <Link to='about' className='flex flex-col items-center gap-1'>
            <p className=''>About</p>
            <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
          </Link>
        </li>
        <li className=''>
          <Link to='contact' className='flex flex-col items-center gap-1'>
            <p className=''>Contact</p>
            <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
          </Link>
        </li>
        <li className=''>
          <Link to='collection' className='flex flex-col items-center gap-1'>
            <p className=''>Collection</p>
            <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
          </Link>
        </li>



      </ul>

      <div className='flex items-center gap-6'>
        <FaSearch className='cursor-pointer' onClick={()=>{
          setShowSearch(!showSearch)
          navigate('/collection')

          }} />
        <div className='group relative'>
            <CgProfile size={20} className='cursor-pointer' onClick={()=> token === '' ? navigate('/login') : null}></CgProfile>
            {
              token != "" &&

          <div className='absolute hidden group-hover:block right-0 pt-4'>
            <div className='felx flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded '>
              <p className='cursor-pointer hover:text-black'>my profile</p>
              <p className='cursor-pointer hover:text-black' onClick={()=>navigate('/orders')}>orders</p>
              <p className='cursor-pointer hover:text-black' onClick={()=>logout()}>logout</p>

            </div>
          </div>
            }
        </div>

        <Link to='cart' className='relative'>
          <FaShoppingCart size={20} className='cursor-pointer' />

        </Link>
        <div>
          {
            !visible
              ?

              <GiHamburgerMenu size={20} className='sm:hidden cursor-pointer'
                onClick={() => { setVisible(!visible) }}
              ></GiHamburgerMenu>
              :
              <IoCloseOutline size={20} className='sm:hidden cursor-pointer'
                onClick={() => { setVisible(!visible) }}
              />

          }

        </div>

      </div>

      {/* sidebar menu */}

      <div className={`${visible ? 'visible' : 'hidden'} absolute top-20 right-5 transition-all bg-slate-200 py-5 px-2.5`}>
        <ul className='flex flex-col gap-2 text-sm text-gray-700'>
          <li className=''>
            <Link to='' className='flex flex-col items-center gap-1'
              onClick={() => { setVisible(!visible) }}
            >
              <p className=''>Home</p>
              <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
            </Link>
          </li>
          <li className=''>
            <Link to='about' className='flex flex-col items-center gap-1'
              onClick={() => { setVisible(!visible) }}
            >
              <p className=''>About</p>
              <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
            </Link>
          </li>          <li className=''>
            <Link to='collection' className='flex flex-col items-center gap-1'
              onClick={() => { setVisible(!visible) }}
            >
              <p className=''>Collection</p>
              <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
            </Link>
          </li>
          <li className=''>
            <Link to='contact' className='flex flex-col items-center gap-1'
              onClick={() => { setVisible(!visible) }}
            >
              <p className=''>Contact</p>
              <hr className='border-none w-2/4 h-[1.5px] bg-gray-700 hidden' />
            </Link>
          </li>

        </ul>

      </div>



    </div>
  )
}

export default Nav