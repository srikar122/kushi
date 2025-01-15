import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'


// route for user login
const loginUser = async (req,res)=>{

    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success : false, message: 'user not found'})
         }
         
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success : false, message: 'invalid password'})
        }
        if(isMatch){

            const token = createToken(user._id)
            return res.json({success : true, message: 'login success', token})
        }




    }
    catch(error){
        console.log(error)
        res.json({success:false, message:error.message})

    }


}

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET)


}


// route for user regiester

const regiesterUser = async (req, res)=>{
    try{
        const {name, email, password} = req.body;
        const exists = await userModel.findOne({email});
                if(exists) 
            return res.json({success : false, message: 'user already exists'})



        if(!validator.isEmail(email)){
            return res.json({success : false, message: 'invalid email'})
        }

        
        if(password.length < 8){
            return res.json({success : false, message: 'password must be at least 8 characters'})
        }
               const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        
        const newUser = new userModel({
            name, email, password: hashedPassword
        })
        
              const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success : true, message: 'user created successfully',token})

    }
    catch(error){
        res.json({success:'false in catch', message : error.message})
    }
}


// route for admin login
const adminLogin = async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = createToken(email+password)
            res.json({success : true, message: 'admin logged in successfully',token})

        }
        else{
            return res.json({success : false, message: 'invalid email or password'})
        }
    }
    catch(error){
        res.json({success:'false in catch', message : error.message})
    }

}

export {loginUser,regiesterUser, adminLogin}