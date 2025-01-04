import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>console.log('db connected'))
    mongoose.connection.on('error', (err)=>console.log(err))

    await mongoose.connect(`${process.env.MONGODB_URL}eCommerce`)

}

export default connectDB 