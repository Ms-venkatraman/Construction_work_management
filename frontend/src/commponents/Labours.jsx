import React, {useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Labour = () => {
  const [labourdetail, setLabourdetail] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [deletelabour, setDeletelabour] = useState(false)
  
  const fetchlabour= async ()=>{
      const labour=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getlabour`)
      setLabourdetail(labour.data.data)
  }
  useEffect(()=>{
    fetchlabour()
  },[editingId])
  useEffect(()=>{
    fetchlabour()
  },[deletelabour])

  const [addForm, setAddForm] = useState({
    name: "",
    age: "",
    mobile: "",
    gender: "Male",
    address: "",
    role: "",
    image: "https://tse1.mm.bing.net/th/id/OIP.UsFoyqTOF-S8HAJj76eXLgAAAA?w=413&h=400&rs=1&pid=ImgDetMain&o=7&rm=3"
  });
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    mobile: "",
    gender: "Male",
    address: "",
    role: "",
    image: ""
  });

  const handellabour = () => {
    setShowAddForm(true);
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

  const handleNewAddLabour =async () => {
    if (!addForm.name || !addForm.age || !addForm.mobile || !addForm.address || !addForm.role) {
      alert("Please fill all required fields");
      return;
    }
    const newLabour ={
      id:crypto.randomUUID(),
      name: addForm.name,
      age: parseInt(addForm.age),
      mobile: addForm.mobile,
      gender: addForm.gender,
      address: addForm.address,
      role: addForm.role,
      image: addForm.image,
    };
    try {
    const adddb=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/addlabour`,newLabour)
    setLabourdetail([...labourdetail, newLabour]);
    setAddForm({
      name: "",
      age: "",
      mobile: "",
      gender: "Male",
      address: "",
      role: "",
      image: "https://tse1.mm.bing.net/th/id/OIP.UsFoyqTOF-S8HAJj76eXLgAAAA?w=413&h=400&rs=1&pid=ImgDetMain&o=7&rm=3"
    });
    setShowAddForm(false);
    alert("New labour added:", newLabour.name);
     } catch (error) {
      
      alert('Mobile number Already Exist!!!')
    }
  };

  const handleEdit = (labour) => {
    setEditingId(labour.id);
    setEditForm({
      name: labour.name,
      age: labour.age,
      mobile: labour.mobile,
      gender: labour.gender,
      address: labour.address,
      role: labour.role,
      image: labour.image
    });
  };

  const handleSaveEdit =async (id) => {
    if (!editForm.name || !editForm.age || !editForm.mobile || !editForm.address || !editForm.role) {
      alert("Please fill all required fields");
      return;
    }
    
    const updatedLabour = {
      id: id,
      name: editForm.name,
      age: parseInt(editForm.age),
      mobile: editForm.mobile,
      gender: editForm.gender,
      address: editForm.address,
      role: editForm.role,
      image: editForm.image,
    };

    const updatedLabours = labourdetail.map(labour => 
      labour.id === id ? updatedLabour : labour
    );

    setLabourdetail(updatedLabours);
    setEditingId(null);
    setEditForm({
      name: "",
      age: "",
      mobile: "",
      gender: "Male",
      address: "",
      role: "",
      image: ""
    });
    const update=await axios.put(`${import.meta.env.VITE_API_URL}/api/user/editlabour`,updatedLabour)
    console.log(update)
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      age: "",
      mobile: "",
      gender: "Male",
      address: "",
      role: "",
      image: ""
    });
  };

  const handleDelete =async (id) => {
    try {
      const confirmdelete=confirm("confirm to delete labour")
      setDeletelabour(confirmdelete)
      if(confirmdelete){
      const deletelabour= await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/deletelabour/${id}`); 
      setDeletelabour(!confirmdelete)
      }
      else{
        console.log("cancel to delete")
      }
      
    } catch (error) {
      console.log("something error: ",error.message)
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setAddForm({
      name: "",
      age: "",
      mobile: "",
      gender: "Male",
      address: "",
      role: "",
      image: "https://tse1.mm.bing.net/th/id/OIP.UsFoyqTOF-S8HAJj76eXLgAAAA?w=413&h=400&rs=1&pid=ImgDetMain&o=7&rm=3"
    });
  };

  // Filter labour based on search term and selected role
const filteredLabour = labourdetail.filter(labour => {
  const matchesSearch = 
    (labour.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (labour.role?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (labour.address?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  
  const matchesRole = selectedRole === 'All' || labour.role === selectedRole;
  
  return matchesSearch && matchesRole;
});
  // Get unique roles for filter dropdown
  const uniqueRoles = ['All', ...new Set(labourdetail.map(labour => labour.role))];

  return (
    <><Navbar/>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our <span className="text-blue-600">Labour Team</span>
              </h2>
              <p className="text-gray-600 mt-1 text-sm">Skilled professionals building your dreams</p>
            </div>
            <button onClick={handellabour} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-200 text-sm">
              + Add Labour
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Labour
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, role, or address..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Role
                </label>
                <select
                  // value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {uniqueRoles.map((role,id) => (
                    <option key={id} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-3 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredLabour.length} of {labourdetail.length} labours
              </p>
              {(searchTerm || selectedRole !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedRole('All');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Labour Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          
          {/* Labour Cards */}
          {filteredLabour.map((labour,id) => (
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group" key={id}>
              <div className="p-5">
                {/* Centered Image and Name Section */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-3">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={labour.image} 
                        alt={labour.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-lg font-bold text-gray-800">{labour.name}</h1>
                    <span className={`inline-block ${labour.roleColor || 'bg-amber-500'} text-white text-xs font-medium px-3 py-1 rounded-full mt-1`}>
                      {labour.role}
                    </span>
                  </div>
                </div>
                
                {/* Details Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Age</span>
                    <span className="font-medium text-gray-800">{labour.age}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Mobile</span>
                    <span className="font-medium text-gray-800 text-xs">{labour.mobile}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Gender</span>
                    <span className="font-medium text-gray-800">{labour.gender}</span>
                  </div>
                  <div className="pt-2 border-t min-h-20 overflow-hidden border-gray-100">
                    <span className="text-gray-600 text-sm block mb-1">Address</span>
                    <span className="font-medium text-gray-800 text-wrap text-sm leading-tight">{labour.address}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(labour)}
                    className="flex-1 bg-white border border-green-500 text-green-600 font-medium py-2 px-3 rounded-lg text-xs transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-inner hover:shadow-green-200 hover:bg-green-50"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(labour.id)}
                    className="flex-1 bg-white border border-red-500 text-red-600 font-medium py-2 px-3 rounded-lg text-xs transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-inner hover:shadow-red-200 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredLabour.length === 0 && (
          <div className="max-w-7xl mx-auto text-center py-12">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No labours found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedRole !== 'All' 
                  ? "Try adjusting your search or filter criteria"
                  : "No labours added yet. Add your first labour to get started."
                }
              </p>
              {labourdetail.length === 0 && (
                <button 
                  onClick={handellabour}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
                >
                  Add First Labour
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Labour Popup Form */}
      {showAddForm && (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-t-2xl sticky top-0">
              <h2 className="text-2xl font-bold text-white">Add New Labour</h2>
              <p className="text-blue-100 text-sm mt-1">Fill in the labour details</p>
            </div>
            
            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={addForm.name}
                  onChange={handleAddFormChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={addForm.age}
                    onChange={handleAddFormChange}
                    placeholder="Age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={addForm.gender}
                    onChange={handleAddFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={addForm.mobile}
                  onChange={handleAddFormChange}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={addForm.role}
                  onChange={handleAddFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Role</option>
                  <option value="Mason">Mason</option>
                  <option value="Helper">Helper</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Painter">Painter</option>
                  <option value="Welder">Welder</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={addForm.address}
                  onChange={handleAddFormChange}
                  placeholder="Enter full address"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={addForm.image}
                  onChange={handleAddFormChange}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                    <img 
                      src={addForm.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://tse1.mm.bing.net/th/id/OIP.UsFoyqTOF-S8HAJj76eXLgAAAA?w=413&h=400&rs=1&pid=ImgDetMain&o=7&rm=3";
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{addForm.name || "Name"}</p>
                    <p className="text-sm text-gray-600">{addForm.role || "Role"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3 border-t">
              <button
                onClick={handleCloseAddForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleNewAddLabour}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Add New Labour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Labour Popup Form */}
      {editingId && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 rounded-t-2xl sticky top-0">
              <h2 className="text-2xl font-bold text-white">Edit Labour</h2>
              <p className="text-green-100 text-sm mt-1">Update labour details</p>
            </div>
            
            {/* Form */}
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={editForm.age}
                    onChange={handleEditFormChange}
                    placeholder="Age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={editForm.mobile}
                  onChange={handleEditFormChange}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Role</option>
                  <option value="Mason">Mason</option>
                  <option value="Helper">Helper</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Painter">Painter</option>
                  <option value="Welder">Welder</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleEditFormChange}
                  placeholder="Enter full address"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={editForm.image}
                  onChange={handleEditFormChange}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3 border-t">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEdit(editingId)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default Labour;