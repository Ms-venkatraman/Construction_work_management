import { Route, Routes } from "react-router-dom"
import Home from "../commponents/Home"
import Maintanence from "../commponents/Maintanence"
import Stack from "../commponents/Stocks"
import Stocks from "../commponents/Stocks"
import Adding from "../commponents/Adding"
import Login from "../commponents/Login"
import Labour from "../commponents/Labours"
import Documentation from "../commponents/Documentation"
import Register from "../commponents/Register"
import Material from "../commponents/Materials"

const Routers = () => {
  return (<>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/maintanence" element={<Maintanence/>}/>
        <Route path="/stack" element={<Stack/>}/>
        <Route path="/adding" element={<Adding/>}/>
        <Route path="/labour" element={<Labour/>}/>
        <Route path="/materials" element={<Material/>}/>
        <Route path="/stock" element={<Stocks/>}/>
        <Route path="/documentation" element={<Documentation/>}/>   
        <Route path="/register" element={<Register/>}/>
      </Routes>
  </>)
}

export default Routers