import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Home = () => {

  return (
    <>


      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>
        
        {/* Main Banner Section */}
        <section className="relative pt-6 pb-16">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            {/* Brand Header */}
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl shadow-xl mb-6 transform hover:scale-105 transition-transform duration-300">
                <h1 className="text-4xl md:text-5xl font-bold tracking-wide">BUILDMASTERS</h1>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Construction Management Platform
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Professional tools for efficient construction project management
              </p>
            </div>

            {/* Main Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Materials Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">Materials</h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Premium construction materials management</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://img.freepik.com/premium-photo/arafed-image-pile-construction-materials-tools-generative-ai_733139-140490.jpg?w=2000" 
                      className="w-full h-40 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                      alt="construction materials" 
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Premium construction materials for durable and sustainable building projects with real-time inventory tracking.
                  </p>
                  <Link 
                    to='/materials' 
                    className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold text-sm text-center transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    View Materials
                  </Link>
                </div>
              </div>

              {/* Labour Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">Labour</h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Skilled workforce management</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                      className="w-full h-40 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                      alt="construction workers" 
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Skilled workforce dedicated to quality craftsmanship and timely project completion with performance tracking.
                  </p>
                  <Link 
                    to='/labour' 
                    className="block w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-lg font-semibold text-sm text-center transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    View Labour
                  </Link>
                </div>
              </div>

              {/* Stocks Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">Stocks</h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Inventory and stock management</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                      className="w-full h-40 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                      alt="construction inventory" 
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Comprehensive inventory management for efficient construction material tracking and automated alerts.
                  </p>
                  <Link 
                    to='/stock' 
                    className="block w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg font-semibold text-sm text-center transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    View Stocks
                  </Link>
                </div>
              </div>

              {/* Documentation Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-800">Documentation</h3>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Project documentation hub</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                      className="w-full h-40 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                      alt="documentation and guides" 
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Comprehensive guides and technical documentation for construction project management and compliance.
                  </p>
                  <Link 
                    to='/documentation' 
                    className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold text-sm text-center transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section with Background */}
        <section className="relative py-16 mt-8">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="construction progress" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Streamlined Construction Process
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Optimize your construction workflow with integrated management tools
              </p>
            </div>

            {/* Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Material Management */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Material Procurement</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Streamline your construction material procurement, tracking, and inventory with real-time updates and automated ordering.
                  </p>
                  <div className="flex justify-center">
                    <div className="inline-flex items-center text-sm text-blue-600 font-medium">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Labour Optimization */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Labour Management</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Maximize workforce efficiency with skilled labor allocation, performance tracking, and automated scheduling.
                  </p>
                  <div className="flex justify-center">
                    <div className="inline-flex items-center text-sm text-emerald-600 font-medium">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stock Control */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Inventory Control</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Maintain optimal inventory levels with automated stock monitoring, predictive alerts, and intelligent reordering.
                  </p>
                  <div className="flex justify-center">
                    <div className="inline-flex items-center text-sm text-amber-600 font-medium">
                      <span>Learn More</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className="inline-block bg-gradient-to-r from-blue-600/20 to-indigo-600/20 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4">
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Optimize Your Construction Projects?</h3>
                <p className="text-blue-200 text-sm">Get started with our comprehensive management platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="relative py-12 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-semibold">Professional Construction Management</span>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join hundreds of construction professionals who trust BUILDMASTERS for their project management needs
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home