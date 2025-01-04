import React from 'react'

const Footer = () => {
  return (
    <>
    
    <div className='flex flex-col sm:flex-row gap-14 mt-40 text-sm border-t border-t-gray-500 pt-2 justify-evenly'>
        <div className=''>
            <h1 className='font-semibold text-xl text-gray-800 mb-3'>Kushi</h1>
            <p className='w-full md:w-2/3 text-gray-600 mb-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et pariatur fuga, soluta sunt officia aut rem quia?</p>

        </div>
        <div className=''>
            <p className='text-xl text-gray-800 font-medium mb-3'>Get in Touch</p>
            <div className='flex flex-col gap-2 text-gray-600 mb-6'>
            <p>phone : 9949609116</p>
            <p >email : kushi@gmail.com</p>

            </div>

        </div>

    </div>
      <p className='my-2 text-center text-gray-700'>Copyright 2024 @kushi.com - all rights reserved.</p>
    </>
  )
}

export default Footer