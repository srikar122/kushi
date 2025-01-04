import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import {Title, ProductCard, SearchBar} from '../components/index'



const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavant')

  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(category.filter(item => item !== e.target.value))
    }
    else{
      setCategory([...category, e.target.value])
      }


  }

  const toggleSubCategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(subCategory.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory([...subCategory, e.target.value])
      }


  }


  let applyFilter = ()=>{


    let productsCopy = products.slice()

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
      }
      setFilterProducts(productsCopy)
  }

  const sortProducts = (e)=>{
    let productsCopy = filterProducts.slice()
    
    switch(sortType){
      case 'low-high' :
      setFilterProducts(productsCopy.sort((a,b)=> b.price-a.price))
      break;
      case 'high-low':
        setFilterProducts(productsCopy.sort((a,b)=> a.price - b.price))
        break;
      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
    sortProducts()
  },[sortType])

  useEffect(()=>{
    applyFilter()
  },[category, subCategory, search, showSearch, products])


  useEffect(()=>{
    setFilterProducts(products)
  },[])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filters */}
      <div className='min-w-60'>
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2" onClick={()=>{
          setShowFilter(!showFilter)
        }}>Filters
            {
              showFilter ? <FaAngleDown/> : <FaAngleRight/>

            }

        </p>

        {/* category filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
            <p className='mb-3 text-sm font-medium'>categories</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" name="" id="" className='w-3' value={'Men'} onChange={toggleCategory}/> Men
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" name="" id="" className='w-3' value={'Women'} onChange={toggleCategory}/> Women
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" name="" id="" className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
              </p>
            </div>
        </div>
        {/* sub category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}`}>
            <p className='mb-3 text-sm font-medium'>Type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type="checkbox" name="" id="" className='w-3' value={'Sweater'} onClick={toggleSubCategory}/> Sweater
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" name="" id="" className='w-3' value={'TopWear'} onClick={toggleSubCategory}/> topWear
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" name="" id="" className='w-3' value={'Accessories'} onClick={toggleSubCategory}/> Accessories
              </p>
            </div>
        </div>


      </div>
      {/* right side */}
      <div className="flex-1">
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1='ALL' text2 = 'COLLECTIONS'>
          </Title>
          {/* sort */}
          <select className='px-2 border-2 border-gray-300 text-sm' onChange={(e)=>{setSortType(e.target.value)}}>
            <option value="relavant">Sort by relavant</option>
            <option value="low-high">Sort by high to low</option>
            <option value="high-low">Sort by low to high</option>


          </select>
        </div>
        {/* maping products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,index)=>(
                <ProductCard key={index} {...item}/>
              ))

            }
        </div>

      </div>


    </div>
  )
}

export default Collection