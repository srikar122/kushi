import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCLoudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/order_route.js'


const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCLoudinary()

// middlewares

app.use(express.json({ limit: '50mb' }))
app.use(cors())


// api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req,res)=>{
    res.send('Hello World')
})







app.listen(port, ()=> console.log('server started on port'+ port))