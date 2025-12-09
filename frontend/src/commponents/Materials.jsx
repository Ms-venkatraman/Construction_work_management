import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Material = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("All");
    
    // Fetch only stocks data
    const fetchStocks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/user/getstock');
            console.log(response.data.stocks)
            setStocks(response.data.stocks);
        } catch (error) {
            console.log("Error fetching stocks:", error.message);
            setStocks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    // Get quantity and unit from stock details
    const getStockQuantityAndUnit = (stock) => {
        const quantityDetail = stock.details.find(detail => 
            detail.label.toLowerCase().includes('quantity') || 
            detail.label.toLowerCase().includes('qty')
        );
        
        if (!quantityDetail) return { quantity: 0, unit: 'units' };
        
        // Extract quantity value and unit from the combined string
        const quantityValue = quantityDetail.value;
        
        // Try to parse the quantity value to extract number and unit
        const match = quantityValue.match(/^([\d.]+)\s*(.*)$/);
        // console.log(stock.details[0].unit);
        if (match) {
            const quantity = parseFloat(match[1]);
            const unit =stock.details[0].unit || 'units';
            return { quantity, unit };
        }
        
        // If parsing fails, try to extract just the number
        const numberMatch = quantityValue.match(/([\d.]+)/);
        if (numberMatch) {
            return { 
                quantity: parseFloat(numberMatch[1]), 
                unit: quantityValue.replace(numberMatch[1], '').trim() || 'units'
            };
        }
        
        return { quantity: 0, unit: 'units' };
    };

    // Get category from stock - now directly from stock.category
    const getStockCategory = (stock) => {
        return stock.category || 'General';
    };

    // Get status based on quantity
    const getStockStatus = (quantity) => {
        if (quantity > 0) return { status: 'Available', color: 'green' };
        return { status: 'Unavailable', color: 'red' };
    };

    // Create materials from stocks - include ALL materials now
    const materials = stocks.map(stock => {
        const { quantity, unit } = getStockQuantityAndUnit(stock);
        const category = getStockCategory(stock);
        const status = getStockStatus(quantity);
        
        return {
            id: stock.id,
            name: stock.name,
            category: category,
            quantity: quantity,
            unit: unit,
            status: status
        };
    });

    // REMOVED: Filter available materials (quantity > 0)
    // Now we show ALL materials regardless of quantity
    const allMaterials = materials;

    // Get unique categories for filter - from ALL materials
    const categories = ["All", ...new Set(allMaterials.map(material => material.category))];

    // Filter materials by selected category - from ALL materials
    const filteredMaterials = categoryFilter === "All" 
        ? allMaterials 
        : allMaterials.filter(material => material.category === categoryFilter);

    // Count available materials for the header
    const availableMaterialsCount = allMaterials.filter(material => material.quantity > 0).length;

    if (loading) {
        return (
            <><Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading materials...</p>
                    </div>
                </div>
            <Footer/>
            </>
        );
    }

    return (
        <><Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">All Materials</h1>
                            <p className="text-gray-600 mt-2">
                                {availableMaterialsCount} available • {allMaterials.length} total materials
                            </p>
                        </div>
                        
                        {/* Category Filter */}
                        <div className="flex items-center space-x-4">
                            <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                                Filter by Category:
                            </label>
                            <select
                                id="category-filter"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {categories.map((category,id) => (
                                    <option key={id} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Materials Table */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-50 border-gray-200">
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Material Name</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Category</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Available Quantity</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMaterials.map((material,id) => (
                                        <tr key={id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-gray-900 text-lg">
                                                    {material.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                                    {material.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-xl font-bold ${
                                                        material.quantity > 0 ? 'text-gray-900' : 'text-gray-400'
                                                    }`}>
                                                        {material.quantity}
                                                    </span>
                                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
                                                        {material.unit}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold ${
                                                    material.status.color === 'green' 
                                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                                        : 'bg-red-100 text-red-800 border border-red-200'
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${
                                                        material.status.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}></span>
                                                    {material.status.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredMaterials.length === 0 && (
                            <div className="text-center py-12">
                                <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        {categoryFilter === "All" 
                                            ? "No materials found" 
                                            : `No materials found in ${categoryFilter} category`
                                        }
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        {stocks.length > 0 
                                            ? "Try selecting a different category."
                                            : "No materials available in the system."
                                        }
                                    </p>
                                    {categoryFilter !== "All" && (
                                        <button
                                            onClick={() => setCategoryFilter("All")}
                                            className="text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View all categories
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Category Breakdown - Updated to show ALL materials */}
                    {allMaterials.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4">Materials by Category</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {Array.from(new Set(allMaterials.map(m => m.category))).map((category,id) => {
                                    const categoryMaterials = allMaterials.filter(m => m.category === category);
                                    const availableCount = categoryMaterials.filter(m => m.quantity > 0).length;
                                    const totalQuantity = categoryMaterials.reduce((sum, m) => sum + m.quantity, 0);
                                    
                                    return (
                                        <div 
                                            key={id} 
                                            className={`bg-white rounded-xl shadow-lg p-4 border border-gray-200 cursor-pointer transition-all duration-200 ${
                                                categoryFilter === category ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                                            }`}
                                            onClick={() => setCategoryFilter(category)}
                                        >
                                            <div className="text-center">
                                                <div className="text-sm font-medium text-gray-600 mb-1">{category}</div>
                                                <div className="text-2xl font-bold text-gray-900">{categoryMaterials.length}</div>
                                                <div className="text-xs text-gray-500 mt-1">total items</div>
                                                <div className="text-sm font-medium mt-2">
                                                    <div className="text-green-600">{availableCount} available</div>
                                                    <div className="text-gray-600">{totalQuantity.toFixed(1)} total units</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        <Footer/>
        </>
    );
};

export default Material;