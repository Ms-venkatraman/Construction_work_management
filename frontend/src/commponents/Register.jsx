import { useRef, useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

export const Register = () => {
    const rname=useRef("");
    const rphone=useRef(" ");
    const mail=useRef("");
    const cpass=useRef("");
    const conpass=useRef("");
    const error=useRef("")
    const user=useRef([])
    const navigation=useNavigate()
  const [showpass,setShowpass]=useState(false)
    const validation=()=>{
        if(!rname.current.value) return " enter name !"
        if(rphone.current.value.length!==10) return "give valid number !"
        // if(!mail.current.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) return "enter valid mail !"
        if(cpass.current.value.length<6) return "must be above 6 character !"
        if(conpass.current.value!==cpass.current.value) return "dosen't Match password !"
        return ""
    }
//  let olddata=JSON.parse(localStorage.getItem("userdetail"))||"{}";
// console.log(JSON.parse(localStorage.getItem("userdetail"))||"{}");
    const register=async (e)=>{
        e.preventDefault()
        console.log("btn working")
        if(validation()) return error.current.innerText=validation()
        error.current.innerText="";
        try {
        user.current ={username:rname.current.value,mobile:rphone.current.value,mail:mail.current.value,confirmpassword:conpass.current.value}
        const regdata=user.current;
        const senddata=await axios.post("http://localhost:3000/api/user/register",regdata)
        console.log(senddata.data.dbcreate)
        rname.current.value=""
        rphone.current.value=""
        // mail.current.value=""
        cpass.current.value=""
        conpass.current.value=""
        alert("Successfully Registered 👍")
        navigation('/')
         } catch (err) {
          error.current.innerText=err.response.data.msg
        }
    }
    const visiblepass=()=>{
      setShowpass(!showpass)
    }
  return (<>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative w-full max-w-lg">
        {/* Animated Background Elements */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-6 text-center border-b border-white/10">
            <h1 className="text-2xl font-bold text-white font-serif mb-1">BUILDMASTERS Register</h1>
            <p className="text-yellow-400 text-xs">Create Your Account</p>
          </div>

          <div className="p-6">
            {/* Error Message */}
            <div className="mb-4 text-center">
              <h4 ref={error} className="text-red-600 text-lg min-h-[2.5rem] flex items-center justify-center"></h4>
            </div>

            <form onSubmit={register} className="space-y-4">
              {/* Name Input */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-white font-semibold text-xs uppercase tracking-wide">
                    Enter Name :
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      ref={rname} 
                      name="username" 
                      id="name" 
                      placeholder="eg:- venkat"
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-400 text-sm">👤</span>
                    </div>
                  </div>
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label htmlFor="phno" className="block text-white font-semibold text-xs uppercase tracking-wide">
                    phone number :
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      ref={rphone}
                      name="mobile"  
                      id="phno" 
                      placeholder="eg:-9360298754"
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-400 text-sm">📱</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              {/* <div className="space-y-2">
                <label htmlFor="mail" className="block text-white font-semibold text-xs uppercase tracking-wide">
                  Enter E-mail :
                </label>
                <div className="relative">
                  <input 
                    type="mail" 
                    ref={mail} 
                    name="mail" 
                    id="mail" 
                    placeholder="venkat@gmail.com"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400 text-sm">📧</span>
                  </div>
                </div>
              </div> */}

              {/* Password Inputs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="createpass" className="block text-white font-semibold text-xs uppercase tracking-wide">
                    create password :
                  </label>
                  <div className="relative">
                    <input 
                      type={showpass?"text":"password"}
                      ref={cpass}
                      name="cpass"  
                      id="createpass" 
                      placeholder="must be 6 character"
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <span onClick={visiblepass} className="text-gray-400 text-xl">{showpass?'🔓':'🔒'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="conpass" className="block text-white font-semibold text-xs uppercase tracking-wide">
                    Confirm password :
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      ref={conpass}
                      name="confirmpassword" 
                      id="conpass" 
                      placeholder="confirm password"
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    
                      <span className="text-gray-400 text-sm">{error=="dosen't Match password !"?"❌":"✅"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <input 
                  type="reset" 
                  value="Reset" 
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 border border-gray-500 cursor-pointer text-sm"
                />
                <input 
                  type="submit" 
                  value="Register"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer border border-yellow-400 text-sm"
                />
              </div>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-white/10">
                <Link 
                  to="/" 
                  className="text-yellow-400 hover:text-yellow-300 font-semibold transition-all duration-300 inline-flex items-center space-x-1 group text-sm"
                >
                  <span>Already have account ?</span>
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

export default Register