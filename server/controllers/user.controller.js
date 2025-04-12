import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userRegister = async(req ,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill in all fields"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const userdata = {
            name,email,password:hashPassword
        }

        const newUser = new userModel(userdata);
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success: true,token,user:{name:user.name}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const userLogin = async(req,res)=>{
    try {
         const {email,password} = req.body;
         const user = await  userModel.findOne({email})

         if(!user){
            return res.status(400).json({message:"Invalid email or password"})
         }

         const isMatch = await bcrypt.compare(password,user.password);


         if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({message:'login successful',token,user:{name:user.name}})
         }else{
            return res.status(400).json({message:"Invalid email or password"})
         }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const userCredits = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }
}