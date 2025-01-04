import React, { useContext } from 'react'
import ShopContext from '../context/ShopContext'
import { Link } from 'react-router-dom'
const ProductCard = ({_id, name, image, price, description}) => {
    
  return (
    <Link to={`/product/${_id}`} className='text-gray-700 cursor-pointer '>
      <div className="overflow-hidden">
        <img src={image[0]} alt="" className='hover:scale-110 transition-all ease-in-out'/>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>${price}</p>
        <p className='text-sm'>{description}</p>

      </div>

    </Link>
    
  )
}

export default ProductCard