import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import mongoose from "mongoose";
import userRouter from './routes/userRoutes.js';



const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('MongoDB connected');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);
}

export default connectDB;


const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const PORT = process.env.PORT || 4000
app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`)
})

