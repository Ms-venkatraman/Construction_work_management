import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Home = () => {
  return (
    <><Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Banner Section */}
        <section className="relative">
          <div className="relative h-50 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="construction site" 
              className="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-in-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-blue-900/50 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">
                  BUILDING EXCELLENCE
                </h1>
                <p className="text-xl md:text-2xl text-yellow-400 font-light">
                  Quality Construction Solutions
                </p>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Materials Card */}
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-600 transition-colors duration-300">
                    Materials
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Premium construction materials for durable and sustainable building projects.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://img.freepik.com/premium-photo/arafed-image-pile-construction-materials-tools-generative-ai_733139-140490.jpg?w=2000" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="construction materials" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link to='/materials' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 border border-yellow-500 text-sm">
                    View Materials
                  </Link>
                </div>
              </div>

              {/* Labour Card */}
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-600 transition-colors duration-300">
                    Labour
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Skilled workforce dedicated to quality craftsmanship and timely project completion.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="construction workers" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link to='/labour' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 border border-yellow-500 text-sm">
                    View Labour
                  </Link>
                </div>
              </div>

              {/* Stocks Card */}
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-600 transition-colors duration-300">
                    Stocks
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Comprehensive inventory management for efficient construction material tracking.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="construction inventory" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link to='/stock' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 border border-yellow-500 text-sm">
                    View Stocks
                  </Link>
                </div>
              </div>

              {/* Documentation Card */}
              <div className="bg-white rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-600 transition-colors duration-300">
                    Documentation
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Comprehensive guides and technical documentation for construction project management.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="documentation and guides" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link to='/documentation' className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 border border-yellow-500 text-sm">
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Banner Section */}
        <div className="relative h-150 overflow-hidden mt-8">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
            alt="construction progress" 
            className="w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-in-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end justify-center pb-8">
            <div className="text-center text-white mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">
                Quality Craftsmanship
              </h2>
              <p className="text-lg text-yellow-400">
                Building the future, one project at a time
              </p>
            </div>
          </div>

          {/* Process Cards Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 -mt-16">
              
              {/* Material Management Card */}
              <div className="bg-white/60 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-600 transition-colors duration-300">
                    Materials
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-800 leading-relaxed text-sm">
                        Streamline your construction material procurement, tracking, and inventory with real-time updates.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="construction materials" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg  border border-yellow-500 text-sm">
                    Manage Materials
                  </button>
                </div>
              </div>

              {/* Labour Optimization Card */}
              <div className="bg-white/60 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-600 transition-colors duration-300">
                    Labour
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-800 leading-relaxed text-sm pb-5">
                        Maximize workforce efficiency with skilled labor allocation and performance tracking.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="construction workers" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-white font-semibold py-3 px-6 rounded-lg border border-yellow-500 text-sm">
                    Optimize Labour
                  </button>
                </div>
              </div>

              {/* Stock Control Card */}
              <div className="bg-white/60 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 font-serif group-hover:text-yellow-300 transition-colors duration-300">
                    Stocks
                  </h1>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-gray-800 leading-relaxed text-sm">
                        Maintain optimal inventory levels with automated stock monitoring and predictive alerts.
                      </p>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300" 
                        alt="construction inventory" 
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-yellow-500/25 border border-yellow-500 text-sm">
                    Control Stocks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
      <Footer/>
    </>
  )
}

export default Home