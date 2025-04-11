import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRegister = async(req ,res)=>{
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
    } catch (error) {
        
    }
}