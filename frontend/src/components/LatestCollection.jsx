import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title, ProductCard } from '../components/index.js'

const LatestCollection = () => {

  // const {products} = useContext(ShopContext)
  // console.log(products)
  const { products } = useContext(ShopContext)
  let [latestProducts, setlatestProducts] = useState([])
  useEffect(() => {
    setlatestProducts(products.slice())
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1='Latest' text2='Collections'></Title>
        <p className="text-center w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit fuga sequi odit magni similique commodi! Nemo ratione maiores rem ab optio libero suscipit facilis, beatae id quibusdam architecto sapiente itaque.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6'>
        {
          latestProducts.map((product) => {
            return (
              <ProductCard key={product.id} {...product}></ProductCard>

            )
          })
        }
      </div>

    </div>
  )
}

export default LatestCollection