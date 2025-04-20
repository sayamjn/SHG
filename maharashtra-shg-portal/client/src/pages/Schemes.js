import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSearch, FaFilter, FaTags } from 'react-icons/fa';
import SchemeCard from '../components/schemes/SchemeCard';
import SchemeFilter from '../components/schemes/SchemeFilter';

const Schemes = () => {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    tags: []
  });
  
  // Available filter options (would typically come from API)
  const [departments, setDepartments] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  
  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSchemes: 0
  });
  
  // Fetch schemes on component mount and when filters change
  useEffect(() => {
    fetchSchemes();
  }, [filters, searchTerm, pagination.currentPage]);
  
  // Fetch schemes from API
  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = {
        page: pagination.currentPage,
        limit: 6 // Number of schemes per page
      };
      
      // Add search term if present
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      // Add department filter if selected
      if (filters.department) {
        params.department = filters.department;
      }
      
      // Add tags filter if selected
      if (filters.tags.length > 0) {
        params.tags = filters.tags.join(',');
      }
      
      // Fetch schemes
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/schemes`,
        { params }
      );
      
      setSchemes(response.data.data);
      setPagination({
        currentPage: parseInt(response.data.pagination?.next?.page - 1 || response.data.pagination?.prev?.page + 1 || 1),
        totalPages: Math.ceil(response.data.pagination?.total / response.data.pagination?.limit) || 1,
        totalSchemes: response.data.pagination?.total || response.data.count
      });
      
      // Extract unique departments and tags for filter options
      if (!departments.length || !availableTags.length) {
        const allSchemesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/schemes?limit=100`
        );
        
        // Extract departments
        const uniqueDepartments = [...new Set(
          allSchemesResponse.data.data.map(scheme => scheme.department)
        )];
        setDepartments(uniqueDepartments);
        
        // Extract tags
        const uniqueTags = [...new Set(
          allSchemesResponse.data.data.flatMap(scheme => scheme.tags)
        )];
        setAvailableTags(uniqueTags);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch schemes');
      toast.error(err.response?.data?.error || 'Failed to fetch schemes');
    }
    
    setLoading(false);
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, currentPage: 1 }); // Reset to first page when searching
  };
  
  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPagination({ ...pagination, currentPage: 1 }); // Reset to first page when filter changes
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    window.scrollTo(0, 0); // Scroll to top when changing page
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 text-center mb-8">
        {t('schemes.title')}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter sidebar */}
        <div className="lg:col-span-1">
          <SchemeFilter
            departments={departments}
            availableTags={availableTags}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Search bar */}
          <div className="mb-6">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder={t('schemes.search')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  aria-label={t('schemes.search')}
                />
              </div>
            </form>
          </div>
          
          {/* Applied filters */}
          {(filters.department || filters.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.department && (
                <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  {filters.department}
                  <button
                    onClick={() => handleFilterChange('department', '')}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                    aria-label={`Remove ${filters.department} filter`}
                  >
                    &times;
                  </button>
                </div>
              )}
              
              {filters.tags.map(tag => (
                <div
                  key={tag}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                >
                  <FaTags className="mr-1" /> {tag}
                  <button
                    onClick={() => handleFilterChange(
                      'tags',
                      filters.tags.filter(t => t !== tag)
                    )}
                    className="ml-2 text-green-600 hover:text-green-800"
                    aria-label={`Remove ${tag} tag filter`}
                  >
                    &times;
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  setFilters({ department: '', tags: [] });
                  setPagination({ ...pagination, currentPage: 1 });
                }}
                className="text-sm text-primary-600 hover:text-primary-800 underline"
              >
                {t('schemes.filters.reset')}
              </button>
            </div>
          )}
          
          {/* Loading state */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
              <p className="mt-2">{t('common.loading')}</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          ) : schemes.length > 0 ? (
            <>
              {/* Schemes grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {schemes.map(scheme => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                        pagination.currentPage === 1
                          ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t('common.previous')}
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(pagination.totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          pagination.currentPage === index + 1
                            ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                        pagination.currentPage === pagination.totalPages
                          ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t('common.next')}
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No schemes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schemes;