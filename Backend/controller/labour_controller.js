import { labourModel } from "../Model/constructionModel.js"

export const addlabour = async (req,res)=>{
    try {
        const userId = await req.user.id;
        const {id,name,age,salary,role,mobile,gender,address,image}= await req.body
        const labourdata = await labourModel.create({id,name,age,salary,role,mobile,gender,address,image,userid:userId})
        res.status(200).json({message:"add labourdata successfully",labourdata})
    } catch (error) {
        res.status(401).json({msg:error.message})
    }
}

export const getlabour=async (req,res)=>{
    try {
         const userID = await req.user.id;
         const labourdata= await labourModel.find({userid:userID});
         res.status(201).json({success:true,data:labourdata})
    } catch (error) {
        console.log("something error in getlabour :",error.message)
    }
}

export const editlabour= async(req,res)=>{
    try {
         const userId=req.user.id;
         const {id,name,age,mobile,gender,address,role,image}=req.body
        
        const updatelabour=await labourModel.updateOne({id},{$set:req.body});
        res.status(200).json({msg:'updated successflly!',updatelabour})
    } catch (error) {
        res.status(401).json({msg:'something error to update',err:error.errmsg})
    }
}

export const deletelabour=async(req,res)=>{
    const deletedata=req.params.id
    try {
        const userId=req.user.id;
        const deletelabour=await labourModel.deleteOne({id:deletedata,userId})
        res.status(200).json({msg:'successfully deleted'})
    } catch (error) {
        res.status(401).json({msg:'something error to delete labour',err:error.message})
    }
} 