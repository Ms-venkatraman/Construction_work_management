import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 shadow-2xl relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>
            
            <nav className="container mx-auto px-4 py-3 relative z-10">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3 lg:space-x-4">
                        <img 
                            src="ConstructionLogo.jpeg" 
                            alt="logo" 
                            className="h-12 w-12 lg:h-10 lg:w-10 rounded-full border-2 lg:border-4 border-yellow-500 shadow-lg transform hover:scale-105 transition duration-300"
                        />
                        <div className="hidden sm:block">
                            <h1 className="text-xl lg:text-2xl font-bold text-white font-serif">BUILDMASTERS</h1>
                            <p className="text-yellow-400 text-xs lg:text-sm">Building Excellence Since 1995</p>
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
                        <Link 
                            to="/home" 
                            className="relative text-white font-semibold px-4 py-2 rounded-lg hover:text-yellow-400 transition-all duration-300 group"
                        >
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link 
                            to="/maintanence" 
                            className="relative text-white font-semibold px-4 py-2 rounded-lg hover:text-yellow-400 transition-all duration-300 group"
                        >
                            Maintenance
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link 
                            to="/stack" 
                            className="relative text-white font-semibold px-4 py-2 rounded-lg hover:text-yellow-400 transition-all duration-300 group"
                        >
                            Stack
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/adding" 
                                className="bg-yellow-500 text-gray-900 font-bold px-4 lg:px-3 py-1 lg:py-1 rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-yellow-500/25 border-2 border-yellow-500 text-sm lg:text-base"
                            >
                                Adding
                            </Link>
                            <Link 
                                to="/" 
                                className="bg-yellow-500 text-gray-900 font-bold px-4 lg:px-3 py-1 lg:py-1 rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-yellow-500/25 border-2 border-yellow-500 text-sm lg:text-base"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden flex flex-col space-y-1 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-2xl">
                        <div className="flex flex-col space-y-4">
                            <Link 
                                to="/home" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center space-x-3 text-white font-semibold px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group border border-transparent hover:border-white/20"
                            >
                                <span className="text-xl">🏠</span>
                                <span>Home</span>
                                <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link 
                                to="/maintanence" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center space-x-3 text-white font-semibold px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group border border-transparent hover:border-white/20"
                            >
                                <span className="text-xl">🔧</span>
                                <span>Maintenance</span>
                                <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link 
                                to="/stack" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center space-x-3 text-white font-semibold px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group border border-transparent hover:border-white/20"
                            >
                                <span className="text-xl">📦</span>
                                <span>Stack</span>
                                <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <div className="flex flex-col space-y-3 pt-2 border-t border-white/20">
                                <Link 
                                    to="/adding" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transform hover:scale-105 transition duration-300 shadow-lg text-center border-2 border-yellow-500"
                                >
                                    Adding
                                </Link>
                                <Link 
                                    to="/" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transform hover:scale-105 transition duration-300 shadow-lg text-center border-2 border-yellow-500"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar