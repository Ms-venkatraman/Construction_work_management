import { maintanance } from "../Model/constructionModel.js";
import jwt from 'jsonwebtoken';
// POST - Create new maintenance entry
export const addmaintanance = async (req, res) => {
    const maintanancedatas = req.body;
    console.log(maintanancedatas);
    
    try {
        const maintanancedata = await maintanance.create(maintanancedatas);

        res.status(201).json({
            success: true,
            message: 'Maintenance entry created successfully',
            data: maintanancedata,
            
        });

    } catch (error) {
        console.log('Error creating maintenance entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create maintenance entry',
            error: error.message
        });
    }
}

// GET - Get all maintenance entries
export const getmaintanance = async (req, res) => {
    try {
        const userId=req.user.id;
        const mainatananncedata = await maintanance.find({userId}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: mainatananncedata,
            request:req.headers
        });
    } catch (error) {
        console.error('Error fetching maintenance entries:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch maintenance entries',
            error: error.message
        });
    }
}

// PUT - Update maintenance entry
export const updatemaintanance = async (req, res) => {
    try {
        const userId=req.user.id;
        const { id } = req.params;
        
        const updatedEntry = await maintanance.findByIdAndUpdate(
            id,
            userId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({
                success: false,
                message: 'Maintenance entry not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Maintenance entry updated successfully',
            data: updatedEntry
        });

    } catch (error) {
        console.error('Error updating maintenance entry:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update maintenance entry',
            error: error.message
        });
    }
}