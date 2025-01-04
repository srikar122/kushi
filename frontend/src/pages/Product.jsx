import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import {Title, RelatedProducts} from '../components'

const Product = () => {
  const { productId } = useParams()
  const { products, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [img, setImg] = useState('')
  const [size, setSize] = useState('')


  const fetchProductData = async () => {
    products.map((item) => {

      if (item._id === productId) {
        setProductData(item)
        setImg(item.image[0])
        return null

      }

    })


  }


  useEffect(() => {
    fetchProductData()
  }, [productId, products])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* img */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img src={item} alt="img" key={index} className='sm:w-full w-[24%] sm:mb-3 flex flex-shrink-0 cursor-pointer'
                  onClick={() => { setImg(item) }}
                />

              ))
            }
          </div>

          <div className="w-full sm:w-[80%]">
            <img src={img} alt="" />
          </div>
        </div>

        {/* info */}
        <div className='flex-1'>
          <h1 className="font-medium text-2xl mt-2">
            {productData.name}
          </h1>
          <p className="mt-5 text-3xl font-medium">${productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col my-8 gap-4">

            <p className=''>select size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button key={index} className={`border py-2 px-4 ${size === item ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    onClick={() => { setSize(item) }}

                  > {item}</button>



                ))
              }
            </div>
          </div>
          <button
            onClick={()=>addToCart(productData._id, size)}
          className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 '>Add To Cart</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm flex flex-col gap-1 mt-5'>
            <p>100% original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>

          </div>

        </div>

      </div>
      {/* complete description */}
      <div className="mt-20">
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(100)</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information. </p>
        </div>
      </div>

      {/* related products */}
      <div className="my-20">
        <div className='text-center text-3xl'>
        <RelatedProducts {...productData}></RelatedProducts>
        </div>

      </div>


    </div>
  ) :
    <div className='opacity-0'></div>
}

export default Product