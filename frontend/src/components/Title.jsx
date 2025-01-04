import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
        <p className='text-gray-500 uppercase'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='line'></p>
    </div>
  )
}

export default Title