import React, { useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios'
import { backendUrl } from '../App';
import {toast} from 'react-toastify'

const Add = ({token}) => {
  const [image1Base64, setImage1Base64] = useState("");
  const [image2Base64, setImage2Base64] = useState("");
  const [image3Base64, setImage3Base64] = useState("");
  const [image4Base64, setImage4Base64] = useState("");

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("men")
  const [subCategory, setSubCategory] = useState("topwear")
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestseller] = useState(false)


  const handleImageChange = (event, setImageBase64) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageBase64(reader.result);
        // console.log(reader.result)
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try{
      
      const response = await axios.post(backendUrl + 'api/product/add',
        {
          name,
          description,
          price,
          category,
          subCategory,
          sizes,
          bestseller,
          images : [
            image1Base64,
            image2Base64,  
            image3Base64,
            image4Base64
          ].filter(Boolean),
        },
        {headers : {token}}
      )
      if(response.data.success){
        toast.success('prodcut added succesfully')
      }
      else{
        toast.error('product not added')
      }
      setName('')
      setDescription('')
      setPrice('')
      setCategory('')
      setSubCategory('')
      setSizes([])
      setBestseller(false)
      setImage1Base64('')
      setImage2Base64('')
      setImage3Base64('')
      setImage4Base64('')
    }
    catch(error){
      toast.error(error.message)

    }

  }
  return (
    <form action="" className='flex flex-col items-start gap-2 ' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-2'>Upload Images</p>

        <div className='flex gap-5'>
          <label className='cursor-pointer' htmlFor="image1">
            <MdOutlineFileUpload size={30} />
            <input 
              type="file" 
              id='image1' 
              hidden 
              onChange={(e) => handleImageChange(e, setImage1Base64)}
              required
            />
            <p className={image1Base64 === '' ? `hidden` : `flex justify-center items-center`}>✅</p>
          </label>
          <label className='cursor-pointer' htmlFor="image2">
            <MdOutlineFileUpload size={30} />
            <input 
              type="file" 
              id='image2' 
              hidden 
              onChange={(e) => handleImageChange(e, setImage2Base64)}
            />
            <p className={image2Base64 === '' ? `hidden` : `flex justify-center items-center`}>✅</p>
          </label>
          <label className='cursor-pointer' htmlFor="image3">
            <MdOutlineFileUpload size={30} />
            <input 
              type="file" 
              id='image3' 
              hidden 
              onChange={(e) => handleImageChange(e, setImage3Base64)}
            />
            <p className={image3Base64 === '' ? `hidden` : `flex justify-center items-center`}>✅</p>
          </label>
          <label className='cursor-pointer' htmlFor="image4">
            <MdOutlineFileUpload size={30} />
            <input 
              type="file" 
              id='image4' 
              hidden 
              onChange={(e) => handleImageChange(e, setImage4Base64)}
            />
              <p className={image4Base64 === '' ? `hidden` : `flex justify-center items-center`}>✅</p>
          </label>
        </div>
      </div>

      <p className='mt-2'>product name</p>
      <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='type here' className='max-w-72 w-full outline-none border-2 px-2 py-2 text-sm'/>
            
      
      <p className='mt-2'>description</p>
      <textarea onChange={(e)=> setDescription(e.target.value)} value={description} type="text" placeholder='type here' className='max-w-72 w-full outline-none border-2 px-2 py-2 text-sm'/>

      <div>
        <p>category</p>
        <select onChange={(e)=> setCategory(e.target.value)} value={category} id="" className='border-2 p-2 mt-2'>
          <option value="men">men</option>
          <option value="women">women</option>
          <option value="kids">kids</option>
        </select>

      </div>
      <div>
        <p>sub category</p>
        <select onChange={(e)=> setSubCategory(e.target.value)} value={subCategory} id="" className='border-2 p-2 mt-2'>
          <option value="topwear">topwear</option>
          <option value="winterwear">winterwear</option>
          <option value="accessories">accessories</option>
        </select>

      </div>
      <p className='mt-2'>price</p>
      <input onChange={(e)=> setPrice(e.target.value)} value={price} type="number" placeholder='type here' className='max-w-72 w-full outline-none border-2 px-2 py-2 text-sm'/>
      
      <div className="">
        <p>product sizes</p>
        <div className="flex gap-3">
          <div onClick={()=>setSizes(prev => prev.includes('s') ? prev.filter(item => item !== 's') : [...prev, 's'])}>
            <p className={`mt-2 px-3 py-2 bg-slate-200 cursor-pointer ${sizes.includes('s') ? 'bg-orange-400' : ''}`}>s</p>
          </div>
          <div  onClick={()=>setSizes(prev => prev.includes('m') ? prev.filter(item => item !== 'm') : [...prev, 'm'])}>
            <p className={`mt-2 px-3 py-2 bg-slate-200 cursor-pointer ${sizes.includes('m') && 'bg-orange-400'}`}>m</p>
          </div>
          <div  onClick={()=>setSizes(prev => prev.includes('lg') ? prev.filter(item => item !== 'lg') : [...prev, 'lg'])}>
            <p className={`mt-2 px-3 py-2 bg-slate-200 cursor-pointer ${sizes.includes('lg') && 'bg-orange-400'}`}>lg</p>
          </div>
          <div  onClick={()=>setSizes(prev => prev.includes('xl') ? prev.filter(item => item !== 'xl') : [...prev, 'xl'])}>
            <p className={`mt-2 px-3 py-2 bg-slate-200 cursor-pointer ${sizes.includes('xl') && 'bg-orange-400'}`}>xl</p>
          </div>


        </div>
      </div>
      <div className='flex gap-3 mt-3 items-center'>
      <input onChange={(e)=> setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
      <label htmlFor="bestseller" className='cursor-pointer'>Add to best seller</label>

      </div>

      <button type='submit' className='text-white bg-black px-3 py-2 mt-2'>ADD</button>
    </form>
  );
};

export default Add;
