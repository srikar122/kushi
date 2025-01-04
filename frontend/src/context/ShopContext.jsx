import { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
export const ShopContext = createContext()
import axios from 'axios'



const ShopContextProvider = (props) => {

    const currency = `$`
    const delivery_fee = 99
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState([])



    // cart total 

    const getCartAmount = () => {
        let total = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    total += itemInfo.price * cartItems[items][item]


                }

            }
        }


        return total;

    }

    // add to cart 

    const addToCart = async (itemId, size) => {

        if (!size) toast.error('please select product size')

        else {


            let cartData = structuredClone(cartItems)
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {

                    cartData[itemId][size] += 1
                }
                else {
                    cartData[itemId][size] = 1
                }

            }
            else {
                cartData[itemId] = {}
                cartData[itemId][size] = 1
            }
            setCartItems(cartData)
            if (token !== '') {
                try {
                    const response = await axios.post(backendUrl + 'api/cart/add', { itemId, size }, { headers: { token } })
                    if (response.data.success) {
                        toast.success(response.data.message)
                    }
                    else {
                        console.log(response.data.message)
                        toast.error(response.data.message)

                    }


                }
                catch (error) {
                    console.log(error)
                    toast.error(error.message)

                }

            }


        }


    }


    //   update Quantity
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity
        setCartItems(cartData)
        if (token !== '') {
            try {
                const response = await axios.post(backendUrl + 'api/cart/update', { itemId, size, quantity }, { headers: { token } })
                if (response.data.success) {
                    toast.success(response.data.message)
                }
                else {
                    console.log(response.data.message)
                    toast.error(response.data.message)
                }
            }
            catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getPRoductData = async () => {
        try {
            const response = await axios.get(backendUrl + 'api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)

            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }


    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + 'api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        getPRoductData()

    }, [])

    useEffect(() => {

        if (token == '' && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))


        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        updateQuantity, getCartAmount, backendUrl, token, setToken
    }




    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider