import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './Router/router.js'
import {connectDB} from './config/constructionDB.js'
dotenv.config()
connectDB()
const app=express()
const PORT=process.env.PORT||10000
app.use(express.json())
app.use(cors())
// http://localhost:3000/api/user
app.use('/api/user',router)

console.log(process.env.MONGO_URI);
app.listen(PORT,()=>{
    console.log(`server running in http://localhost:${PORT}`)
})
// http://localhost:3000