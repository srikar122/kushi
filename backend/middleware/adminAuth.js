import jwt from 'jsonwebtoken'

const adminAuth = async(req, res, next)=>{
    try {
        const {token} = req.headers
        if(!token) return res.json({succes : false, message : 'login again'})
        const token_decode = jwt.verify(token, process.env.JWT_SECRET).id 
    console.log(token_decode)
           if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASS){
            return res.json({succes : false, message : 'Not Authorized login again'})
           }
           else{
            next()
           }
    }
    catch(error){
        return res.json({succes : false, message : error.message})
    }



}

export default adminAuth