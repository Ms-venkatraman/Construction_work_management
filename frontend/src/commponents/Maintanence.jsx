import React, { useState, useRef, useEffect } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';

const Maintenance = () => {
  // const [materialstocks, setMaterialstocks] = useState([]);
  // const [materialsdetail, setMaterialsdetail] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [editingDate, setEditingDate] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [labourdata, setLabourdata] = useState([]);
  const [selectedLabour, setSelectedLabour] = useState('');

  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const [updateForm, setUpdateForm] = useState({
    updates: '',
    siteImage: null,
    materialsUsed: [{ name: '', quantity: '', unit: '' }],
    labourDetails: [{ name: '', present: true, salary: '', role: '', expense: '' }],
    stockUpdates: []
  });

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch maintenance data
      const maintenanceResponse = await axios.get('http://localhost:3000/api/user/maitanance');
      if (maintenanceResponse.data.success) {
        setMaintenanceData(maintenanceResponse.data.data);
      }

      // Fetch labour data
      const labourResponse = await axios.get('http://localhost:3000/api/user/getlabour');
      setLabourdata(labourResponse.data.data);

      // Fetch stocks data
      const stocksResponse = await axios.get('http://localhost:3000/api/user/getstock');
      setStocks(stocksResponse.data.stocks);
      // setMaterialstocks(stocksResponse.data.stocks);

    } catch (error) {
      console.log('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Save maintenance data to database
  const saveMaintenanceToDB = async (maintenanceData) => {
    try {
      const dataToSend = {
        ...maintenanceData,
        siteImage: maintenanceData.siteImage ? {
          preview: maintenanceData.siteImage.preview,
          filename: maintenanceData.siteImage.file?.name || 'site-image'
        } : null
      };

      const response = await axios.post('http://localhost:3000/api/user/maitanance', dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error saving maintenance data:', error);
      throw error;
    }
  };

  // Update maintenance data in database
  const updateMaintenanceInDB = async (id, maintenanceData) => {
    try {
      const dataToSend = {
        ...maintenanceData,
        siteImage: maintenanceData.siteImage ? {
          preview: maintenanceData.siteImage.preview,
          filename: maintenanceData.siteImage.file?.name || 'site-image'
        } : null
      };

      const response = await axios.put(`http://localhost:3000/api/user/maitanance/${id}`, dataToSend);
      return response.data;
    } catch (error) {
      console.error('Error updating maintenance data:', error);
      throw error;
    }
  };

  // Debug stock information
  const debugStockInfo = () => {
    updateForm.materialsUsed.forEach((material, index) => {
      if (material.name && material.quantity) {
        const existingStock = validateMaterialExists(material.name);
      }
    });
  };

  // Validate if material exists in stocks
  const validateMaterialExists = (materialName) => {
    const foundStock = stocks.find(stock => {
      const stockName = stock.name.toLowerCase().trim();
      const inputName = materialName.toLowerCase().trim();
      
      // Exact match or contains match
      return stockName === inputName || 
             stockName.includes(inputName) || 
             inputName.includes(stockName);
    });
    
    return foundStock;
  };

  // Get current stock quantity
  const getCurrentStockQuantity = (stock) => {
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

  // Update stock quantity in database
  const updateStockQuantity = async (stockId, newQuantity, materialName) => {
    try {
      // Find stock by id (crypto.randomUUID)
      const stock = stocks.find(s => s._id === stockId);
      if (!stock) {
        console.log('❌ Stock not found with ID:', stockId);
        console.log('Available stock IDs:', stocks.map(s => ({ id: s._id, name: s.name })));
        return false;
      }

      const updatedDetails = stock.details.map(detail => {
        if (detail.label.toLowerCase().includes('quantity') || detail.label.toLowerCase().includes('qty')) {
          const currentValue = detail.value;
          const unitMatch = currentValue.match(/\s*(kg|g|tons|liters|ml|pieces|packs|units|boxes|meters|cm|feet|yards|sq meters|sq feet|bundles|rolls)$/i);
          const unit = unitMatch ? unitMatch[0] : '';
          
          return {
            ...detail,
            value: `${newQuantity}${unit ? ' ' + unit : ''}`
          };
        }
        return detail;
      });

      const updatedStock = {
        id: stockId, // Use crypto.randomUUID id
        name: stock.name,
        details: updatedDetails,
        updatedAt: new Date()
      };

      console.log('🔄 Updating stock:', {
        id: stockId,
        name: materialName,
        newQuantity: newQuantity,
        updatedStock: updatedStock
      });
      console.log(updatedStock)
      const response = await axios.put("http://localhost:3000/api/user/editstock", updatedStock);
      console.log('✅ Stock update response:', response.data);
      return response.data.success;
    } catch (error) {
      console.error('❌ Error updating stock:', error);
      return false;
    }
  };

  // Handle labour selection from dropdown
  const handleLabourSelect = (e) => {
    const selectedName = e.target.value;
    setSelectedLabour(selectedName);
    
    if (selectedName) {
      const selectedLabourData = labourdata.find(lab => lab.name === selectedName);
      if (selectedLabourData) {
        const updatedLabourDetails = [...updateForm.labourDetails];
        
        if (updatedLabourDetails.length > 0 && !updatedLabourDetails[0].name) {
          updatedLabourDetails[0] = {
            ...updatedLabourDetails[0],
            name: selectedLabourData.name,
            role: selectedLabourData.role || selectedLabourData.designation || '',
            salary: selectedLabourData.salary || selectedLabourData.dailyWage || '',
            present: true,
            expense: selectedLabourData.salary || selectedLabourData.dailyWage || 0
          };
        } else {
          updatedLabourDetails.push({
            name: selectedLabourData.name,
            role: selectedLabourData.role || selectedLabourData.designation || '',
            salary: selectedLabourData.salary || selectedLabourData.dailyWage || '',
            present: true,
            expense: selectedLabourData.salary || selectedLabourData.dailyWage || 0
          });
        }
        
        setUpdateForm(prev => ({
          ...prev,
          labourDetails: updatedLabourDetails
        }));
        
        setSelectedLabour('');
      }
    }
  };

  // Get current date in dd/mm/yy format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Check if entry date is today
  const isToday = (entryDate) => {
    return entryDate === getCurrentDate();
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUpdateForm(prev => ({
          ...prev,
          siteImage: {
            file: file,
            preview: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUpdateForm(prev => ({
      ...prev,
      siteImage: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Step 1: Basic Updates
  const handleUpdateProcess = () => {
    setShowUpdateForm(true);
    setCurrentStep(1);
    setUpdateForm({
      updates: '',
      siteImage: null,
      materialsUsed: [{ name: '', quantity: '', unit: '' }],
      labourDetails: [{ name: '', present: true, salary: '', role: '', expense: '' }],
      stockUpdates: []
    });
    setSelectedLabour('');
    setEditingId(null);
    setEditingDate(null);
  };

  const handleStep1Submit = () => {
    if (!updateForm.updates.trim()) {
      alert('Please enter work updates');
      return;
    }
    setCurrentStep(2);
  };

  // Step 2: Materials Usage
  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...updateForm.materialsUsed];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value
    };
    setUpdateForm(prev => ({
      ...prev,
      materialsUsed: updatedMaterials
    }));
  };

  const addMaterialField = () => {
    setUpdateForm(prev => ({
      ...prev,
      materialsUsed: [...prev.materialsUsed, { name: '', quantity: '', unit: '' }]
    }));
  };

  const removeMaterialField = (index) => {
    if (updateForm.materialsUsed.length > 1) {
      setUpdateForm(prev => ({
        ...prev,
        materialsUsed: prev.materialsUsed.filter((_, i) => i !== index)
      }));
    }
  };

  const handleStep2Submit = () => {
    const hasMaterials = updateForm.materialsUsed.some(m => m.name && m.quantity);
    if (!hasMaterials) {
      alert('Please add at least one material used');
      return;
    }

    // Debug stock matching
    debugStockInfo();

    // Validate all materials exist in stocks
    const invalidMaterials = [];
    updateForm.materialsUsed.forEach(material => {
      if (material.name && material.quantity) {
        const existingStock = validateMaterialExists(material.name);
        if (!existingStock) {
          invalidMaterials.push(material.name);
        }
      }
    });

    if (invalidMaterials.length > 0) {
      alert(`The following materials are not available in stocks: ${invalidMaterials.join(', ')}\n\nPlease check the material names exactly match your stock items.`);
      return;
    }

    setCurrentStep(3);
  };

  // Step 3: Labour Details
  const handleLabourChange = (index, field, value) => {
    const updatedLabour = [...updateForm.labourDetails];
    updatedLabour[index] = {
      ...updatedLabour[index],
      [field]: value
    };
    
    if (field === 'salary') {
      updatedLabour[index].expense = value && updatedLabour[index].present ? parseInt(value) || 0 : 0;
    }
    
    if (field === 'present') {
      updatedLabour[index].expense = value ? parseInt(updatedLabour[index].salary) || 0 : 0;
    }

    setUpdateForm(prev => ({
      ...prev,
      labourDetails: updatedLabour
    }));
  };

  const addLabourField = () => {
    setUpdateForm(prev => ({
      ...prev,
      labourDetails: [...prev.labourDetails, { name: '', present: true, salary: '', role: '', expense: '' }]
    }));
  };

  const removeLabourField = (index) => {
    if (updateForm.labourDetails.length > 1) {
      setUpdateForm(prev => ({
        ...prev,
        labourDetails: prev.labourDetails.filter((_, i) => i !== index)
      }));
    }
  };

  const handleStep3Submit = () => {
    const hasLabour = updateForm.labourDetails.some(l => l.name && l.role);
    if (!hasLabour) {
      alert('Please add at least one labour detail');
      return;
    }
    
    const stockUpdates = updateForm.materialsUsed
      .filter(m => m.name && m.quantity)
      .map(material => {
        const existingStock = validateMaterialExists(material.name);
        return {
          name: material.name.toLowerCase(),
          used: parseInt(material.quantity) || 0,
          stockId: existingStock?.id // Use id consistently
        };
      });
    
    setUpdateForm(prev => ({
      ...prev,
      stockUpdates
    }));
    
    setCurrentStep(4);
  };

  // Step 4: Final Submit
  const handleFinalSubmit = async () => {
    try {
      // Validate stock quantities before proceeding
      const insufficientStocks = [];
      const stockUpdates = [];
      
      for (const material of updateForm.materialsUsed) {
        if (material.name && material.quantity) {
          const existingStock = validateMaterialExists(material.name);
          if (existingStock) {
            const currentQuantity = getCurrentStockQuantity(existingStock);
            const usedQuantity = parseInt(material.quantity) || 0;
            
            if (usedQuantity > currentQuantity) {
              insufficientStocks.push({
                name: material.name,
                available: currentQuantity,
                required: usedQuantity
              });
            } else {
              // Store the stock with both ID and current quantity for later update
              stockUpdates.push({
                name: material.name.toLowerCase(),
                used: usedQuantity,
                stockId: existingStock._id, // Use the same ID field consistently
                currentStock: existingStock
              });
              // console.log(existingStock._id)
            }
          } else {
            alert(`Material "${material.name}" not found in stocks. Please check the material name or add it to stocks first.`);
            return;
          }
        }
      }

      if (insufficientStocks.length > 0) {
        const errorMessage = insufficientStocks.map(stock => 
          `${stock.name}: Available ${stock.available}, Required ${stock.required}`
        ).join('\n');
        
        alert(`Insufficient stock quantities:\n\n${errorMessage}\n\nPlease adjust the quantities or add more stock.`);
        return;
      }

      const newEntry = {
        date: editingDate || getCurrentDate(),
        updates: updateForm.updates,
        siteImage: updateForm.siteImage,
        materialsUsed: updateForm.materialsUsed.filter(m => m.name && m.quantity),
        labourDetails: updateForm.labourDetails.filter(l => l.name && l.role),
        stockUpdates: stockUpdates
      };

      let savedEntry;
      
      if (editingId) {
        // Update existing entry
        savedEntry = await updateMaintenanceInDB(editingId, newEntry);
        setMaintenanceData(prev => 
          prev.map(entry => entry._id === editingId ? savedEntry.data : entry)
        );
      } else {
        // Create new entry
        savedEntry = await saveMaintenanceToDB(newEntry);
        setMaintenanceData(prev => [savedEntry.data, ...prev]);
      }

      // Update stock quantities in database
      const stockUpdatePromises = stockUpdates.map(async (stockUpdate) => {
        const stock = stocks.find(s => s._id === stockUpdate.stockId); // Find by id
        console.log('🔄 Processing stock update:', stockUpdate);
        console.log(stocks)
        console.log(stockUpdate)
        if (stock) {
          const currentQuantity = getCurrentStockQuantity(stock);
          const newQuantity = Math.max(0, currentQuantity - stockUpdate.used);
          console.log(`📦 Stock: ${stock.name}, Current: ${currentQuantity}, Used: ${stockUpdate.used}, New: ${newQuantity}`);
          
          const result = await updateStockQuantity(stock._id, newQuantity, stock.name); // Use stock.id
          console.log(`✅ Stock update result for ${stock.name}:`, result);
          return result;
        }
        console.log('❌ Stock not found for update:', stockUpdate);
        return false;
      });

      // Wait for all stock updates to complete
      const updateResults = await Promise.all(stockUpdatePromises);
      console.log('🎯 All stock update results:', updateResults);
      
      // Refresh ALL data including stocks
      await fetchAllData();

      // Reset form
      setShowUpdateForm(false);
      setCurrentStep(1);
      setUpdateForm({
        updates: '',
        siteImage: null,
        materialsUsed: [{ name: '', quantity: '', unit: '' }],
        labourDetails: [{ name: '', present: true, salary: '', role: '', expense: '' }],
        stockUpdates: []
      });
      setSelectedLabour('');
      setEditingId(null);
      setEditingDate(null);

      alert(editingId ? 'Maintenance entry updated successfully and stocks adjusted!' : 'Maintenance entry added successfully and stocks adjusted!');

    } catch (error) {
      console.error('❌ Error saving maintenance data:', error);
      alert('Failed to save maintenance data. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setCurrentStep(1);
    setEditingId(null);
    setEditingDate(null);
    setUpdateForm({
      updates: '',
      siteImage: null,
      materialsUsed: [{ name: '', quantity: '', unit: '' }],
      labourDetails: [{ name: '', present: true, salary: '', role: '', expense: '' }],
      stockUpdates: []
    });
    setSelectedLabour('');
  };

  const handleViewDetails = (entry, type) => {
    setSelectedEntry(entry);
    setViewMode(type);
  };

  const handleBackToList = () => {
    setSelectedEntry(null);
    setViewMode(null);
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditingDate(entry.date);
    setUpdateForm({
      updates: entry.updates,
      siteImage: entry.siteImage || null,
      materialsUsed: entry.materialsUsed.length > 0 ? entry.materialsUsed : [{ name: '', quantity: '', unit: '' }],
      labourDetails: entry.labourDetails.length > 0 ? entry.labourDetails : [{ name: '', present: true, salary: '', role: '', expense: '' }],
      stockUpdates: entry.stockUpdates || []
    });
    setShowUpdateForm(true);
    setCurrentStep(1);
    setSelectedLabour('');
  };

  // Detail View Components
  const UpdatesDetailView = ({ entry }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Work Updates</h3>
      <p className="text-gray-700 text-lg leading-relaxed">{entry.updates}</p>
      {entry.siteImage && (
        <div className="mt-4">
          <img 
            src={entry.siteImage.preview || entry.siteImage} 
            alt="Site progress" 
            className="rounded-lg max-w-full h-auto max-h-96 object-cover"
          />
        </div>
      )}
    </div>
  );

  const MaterialsDetailView = ({ entry }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Materials Used</h3>
      <div className="space-y-3">
        {entry.materialsUsed.map((material, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-800">{material.name}</span>
            <span className="text-blue-600 font-bold">
              {material.quantity} {material.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const LabourDetailView = ({ entry }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Labour Details</h3>
      <div className="space-y-4">
        {entry.labourDetails.map((labour, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-700">Name:</p>
                <p className="text-gray-900">{labour.name}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Role:</p>
                <p className="text-gray-900">{labour.role}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Salary:</p>
                <p className="text-green-600 font-bold">₹{labour.salary}/day</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Status:</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  labour.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {labour.present ? 'Present' : 'Absent'}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="font-bold text-amber-800 text-lg">
            Total Labour Expense: ₹{entry.labourDetails.reduce((sum, labour) => sum + (labour.expense || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  );

  const StocksDetailView = ({ entry }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Stock Impact</h3>
      <div className="space-y-3">
        {entry.stockUpdates.map((stock, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <span className="font-semibold text-gray-800">{stock.name}</span>
            <span className="text-red-600 font-bold">-{stock.used}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Main return with conditional rendering
  if (selectedEntry && viewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBackToList}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            ← Back to Maintenance List
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Maintenance Details - {selectedEntry.date}
            </h1>
            <p className="text-gray-600">{selectedEntry.updates}</p>
          </div>

          {viewMode === 'updates' && <UpdatesDetailView entry={selectedEntry} />}
          {viewMode === 'materials' && <MaterialsDetailView entry={selectedEntry} />}
          {viewMode === 'labour' && <LabourDetailView entry={selectedEntry} />}
          {viewMode === 'stocks' && <StocksDetailView entry={selectedEntry} />}
        </div>
      </div>
    );
  }

  return (
    <><Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 font-serif">Maintenance Progress</h1>
              <p className="text-gray-600 mt-2 text-lg">Track and manage construction activities</p>
            </div>
            <button 
              onClick={handleUpdateProcess}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-blue-500 text-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Update Process
            </button>
          </div>

          {/* Current Date Indicator */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <p className="text-blue-800 font-semibold text-lg">
              📅 Today's Date: <span className="text-blue-600">{getCurrentDate()}</span>
            </p>
            <p className="text-blue-600 text-sm mt-1">
              You can only edit entries from today's date
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600">Loading maintenance data...</div>
            </div>
          )}

          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-gray-200">
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Date</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Updates</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Materials</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Labour</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Stocks</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceData.map((entry) => (
                    <tr key={entry._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          isToday(entry.date) 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isToday(entry.date) ? '🟢 Today' : '📅'} {entry.date}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          <p className="text-gray-900 font-semibold truncate">{entry.updates}</p>
                          <button 
                            onClick={() => handleViewDetails(entry, 'updates')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1 transition-colors duration-200 flex items-center gap-1"
                          >
                            View Details
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => handleViewDetails(entry, 'materials')}
                          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 flex items-center gap-1"
                        >
                          View Materials
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => handleViewDetails(entry, 'labour')}
                          className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 flex items-center gap-1"
                        >
                          View Labour
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => handleViewDetails(entry, 'stocks')}
                          className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 flex items-center gap-1"
                        >
                          View Stocks
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        {isToday(entry.date) ? (
                          <button
                            onClick={() => handleEdit(entry)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-blue-500/25 flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm font-medium">
                            Read Only
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {maintenanceData.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No maintenance records yet</h3>
              <p className="text-gray-500">Click "Update Process" to add your first maintenance entry</p>
            </div>
          )}
        </div>
      </div>

      {/* Multi-step Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white font-serif">
                {editingId ? 'Edit Today\'s Maintenance' : 'Update Maintenance'} - Step {currentStep}/4
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {currentStep === 1 && 'Basic work updates'}
                {currentStep === 2 && 'Materials usage'}
                {currentStep === 3 && 'Labour details'}
                {currentStep === 4 && 'Review and submit'}
              </p>
              {editingDate && (
                <p className="text-blue-200 text-sm mt-2">
                  Editing entry for: {editingDate}
                </p>
              )}
            </div>
            
            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Step 1: Basic Updates */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Updates *
                    </label>
                    <textarea
                      value={updateForm.updates}
                      onChange={(e) => setUpdateForm(prev => ({ ...prev, updates: e.target.value }))}
                      placeholder="Describe the work completed today..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>
                  
                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Image (Optional)
                    </label>
                    
                    {updateForm.siteImage ? (
                      <div className="relative">
                        <img 
                          src={updateForm.siteImage.preview} 
                          alt="Site preview" 
                          className="w-full h-64 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="text-4xl mb-2 text-gray-400">📷</div>
                        <p className="text-gray-600 font-medium">Click to upload site image</p>
                        <p className="text-gray-500 text-sm mt-1">Supports JPG, PNG, GIF (Max 5MB)</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Materials Usage */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Materials Used *
                    </label>
                    <button
                      type="button"
                      onClick={addMaterialField}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Material
                    </button>
                  </div>
                  <div className="space-y-4">
                    {updateForm.materialsUsed.map((material, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <input
                          type="text"
                          value={material.name}
                          onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                          placeholder="Material name"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="number"
                          value={material.quantity}
                          onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                          placeholder="Qty"
                          className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <input
                          type="text"
                          value={material.unit}
                          onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                          placeholder="Unit"
                          className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        {updateForm.materialsUsed.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMaterialField(index)}
                            className="text-red-500 hover:text-red-700 p-3 transition-colors duration-200 text-xl"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      💡 <strong>Note:</strong> Materials will be automatically deducted from your stock inventory. 
                      Make sure material names match your stock items exactly.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Labour Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Labour Details *
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={selectedLabour}
                        onChange={handleLabourSelect}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Labour</option>
                        {labourdata.map((lab) => (
                          <option value={lab.name} key={lab._id}>
                            {lab.name} - {lab.role || 'Labour'}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={addLabourField}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Labour
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {updateForm.labourDetails.map((labour, index) => (
                      <div key={index} className="p-4 border border-gray-300 rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={labour.name}
                            onChange={(e) => handleLabourChange(index, 'name', e.target.value)}
                            placeholder="Name"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={labour.role}
                            onChange={(e) => handleLabourChange(index, 'role', e.target.value)}
                            placeholder="Role"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="number"
                            value={labour.salary}
                            onChange={(e) => handleLabourChange(index, 'salary', e.target.value)}
                            placeholder="Salary"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={labour.present}
                              onChange={(e) => handleLabourChange(index, 'present', e.target.checked)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Present</span>
                          </div>
                        </div>
                        {labour.present && labour.salary && (
                          <div className="bg-green-50 p-2 rounded">
                            <p className="text-green-700 text-sm">
                              Daily Expense: ₹{labour.expense || 0}
                            </p>
                          </div>
                        )}
                        {updateForm.labourDetails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLabourField(index)}
                            className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
                          >
                            Remove Labour
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Review Your Entry</h3>
                    <p className="text-blue-700"><strong>Date:</strong> {editingDate || getCurrentDate()}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Work Updates:</h4>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded">{updateForm.updates}</p>
                    </div>

                    {updateForm.siteImage && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Site Image:</h4>
                        <img 
                          src={updateForm.siteImage.preview} 
                          alt="Site preview" 
                          className="w-48 h-32 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Materials Used:</h4>
                      <div className="bg-blue-50 p-3 rounded">
                        {updateForm.materialsUsed.filter(m => m.name && m.quantity).map((material, index) => (
                          <p key={index} className="text-gray-600">
                            <strong>{material.quantity} {material.unit}</strong> of <strong>{material.name}</strong>
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Labour Details:</h4>
                      <div className="bg-green-50 p-3 rounded">
                        {updateForm.labourDetails.filter(l => l.name && l.role).map((labour, index) => (
                          <p key={index} className="text-gray-600">
                            <strong>{labour.name}</strong> - {labour.role} (₹{labour.salary}/day) - 
                            <span className={labour.present ? "text-green-600" : "text-red-600"}>
                              {labour.present ? ' Present' : ' Absent'}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <h4 className="font-semibold text-blue-700 mb-2">Stock Impact:</h4>
                      <p className="text-blue-700 text-sm">
                        The following materials will be deducted from your stock inventory:
                      </p>
                      <ul className="text-blue-700 text-sm mt-2 list-disc list-inside">
                        {updateForm.materialsUsed.filter(m => m.name && m.quantity).map((material, index) => (
                          <li key={index}>
                            {material.quantity} {material.unit} of {material.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-between space-x-3 border-t">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={
                      currentStep === 1 ? handleStep1Submit :
                      currentStep === 2 ? handleStep2Submit :
                      handleStep3Submit
                    }
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={handleFinalSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editingId ? 'Update Entry' : 'Add Entry'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};
export default Maintenance;