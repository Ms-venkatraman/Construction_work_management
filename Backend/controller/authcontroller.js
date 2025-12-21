import registerModel, { labourModel} from "../Model/constructionModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
// import mongoose from "mongoose"

export const reg_controler=async (req,res)=>{
   try {
    const {username,mobile,mail, confirmpassword}=await req.body
    const saltround=10;
    const hased = await bcrypt.hash(confirmpassword,saltround)
   
    let dbcreate=await registerModel.create({username,mobile,mail,confirmpassword:hased})

     const  getJwtToken = jwt.sign({ id:dbcreate._id}, process.env.JWT_SECRET_KEY, {
                                 expiresIn: process.env.JWT_EXPIRE 
                                 });
    
            res.json({getJwtToken})
    res.status(201).json({message:"data added succesfully",dbcreate,getJwtToken})
   } catch (error) {
    res.status(401).json({msg:"already Registered This username/number"})
    console.log("something error in register :",error.message)
   }
}
export const login=async (req,res)=>{
    try {
        const {mobile,password}= await req.body
        if(!mobile||!password) return res.status(401).json({msg:"must be enter value!"})
        const logdata= await registerModel.findOne({mobile})
        if(!logdata) return res.status(404).json({msg:'user not found in DB'})
        const match = bcrypt.compare(password, logdata.confirmpassword);
        if(!match) return res.status(400).json({msg:'invalid password'})
        const datas={name:logdata.username,mobile:logdata.mobile,}
         const  getJwtToken = jwt.sign({ id:logdata._id.toString()}, process.env.JWT_SECRET_KEY, {
                                 expiresIn: process.env.JWT_EXPIRE 
                                 });
    
         return res.status(200).json({success:true, datas, getJwtToken})

    }
    catch (error) {
        console.log('something error to login : ',error.message)
        return res.status(500).json({ msg: 'give valid number' });
    }
}
