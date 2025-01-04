import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {ProductCard, Title} from './'
const RelatedProducts = ({category, subCategory}) => {
    const {products} = useContext(ShopContext) 
    const [relatedProducts, setRelatedProducts] = useState([])

    const findRelated = ()=>{
        const related = products.filter(product => product.category === category && product.subCategory === subCategory)
        setRelatedProducts(related)
    }

    useEffect(()=>{
        if(products.length > 0) findRelated()
    },[])



  return (
    <div className='flex flex-col gap-4'>
        <div className='text-center'>
            <Title text1 = 'RELATED' text2 = 'PRODUCTS'></Title>
        </div>
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {
            relatedProducts.map((item,index)=>(
                <ProductCard key={index} {...item}></ProductCard>
            ))
        }
    </div>
        


    </div>
  )
}

export default RelatedProducts