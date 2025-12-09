import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";

const Login = () => {
  const [check, setCheck] = useState(true);
  const [getdata, setGetdata] = useState({ mobile: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const error = useRef("");
  const navigate = useNavigate();

  const getval = (e) => {
    setGetdata({ ...getdata, [e.target.name]: e.target.value });
  };

  const checkf = () => {
    setCheck(!check);
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    
    if (!getdata.mobile || !getdata.password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', getdata);
      if (response.data.success) {
        error.current.innerText = "";
        setGetdata({ mobile: "", password: "" });
        
        toast.success("Successfully logged in! Redirecting...", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Network error! Please try again.";
      error.current.innerText = errorMessage;
      toast.error(errorMessage, { position: "top-right", theme: "colored" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        style={{ fontSize: "14px", marginTop: "70px", marginRight: "40px" }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-4 md:p-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        
        {/* Left Decorative Panel - Hidden on mobile */}
        <div className="hidden lg:block absolute left-0 top-0 h-175 w-1/3 bg-gradient-to-br from-blue-600/50 to-indigo-600/15">
          <div className="h-150 flex flex-col justify-center pl-12 pr-8">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">BUILDMASTERS</h1>
              <p className="text-gray-600 text-lg">Professional Construction Management Platform</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Secure & Encrypted</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <span className="text-gray-700">Team Collaboration</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Project Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md lg:ml-auto lg:mr-60">
          {/* Branding for mobile/tablet */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-xl font-bold">BUILDMASTERS</h1>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Professional Login</h2>
            <p className="text-gray-600 text-sm mt-1">Access your construction dashboard</p>
          </div>

          {/* Login Card */}
          <div className="bg-amber-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-gray-400 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Account Login</h3>
                  <p className="text-gray-600 text-sm mt-1">Enter your credentials to continue</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="px-6 pt-4">
              <div ref={error} className="text-sm text-red-600 bg-red-50 py-2 px-3 rounded-lg border border-red-100 text-center"></div>
            </div>

            {/* Login Form */}
            <form className="p-6 space-y-5" onSubmit={handelsubmit}>
              {/* Phone Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    value={getdata.mobile}
                    onChange={getval}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm placeholder-gray-400"
                    placeholder="Enter your 10-digit number"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={check ? "password" : "text"}
                    required
                    value={getdata.password}
                    onChange={getval}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={checkf}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {check ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between pt-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={checkf}
                    checked={!check}
                    className="sr-only peer"
                  />
                  <div className="relative w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-700">Show password</span>
                </label>
                <button
                  type="button"
                  onClick={() => toast.info("Check your email for reset instructions", { theme: "colored" })}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setGetdata({ mobile: "", password: "" });
                    toast.info("Form cleared", { theme: "colored" });
                  }}
                  className="py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium text-sm transition-all duration-200 border border-gray-200 flex items-center justify-center hover:border-gray-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center transition-all duration-200 ${isLoading ? 'opacity-90 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign In
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-sm text-gray-500">New to BuildMasters?</span>
                </div>
              </div>

              {/* Register Link */}
              <Link
                to="/register"
                className="block w-full py-3 px-4 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg text-center font-medium text-gray-700 hover:text-blue-700 transition-all duration-200 group"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create New Account
                </div>
              </Link>

              {/* Security Note */}
              <div className="text-center pt-2">
                <div className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Enterprise-grade security
                </div>
              </div>
            </form>
          </div>          
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Login;