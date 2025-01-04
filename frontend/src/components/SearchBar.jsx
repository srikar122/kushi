import React, { useContext, useEffect,  } from 'react'
import { ShopContext } from '../context/ShopContext'
import { BiSearch } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'

const SearchBar = () => {


  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)

  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 w-3/4 sm:w-1/2 rounded-3xl">
      <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'/>
      <BiSearch className='cursor-pointer'></BiSearch>
      </div>
      <IoClose size={30} className='inline cursor-pointer' onClick={()=> setShowSearch(false)}></IoClose>

        
    </div>
  ) : null

}

export default SearchBar 