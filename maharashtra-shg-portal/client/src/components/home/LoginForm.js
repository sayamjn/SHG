import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FaLock, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
  const { t } = useTranslation();
  const { login, loading, error } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    groupCode: '',
    password: ''
  });
  
  const { groupCode, password } = formData;
  
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!groupCode || !password) {
      toast.error('Please enter both group code and password');
      return;
    }
    
    try {
      await login(groupCode, password);
    } catch (err) {
      console.error('Login error:', err);
    }
  };
  
  // Display error message if login fails
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Group Code */}
      <div>
        <label htmlFor="groupCode" className="form-label">
          {t('home.groupCode')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <FaUserAlt />
          </div>
          <input
            type="text"
            id="groupCode"
            name="groupCode"
            value={groupCode}
            onChange={handleChange}
            className="input-field pl-10"
            placeholder="Enter your group code"
            required
          />
        </div>
      </div>
      
      {/* Password */}
      <div>
        <label htmlFor="password" className="form-label">
          {t('home.password')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <FaLock />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="input-field pl-10"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      
      {/* Forgot Password Link */}
      <div className="text-right">
        <a 
          href="#!" 
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          {t('home.forgotPassword')}
        </a>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary w-full flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('common.loading')}
          </span>
        ) : (
          <span className="flex items-center">
            <FaSignInAlt className="mr-2" />
            {t('home.login')}
          </span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;