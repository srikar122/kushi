import formidable from "formidable";
import fs from 'fs'
import productModel from "../models/productModel.js";


const addProduct = async (req, res)=>{
    try {

        const {name, description, price, bestseller, category, subCategory, images, sizes} = req.body
        

        const productData = {
            name,
            description,
            price : Number(price),
            image : images,
            sizes,
            category,
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            date : Date.now()
        }


        const product = new productModel(productData)
        await product.save()
        res.json({success : true, message : 'product added'})

        

        
     
    
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }

}

const productList = async (req, res)=>{
    try {
        const products = await productModel.find({})
        res.json({success: true, products})
        } catch (error) {
            res.status(500).json({ message: 'An error occurred.', error: error.message });
            }

}


const removeProduct = async (req, res)=>{
    try {
        const id = req.params.id
        const product = await productModel.findByIdAndDelete(id)
        res.json({success: true, message : 'product removed'})
        } catch (error) {
            res.status(500).json({ message: 'An error occurred.', error: error.message });
            }

}

const singleProduct = async (req, res)=>{
    try {
        const id = req.params.id
        const product = await productModel.findById(id)
        if(product === null) return res.json({success : false, message : 'no product found'})
        res.json({success: true, product})
    }
    catch(error){
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
}

const removeAll = async (req,res)=>{
    try {
        await productModel.deleteMany()
        console.log('all products removed')
        res.json({success:true, message : 'all products removed'})
        }
    catch(error){
            console.log(error.message)
    }

}

export {
    addProduct,
    productList,
    removeProduct,
    singleProduct,
    removeAll
}