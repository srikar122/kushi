import { useState, useContext } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import {ShopContext} from './context/ShopContext'
import { ToastContainer, toast } from 'react-toastify';


import {About,Cart,Collection,Contact,Home,Login,Orders,PlaceOrder,Product,Footer} from './pages/index'

import {Nav, SearchBar} from './components/index'



function App() {
  
  const {showSearch,setShowSearch} = useContext(ShopContext)

  return (
    <div className='c-space'>
      <ToastContainer />


    <Nav></Nav>
    <SearchBar></SearchBar>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
      </Routes>

    <Footer></Footer>

    

    </div>
  )
}

export default App
