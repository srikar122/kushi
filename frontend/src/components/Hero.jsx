import React from 'react'
import hero_img from '../assets/hero_img.png'
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 '>
      {/* hero left */}
        <div className='flex-1 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex gap-2 items-center'>
              <div className='h-[2px] w-8 md:w-11 bg-[#414141]'></div>
              <p>out best sellers</p>
            </div>
            <h1 className='font-semibold text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arraivals</h1>
            <div className='flex gap-2 items-center'>
              <p>Shop now</p>
              <div className='h-[2px] w-8 md:w-11 bg-[#414141]'></div>
            </div>
          </div>


          

        </div>
      {/* hero right side */}
      <div className='flex-1 flex'>
        <img src={hero_img} alt="" />




      </div>

    </div>
  )
}

export default Hero