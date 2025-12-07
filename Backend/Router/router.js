import express from 'express'
import { login, reg_controler } from '../controller/authcontroller.js'
import { addmaterial, deleteMaterial, editMaterial, getmaterial } from '../controller/material_controller.js'
import { addlabour, deletelabour, editlabour, getlabour } from '../controller/labour_controller.js'
import { adddocument, getdocument } from '../controller/document_controller.js'
import { addstocks, deletestock, editstocks, getstocks } from '../controller/stocks_controller.js'
import { addmaintanance, getmaintanance, updatemaintanance } from '../controller/maintanance_controller.js'
const Router=express.Router()

Router.post('/register',reg_controler)
Router.post('/login',login)

//adding Routes
Router.post('/adddocument',adddocument)

//get data Routes
Router.post('/addmaterial',addmaterial)
Router.get('/getmaterial',getmaterial)
Router.put('/editmaterial',editMaterial)
Router.delete('/deletematerial/:id',deleteMaterial)

Router.post('/maitanance', addmaintanance);
Router.get('/maitanance', getmaintanance);
Router.put('/maitanance/:id', updatemaintanance);

Router.post('/addlabour',addlabour)
Router.get('/getlabour',getlabour)
Router.put('/editlabour',editlabour)
Router.delete('/deletelabour/:id',deletelabour)


Router.get('/getdocument',getdocument)

Router.post('/addstocks',addstocks)
Router.get('/getstock',getstocks)
Router.put('/editstock',editstocks)
Router.delete('/deletestock/:id',deletestock)

export default Router

//http://localhost:3000/api/user/register
//http://localhost:3000/api/user/login

//http://localhost:3000/api/user/addmaterial
//http://localhost:3000/api/user/addlabour
//http://localhost:3000/api/user/adddocument
//http://localhost:3000/api/user/addstocks

//http://localhost:3000/api/user/getmaterial
//http://localhost:3000/api/user/getlabour
//http://localhost:3000/api/user/getlabour
//http://localhost:3000/api/user/getstock

// http://localhost:3000/api/user/editstock

//http://localhost:3000/api/user/deletelabour/:id
// http://localhost:3000/api/user/deletestock/:id

//http://localhost:3000/api/user/getdocument
//