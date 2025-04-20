import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus, FaArrowRight } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/home/LoginForm';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, group } = useContext(AuthContext);
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/details');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
            {t('home.welcome')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.intro')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Login Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              {t('home.login')}
            </h2>
            <LoginForm />
          </div>

          {/* Register Section */}
          <div className="card bg-primary-50">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">
              {t('register.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              Register as a new member of an existing Self Help Group. You'll need your group code to complete the registration.
            </p>
            <Link 
              to="/register" 
              className="btn-primary flex items-center justify-center w-full"
            >
              <FaUserPlus className="mr-2" /> {t('home.register')}
            </Link>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary-700 mb-6 text-center">
            Featured Government Schemes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="card hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-primary-600 mb-2">
                  Scheme {item}
                </h3>
                <p className="text-gray-600 mb-4">
                  Short description of the government scheme and its benefits for SHGs.
                </p>
                <Link 
                  to="/schemes" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  Learn More <FaArrowRight className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;