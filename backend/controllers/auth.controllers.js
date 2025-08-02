import bcrypt from 'bcrypt'
import genToken from '../config/token.js'
import User from '../models/user.model.js';


export const signUp=async(req,res)=>{
    try {
        const{userName,email,password}=req.body
        const checkUserByUserName=await User.findOne({userName})
        if(checkUserByUserName){
            return res.status(400).json({message:"User Name already exist"})
        }
        
        const checkUserByEmail=await User.findOne({email})
        if(checkUserByEmail){
            return res.status(400).json({message:"UserName Email already exist"})
        }

    if(password.length<6){
        return res.status(400).json({
            message:"Password should more than 6 digit"
        })
    }
    
    const hashPassword=await bcrypt.hash(password,10)

    const user=await User.create({
        userName,email,password:hashPassword
    })

    const token=await genToken(user._id)

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:null,
        secure:false
    })

    return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({
            message:`error sign up mai  hai solve karo ${error}`
        })
    }
}

export const logIn=async(req,res)=>{
    try {
        const{email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not  exist"})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(400).json({message:"pasword incorrect"})
        }

    const token=await genToken(user._id)

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:null,
        secure:false
    })

    return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message:`error Login in mai  hai solve karo ${error}`
        })
    }
}

export const logOut=async(req,res)=>{
try {
    res.clearCookie("token")
    return res.status(200).json({
        message:"LogOut Sucessfully..!"
    })
} catch (error) {
     return res.status(500).json({
            message:`error logOut mai  hai solve karo ${error}`
        })
}
}