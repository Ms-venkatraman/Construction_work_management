import registerModel, { labourModel} from "../Model/constructionModel.js"
import bcrypt from 'bcrypt'

export const reg_controler=async (req,res)=>{
   try {
    const {username,mobile,mail, confirmpassword}=await req.body
    const soltcount=10;
    const hased = await bcrypt.hash(confirmpassword,soltcount)
    console.log(hased)
    const dbcreate=await registerModel.create({username,mobile,mail,confirmpassword:hased})
    res.status(200).json({message:"data added succesfully",dbcreate})
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
        const match = await bcrypt.compare(password, logdata.confirmpassword);
        if(!match) return res.status(400).json({msg:'invalid password'})
        const datas={name:logdata.username,mobile:logdata.mobile,mail:logdata.mail}
         return res.status(200).json({success:true,datas})

    }
    catch (error) {
        console.log('something error to login : ',error.message)
        return res.status(500).json({ msg: 'give valid number' });
    }
}
