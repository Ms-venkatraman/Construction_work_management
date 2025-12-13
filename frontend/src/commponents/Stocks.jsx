import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const Stocks = () => {
  const [materialstocks, setMaterialstocks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [addForm, setAddForm] = useState({
    name: "",
    image: "",
    category: "",
    materialGrade: "",
    unitPrice: "",
    purchaseDate: "",
    details: [
      { label: "Quantity", value: "", unit: "" }
    ]
  });
  
  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
    category: "",
    materialGrade: "",
    unitPrice: "",
    purchaseDate: "",
    details: []
  });

  // Category options
  const categoryOptions = [
    "Metals",
    "Wood",
    "Construction",
    "Plumbing",
    "Electrical",
    "Finishing",
    "Hardware",
    "Tools",
    "Safety",
    "General"
  ];

  // Unit options for quantity
  const unitOptions = [
    "kg", "g", "tons", "liters", "ml", 
    "pieces", "packs", "units", "boxes", 
    "meters", "cm", "feet", "yards",
    "sq meters", "sq feet", "bundles", "rolls"
  ];

  // Fetch stocks automatically
  const fetchstocks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getstock`);
      setMaterialstocks(response.data.stocks || []);
    } catch (error) {
      console.log('Error fetching stocks:', error);
      alert('Failed to load stocks');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on component mount and after operations
  useEffect(() => {
    fetchstocks();
  }, []);

  // Filter stocks based on search term
  const filteredStocks = materialstocks.filter(material => 
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (material.category && material.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (material.materialGrade && material.materialGrade.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (material.details && material.details.some(detail => 
      detail.value && detail.value.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const handeladdstocks = () => {
    setShowAddForm(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailChange = (index, field, value, isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        details: prev.details.map((detail, i) => 
          i === index ? { ...detail, [field]: value } : detail
        )
      }));
    } else {
      setAddForm(prev => ({
        ...prev,
        details: prev.details.map((detail, i) => 
          i === index ? { ...detail, [field]: value } : detail
        )
      }));
    }
  };

  const addDetailField = (isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        details: [...prev.details, { label: "", value: "", unit: "" }]
      }));
    } else {
      setAddForm(prev => ({
        ...prev,
        details: [...prev.details, { label: "", value: "", unit: "" }]
      }));
    }
  };

  const removeDetailField = (index, isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        details: prev.details.filter((_, i) => i !== index)
      }));
    } else {
      setAddForm(prev => ({
        ...prev,
        details: prev.details.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAddStocks = async () => {
    if (!addForm.name || !addForm.image || !addForm.category) {
      alert("Please fill all required fields");
      return;
    }

    // Validate at least one detail field is filled
    const validDetails = addForm.details.filter(detail => detail.label && detail.value);
    if (validDetails.length === 0) {
      alert("Please fill at least one detail field");
      return;
    }

    // Format details to combine value and unit for quantity field
    const formattedDetails = addForm.details.map(detail => {
      if (detail.label === "Quantity" && detail.unit) {
        return {
          label: detail.label,
          value: `${detail.value} ${detail.unit}`
        };
      }
      return detail;
    });

    // REMOVED ID FIELD - Let MongoDB handle _id automatically
    const newStock = {
      id:crypto.randomUUID(),
      name: addForm.name,
      image: addForm.image,
      category: addForm.category,
      materialGrade: addForm.materialGrade,
      unitPrice: addForm.unitPrice,
      purchaseDate: addForm.purchaseDate,
      details: formattedDetails
    };

    console.log("Adding stock:", newStock);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/addstocks`, newStock);      
      await fetchstocks(); // Refresh data after adding
      
      // Reset form and close
      setAddForm({
        name: "",
        image: "",
        category: "",
        materialGrade: "",
        unitPrice: "",
        purchaseDate: "",
        details: [
          { label: "Quantity", value: "", unit: "" }
        ]
      });
      setShowAddForm(false);
      alert('Stock added successfully!');
      
    } catch (error) {
      console.log('Error adding stock:', error);
      if (error.response) {
        console.log('Server response:', error.response.data);
        alert('Failed to add stock: ' + (error.response.data.message || 'Server error'));
      } else {
        alert('Failed to add stock. Please check your connection.');
      }
    }
  };

  const handleEdit = (stock) => {
    console.log("EDIT clicked for stock:", stock);
    
    // Use _id instead of id
    setEditingId(stock._id);
    
    // Parse existing details to extract quantity value and unit
    const parsedDetails = stock.details.map(detail => {
      if (detail.label === "Quantity") {
        const [value, ...unitParts] = detail.value.split(' ');
        return {
          ...detail,
          value: value || "",
          unit: unitParts.join(' ') || ""
        };
      }
      return { ...detail, unit: "" };
    });

    // Format purchase date for input field (YYYY-MM-DD)
    const formattedPurchaseDate = stock.purchaseDate ? 
      new Date(stock.purchaseDate).toISOString().split('T')[0] : "";

    setEditForm({
      name: stock.name || "",
      image: stock.image || "",
      category: stock.category || "",
      materialGrade: stock.materialGrade || "",
      unitPrice: stock.unitPrice || "",
      purchaseDate: formattedPurchaseDate,
      details: parsedDetails
    });
  };

  const handleSaveEdit = async (stockId) => {
    if (!editForm.name || !editForm.image || !editForm.category) {
      alert("Please fill all required fields");
      return;
    }

    const validDetails = editForm.details.filter(detail => detail.label && detail.value);
    if (validDetails.length === 0) {
      alert("Please fill at least one detail field");
      return;
    }

    // Format details to combine value and unit for quantity field
    const formattedDetails = editForm.details.map(detail => {
      if (detail.label === "Quantity" && detail.unit) {
        return {
          label: detail.label,
          value: `${detail.value}`,
          unit: `${detail.unit}`
        };
      }
      return detail;
    });

    const updatedStock = {
      id: stockId, // Use _id for update
      name: editForm.name,
      image: editForm.image,
      category: editForm.category,
      materialGrade: editForm.materialGrade,
      unitPrice: editForm.unitPrice,
      purchaseDate: editForm.purchaseDate,
      details: formattedDetails
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/user/editstock`, updatedStock);
      
      // Auto-refresh the stocks list
      await fetchstocks();
      
      // Reset edit state
      setEditingId(null);
      setEditForm({
        name: "",
        image: "",
        category: "",
        materialGrade: "",
        unitPrice: "",
        purchaseDate: "",
        details: []
      });
      
      alert('Stock updated successfully!');
      
    } catch (error) {
      console.log('Error updating stock:', error);
      alert("Failed to update stock");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      image: "",
      category: "",
      materialGrade: "",
      unitPrice: "",
      purchaseDate: "",
      details: []
    });
  };

  const handleDelete = async (stock) => {
    console.log('Deleting stock with ID:', stock._id);
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
        // Use _id instead of id
        
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deletestock/${stock._id}`);
        
        // Auto-refresh the stocks list
        await fetchstocks();
        
        alert('Stock deleted successfully!');
        
      } catch (error) {
        console.log('Error deleting stock:', error);
        alert('Failed to delete stock');
      }
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setAddForm({
      name: "",
      image: "",
      category: "",
      materialGrade: "",
      unitPrice: "",
      purchaseDate: "",
      details: [
        { label: "Quantity", value: "", unit: "" }
      ]
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Get quantity from stock details
  const getStockQuantity = (stock) => {
    if (!stock.details) return '0';
    const quantityDetail = stock.details.find(detail => 
      detail && detail.label && (
        detail.label.toLowerCase().includes('quantity') || 
        detail.label.toLowerCase().includes('qty')
      )
    );
    return quantityDetail ? quantityDetail.value : '0';
  };

  // Get quantity number for availability check
  const getStockQuantityNumber = (stock) => {
    if (!stock.details) return 0;
    const quantityDetail = stock.details.find(detail => 
      detail && detail.label && (
        detail.label.toLowerCase().includes('quantity') || 
        detail.label.toLowerCase().includes('qty')
      )
    );
    if (!quantityDetail || !quantityDetail.value) return 0;
    
    // Extract numeric value from quantity string (e.g., "50 kg" -> 50)
    const match = quantityDetail.value.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Get category from stock
  const getStockCategory = (stock) => {
    return stock.category || 'General';
  };

  // Get material grade from stock
  const getStockMaterialGrade = (stock) => {
    return stock.materialGrade || 'Not specified';
  };

  // Get unit price from stock
  const getStockUnitPrice = (stock) => {
    return stock.unitPrice ? `₹${stock.unitPrice}` : 'Price not set';
  };

  // Get purchase date from stock
  const getStockPurchaseDate = (stock) => {
    if (!stock.purchaseDate) return 'Not specified';
    
    try {
      const date = new Date(stock.purchaseDate);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.log('Date parsing error:', error);
      return 'Invalid date';
    }
  };

  // Check availability based on quantity
  const getStockAvailability = (stock) => {
    const quantity = getStockQuantityNumber(stock);
    if (quantity > 0) {
      return { status: 'Available', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800', borderColor: 'border-green-200' };
    } else {
      return { status: 'Out of Stock', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', borderColor: 'border-red-200' };
    }
  };

  return (
    <><Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
                Stock Inventory
              </h1>
              <p className="text-gray-600">
                {filteredStocks.length} {filteredStocks.length === 1 ? 'item' : 'items'} available
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
            <button 
              onClick={handeladdstocks}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-blue-500 whitespace-nowrap flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Stock
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by material name, category, grade, or details..."
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Stocks Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((material) => {
                  const availability = getStockAvailability(material);
                  const purchaseDate = getStockPurchaseDate(material);
                  
                  return (
                    <div key={material._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
                      {/* Image Section */}
                      <div className="relative h-40 bg-gray-100 overflow-hidden">
                        <img 
                          src={material.image} 
                          alt={material.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                          }}
                        />
                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <button 
                            onClick={() => handleEdit(material)}
                            className="bg-white/90 backdrop-blur-sm text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(material)}
                            className="bg-white/90 backdrop-blur-sm text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Availability Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${availability.bgColor} ${availability.textColor} border ${availability.borderColor} shadow-sm`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${availability.color === 'green' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {availability.status}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5">
                        {/* Stock Name */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200 border-b pb-3">
                          {material.name}
                        </h3>

                        {/* Stock Details in Label: Value Format */}
                        <div className="space-y-3">
                          {/* Category */}
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-gray-600">Category:</span>
                            <span className="text-sm text-gray-800 font-medium text-right max-w-[60%]">
                              {getStockCategory(material)}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-gray-600">Price:</span>
                            <span className="text-sm text-gray-800 font-medium text-right max-w-[60%]">
                              {getStockUnitPrice(material)}
                            </span>
                          </div>

                          {/* Quantity */}
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-gray-600">Quantity:</span>
                            <span className="text-sm text-gray-800 font-medium text-right max-w-[60%]">
                              {getStockQuantity(material)} {material.details[0].unit || 'units'}
                            </span>
                          </div>

                          {/* Purchase Date */}
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-gray-600">Purchase Date:</span>
                            <span className="text-sm text-gray-800 font-medium text-right max-w-[60%]">
                              {purchaseDate}
                            </span>
                          </div>

                          {/* Material Grade */}
                          {material.materialGrade && (
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-semibold text-gray-600">Grade:</span>
                              <span className="text-sm text-gray-800 font-medium text-right max-w-[60%]">
                                {getStockMaterialGrade(material)}
                              </span>
                            </div>
                          )}

                          {/* Availability */}
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold text-gray-600">Available:</span>
                            <span className={`text-sm font-medium text-right max-w-[60%] ${
                              availability.status === 'Available' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {availability.status === 'Available' ? 'Available' : 'Not Available'}
                            </span>
                          </div>
                        </div>

                        {/* Additional Details */}
                        {material.details && material.details.filter((detail) => 
                          detail && detail.label && !detail.label.toLowerCase().includes('quantity') && detail.value
                        ).length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                              Additional Details:
                            </div>
                            <div className="space-y-2 max-h-24 overflow-y-auto">
                              {material.details
                                .filter((detail) => 
                                  detail && detail.label && !detail.label.toLowerCase().includes('quantity') && detail.value
                                )
                                .slice(0, 3)
                                .map((detail, index) => (
                                  <div key={index} className="flex justify-between items-center text-xs">
                                    <span className="text-gray-600 font-medium capitalize">{detail.label}:</span>
                                    <span className="text-gray-800 font-medium text-right max-w-[100px] truncate">
                                      {detail.value}
                                    </span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-gray-200">
                    <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">No Stock Found</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {searchTerm ? `No inventory items matching "${searchTerm}"` : "Your inventory is empty. Start by adding your first stock item."}
                    </p>
                    {searchTerm ? (
                      <button
                        onClick={clearSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                      >
                        Clear Search
                      </button>
                    ) : (
                      <button
                        onClick={handeladdstocks}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                      >
                        Add First Stock
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Stocks Popup Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Add New Stock</h2>
                  <p className="text-blue-100 text-sm mt-1">Fill in the stock details below</p>
                </div>
                <button
                  onClick={handleCloseAddForm}
                  className="text-white hover:text-blue-200 transition-colors duration-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Material Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={addForm.name}
                  onChange={handleAddFormChange}
                  placeholder="Enter material name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category *
                </label>
                <select
                  name="category"
                  value={addForm.category}
                  onChange={handleAddFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Grade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Material Grade
                </label>
                <input
                  type="text"
                  name="materialGrade"
                  value={addForm.materialGrade}
                  onChange={handleAddFormChange}
                  placeholder="Enter material grade"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                />
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Unit Price (₹)
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={addForm.unitPrice}
                  onChange={handleAddFormChange}
                  placeholder="Enter unit price in Rupees"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={addForm.purchaseDate}
                  onChange={handleAddFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Select the purchase date of this stock</p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={addForm.image}
                  onChange={handleAddFormChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                />
              </div>

              {/* Details Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Stock Details *
                  </label>
                  <button
                    type="button"
                    onClick={() => addDetailField(false)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Detail
                  </button>
                </div>
                <div className="space-y-4">
                  {addForm.details.map((detail, index) => (
                    <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={detail.label}
                          onChange={(e) => handleDetailChange(index, 'label', e.target.value)}
                          placeholder="Label (e.g., Size, Color, Brand)"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                          disabled={index === 0 && detail.label === "Quantity"}
                        />
                        <input
                          type="text"
                          value={detail.value}
                          onChange={(e) => handleDetailChange(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                        />
                        {detail.label === "Quantity" && (
                          <select
                            value={detail.unit}
                            onChange={(e) => handleDetailChange(index, 'unit', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                          >
                            <option value="">Select Unit</option>
                            {unitOptions.map((unit) => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        )}
                      </div>
                      {addForm.details.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDetailField(index, false)}
                          className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200 flex-shrink-0"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * The first field is Quantity by default. Add additional details like size, color, brand, etc.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-5 bg-gray-50 rounded-b-2xl flex justify-end space-x-4 border-t">
              <button
                onClick={handleCloseAddForm}
                className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStocks}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Add Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stocks Popup Form */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Edit Stock</h2>
                  <p className="text-blue-100 text-sm mt-1">Update stock information</p>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="text-white hover:text-blue-200 transition-colors duration-200 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Material Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  placeholder="Enter material name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Category *
                </label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material Grade */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Material Grade
                </label>
                <input
                  type="text"
                  name="materialGrade"
                  value={editForm.materialGrade}
                  onChange={handleEditFormChange}
                  placeholder="Enter material grade"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                />
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Unit Price (₹)
                </label>
                <input
                  type="number"
                  name="unitPrice"
                  value={editForm.unitPrice}
                  onChange={handleEditFormChange}
                  placeholder="Enter unit price in Rupees"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Purchase Date
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={editForm.purchaseDate}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Select the purchase date of this stock</p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditFormChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                  required
                />
              </div>

              {/* Details Section */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Stock Details *
                  </label>
                  <button
                    type="button"
                    onClick={() => addDetailField(true)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Detail
                  </button>
                </div>
                <div className="space-y-4">
                  {editForm.details.map((detail, index) => (
                    <div key={index} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={detail.label}
                          onChange={(e) => handleDetailChange(index, 'label', e.target.value, true)}
                          placeholder="Label (e.g., Size, Color, Brand)"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                        />
                        <input
                          type="text"
                          value={detail.value}
                          onChange={(e) => handleDetailChange(index, 'value', e.target.value, true)}
                          placeholder="Value"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                        />
                        {detail.label === "Quantity" && (
                          <select
                            value={detail.unit}
                            onChange={(e) => handleDetailChange(index, 'unit', e.target.value, true)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                          >
                            <option value="">Select Unit</option>
                            {unitOptions.map((unit) => (
                              <option key={unit} value={unit}>{unit}</option>
                            ))}
                          </select>
                        )}
                      </div>
                      {editForm.details.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDetailField(index, true)}
                          className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200 flex-shrink-0"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  * Update stock details as needed. Include "Quantity" field for stock tracking.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-5 bg-gray-50 rounded-b-2xl flex justify-end space-x-4 border-t">
              <button
                onClick={handleCancelEdit}
                className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEdit(editingId)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  )
}
export default Stocks;  