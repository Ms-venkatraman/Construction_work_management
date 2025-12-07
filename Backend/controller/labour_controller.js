import { labourModel } from "../Model/constructionModel.js"

export const addlabour=async (req,res)=>{
    try {
        const {id,name,age,salary,role,mobile,gender,address,image}=await req.body
        const labourdata= await labourModel.create({id,name,age,salary,role,mobile,gender,address,image})
        res.status(200).json({message:"add labourdata successfully",labourdata})
    } catch (error) {
        console.log("something error in addlabour :",error.message)
        res.status(401).json({msg:error.message})
    }
}

export const getlabour=async (req,res)=>{
    try {
         const labourdata= await labourModel.find();
         res.status(201).json({success:true,data:labourdata})
    } catch (error) {
        console.log("something error in getlabour :",error.message)
    }
}

export const editlabour= async(req,res)=>{
    try {
         const {id,name,age,mobile,gender,address,role,image}=req.body
        
        const updatelabour=await labourModel.updateOne({id},{$set:req.body});
        res.status(200).json({msg:'updated successflly!',updatelabour})
        console.log("success ")
    } catch (error) {
        res.status(401).json({msg:'something error to update',err:error.errmsg})
        console.log("message: ",error.message)
    }
}

export const deletelabour=async(req,res)=>{
    const deletedata=req.params.id
    try {
        const deletelabour=await labourModel.deleteOne({id:deletedata})
        console.log(deletelabour)
        res.status(200).json({msg:'successfully deleted'})
    } catch (error) {
        res.status(401).json({msg:'something error to delete labour',err:error.message})
    }
} 