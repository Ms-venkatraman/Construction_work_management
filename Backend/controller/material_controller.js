import { material } from "../Model/constructionModel.js"

export const addmaterial=async (req,res)=>{
     const materials=await req.body
     console.log(materials)
    try {
        const materialdb=await material.create(materials)
        res.status(200).json({message:"add data successfully",materials})
       
    } catch (error) {
        console.log("something error in addmaterial :",error.message)
    }
}

export const getmaterial=async (req,res)=>{
    try {
        const materialdata=await material.find()
        res.status(201).json({message:"data get successfully",materialdata})
    } catch (error) {
        console.log("something error in getmaterial :",error.message)
    }
}

export const editMaterial=async (req,res)=>{
    console.log(req.body)
    const {id,name,category,available}=req.body
    try {
        
        const editmaterial=await material.updateOne({id},{$set:req.body})
        res.status(201).json({msg:"edited"})
    } catch (error) {
        res.status(404).json({msg:`error to Edit material : ${error.msg}`})
        console.log("something error: ",error.message)
    }
}

export const deleteMaterial=async(req,res)=>{
    const deletedata=req.params.id
    try {
        const deletematerial=await material.deleteOne({id:deletedata})
        console.log(deletedata)
        res.status(200).json({msg:'successfully deleted',data:deletematerial})
    } catch (error) {
        res.status(401).json({msg:'something error to delete labour',err:error.message})
    }
} 