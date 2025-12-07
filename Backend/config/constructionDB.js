import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try {
         const db= await mongoose.connect(process.env.MONGO_URI);
         console.log(`successfully DB connected... ${db.connection.name}`)
        
    } catch (error) {
        console.log(`something error in DBconnect..${error.message}`)
    }
   
}