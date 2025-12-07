import axios from "axios";
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const [check,setCheck]=useState(true)
  const [getdata,setGetdata]=useState({mobile:"",password:""});
  const error=useRef("")
  const navigate=useNavigate();


  const getval=(e)=>{
    setGetdata({...getdata,[e.target.name]:e.target.value})
  }


  const checkf=()=>{
    setCheck(!check)
  }

  const handelsubmit=async (e)=>{
    e.preventDefault()
     try {
       const response=await axios.post('http://localhost:3000/api/user/login',getdata)
       if(response.data.success) {
        error.current.innerText="";
        
        setGetdata({mobile:"",password:""})
        alert('successfully login ',getdata.username)
        navigate('/home')
       }
    } 
    catch (err) {
      error.current.innerText=err.response?err.response.data.msg:"Network issue!!!";
      
    }
  }
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative w-full max-w-sm">  
        {/* Animated Background Elements */}
        
        <div className=" bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-6 text-center border-b border-white/10">
            <h1 className="text-2xl font-bold text-white font-serif mb-1">BUILDMASTERS</h1>
            <p className="text-yellow-400 text-xs">Login to Your Account</p>
          </div>

          <div className="p-6">
            {/* Error Message */}
            <div className="mb-4 text-center">
              <h3 className="text-red-300  flex items-center justify-center" ref={error}></h3>
            </div>

            <form onSubmit={handelsubmit} className="space-y-4" >
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="mobile" className="block text-white font-semibold text-xs uppercase tracking-wide">
                  phone :
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    id="mobile" 
                    name="mobile"
                    value={getdata.mobile}
                    onChange={getval}
                    placeholder="eg: 1234567890"
                    className="w-full px-3 py-2 bg-gray-300 border border-white/20 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Password :
                </label>
                <div className="relative">
                  <input 
                  name="password"
                    type={check?"password":"text"} 
                    id="password"
                    onChange={getval}
                    value={getdata.password}
                    placeholder="eg: 123456"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  />
                </div>
              </div>

              {/* Show Password Checkbox */}
              <div className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg border border-white/10">
                <input 
                  type="checkbox" 
                  onChange={checkf} 
                  id="checkpass"
                  className="w-3 h-3 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-1"
                />
                <label htmlFor="checkpass" className="text-white text-xs cursor-pointer">
                  Show password
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex  gap-3 pt-4">
                <input 
                  type="reset" 
                  value="Reset" 
                  className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 border border-gray-500 cursor-pointer text-sm"
                />
                <input 
                  type="submit" 
                  value="Submit"
                  className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer border border-yellow-400 text-sm"
                />
              </div>

              {/* Registration Link */}
              <div className="text-center pt-1 border-t border-white/10">
                <Link 
                  to="/register" 
                  className="text-yellow-400 hover:text-yellow-300 font-semibold transition-all duration-300 inline-flex items-center space-x-1 group text-sm"
                >
                  <span>New user ?</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}
export default Login