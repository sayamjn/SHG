import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCamera, FaIdCard } from 'react-icons/fa';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
    country: 'India',
    state: 'Maharashtra',
    city: '',
    district: '',
    taluka: '',
    ward: '',
    groupCode: '',
    photo: null
  });
  
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  
  // Load districts when component mounts
  useEffect(() => {
    // This would typically fetch from an API
    setDistricts([
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
      'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
      'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
      'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
      'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
      'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ]);
  }, []);
  
  // Load talukas when district changes
  useEffect(() => {
    if (formData.district) {
      // This would typically fetch from an API based on selected district
      // For demo, using a simplified approach
      setTalukas([
        `${formData.district} Taluka 1`,
        `${formData.district} Taluka 2`,
        `${formData.district} Taluka 3`,
        `${formData.district} Taluka 4`
      ]);
    } else {
      setTalukas([]);
    }
  }, [formData.district]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files && files[0]) {
      // Handle file upload
      setFormData({ ...formData, photo: files[0] });
      
      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate group code
      const groupResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/code/${formData.groupCode}`
      );
      
      if (!groupResponse.data.success) {
        toast.error('Invalid group code');
        setLoading(false);
        return;
      }
      
      // Create form data object for file upload
      const data = new FormData();
      
      // Add all form fields to the form data
      Object.keys(formData).forEach(key => {
        if (key === 'photo' && formData[key]) {
          data.append('photo', formData[key]);
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      });
      
      // Add group ID from the group lookup
      data.append('group', groupResponse.data.data._id);
      
      // Submit registration
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (response.data.success) {
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || 'Registration failed. Please try again.'
      );
      console.error('Registration error:', err);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 text-center mb-8">
        {t('register.title')}
      </h1>
      
      <form onSubmit={handleSubmit} className="card">
        {/* Personal Information */}
        <h2 className="text-xl font-semibold text-primary-700 mb-4 pb-2 border-b">
          <FaUser className="inline mr-2" />
          {t('register.personalInfo')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="name" className="form-label">
              {t('register.name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="age" className="form-label">
              {t('register.age')} *
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="100"
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="gender" className="form-label">
              {t('register.gender')} *
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="Male">{t('register.male')}</option>
              <option value="Female">{t('register.female')}</option>
              <option value="Other">{t('register.other')}</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="phone" className="form-label">
              {t('register.phone')} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="photo" className="form-label">
              {t('register.photo')} *
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="sr-only"
                  aria-label="Upload photo"
                  required
                />
                <label
                  htmlFor="photo"
                  className="btn-secondary flex items-center cursor-pointer"
                >
                  <FaCamera className="mr-2" />
                  Select Photo
                </label>
              </div>
              
              {/* Photo Preview */}
              {photoPreview && (
                <div className="relative w-24 h-24 overflow-hidden rounded-md">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Address Information */}
        <h2 className="text-xl font-semibold text-primary-700 mb-4 pb-2 border-b">
          <FaMapMarkerAlt className="inline mr-2" />
          {t('register.address')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="form-label">
              {t('register.addressLine')} *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="country" className="form-label">
              {t('register.country')} *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field"
              readOnly
              required
            />
          </div>
          
          <div>
            <label htmlFor="state" className="form-label">
              {t('register.state')} *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input-field"
              readOnly
              required
            />
          </div>
          
          <div>
            <label htmlFor="district" className="form-label">
              {t('register.district')} *
            </label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">{t('common.select')}</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="taluka" className="form-label">
              {t('register.taluka')} *
            </label>
            <select
              id="taluka"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              className="input-field"
              required
              disabled={!formData.district}
            >
              <option value="">{t('common.select')}</option>
              {talukas.map((taluka) => (
                <option key={taluka} value={taluka}>
                  {taluka}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="city" className="form-label">
              {t('register.city')} *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="ward" className="form-label">
              {t('register.ward')}
            </label>
            <input
              type="text"
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
        
        {/* Group Information */}
        <h2 className="text-xl font-semibold text-primary-700 mb-4 pb-2 border-b">
          <FaIdCard className="inline mr-2" />
          {t('register.groupInfo')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="groupCode" className="form-label">
              {t('register.groupCode')} *
            </label>
            <input
              type="text"
              id="groupCode"
              name="groupCode"
              value={formData.groupCode}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            {t('register.cancel')}
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('register.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;