import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = React.useState([])


  const fetchList = async ()=>{
    try{
      const response = await axios.get(backendUrl + 'api/product/list')
      setList(response.data.products) 
   

    }
    catch(error){
      toast.error(error.message)

    }

  }


  const removeProduct = async (id)=>{
    try{
      const response = await axios.delete(backendUrl + 'api/product/remove/'+id, {headers : {token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }
      else{
        console.log(response.data.message)
        toast.error(response.data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    fetchList()

  },[])
  return (
    <div>
      <h1 className='mb-2 text-3xl'>Product List</h1>
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm gap-2'>
          <b>image</b>
          <b>name</b>
          <b>price</b>
          <b>category</b>
          <b className='text-center'>action</b>
        </div>

          {
            list.map((item, index) => {
              return(
                <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border'>
                  <img src={item.image[0]} alt={item.name} className=''/>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.category}</p>
                  <p className='cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>x</p>


                </div>

              )
            }
                

                

            
          )
          }


      </div>

    </div>
  )
}

export default List