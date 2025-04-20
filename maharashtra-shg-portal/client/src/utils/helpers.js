// Format date for display
export const formatDate = (dateString, format = 'medium') => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const options = {
      short: { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      },
      medium: { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      },
      long: { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      },
      time: { 
        hour: '2-digit', 
        minute: '2-digit' 
      },
      full: { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
    };
    
    return new Intl.DateTimeFormat('en-IN', options[format]).format(date);
  };
  
  // Format number as currency (Indian Rupee)
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Format file size
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
  
  // Generate options for select dropdowns
  export const generateOptions = (items, valueKey = null, labelKey = null) => {
    if (!items || !Array.isArray(items)) return [];
    
    return items.map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        return { value: item, label: item };
      }
      
      if (typeof item === 'object') {
        return {
          value: valueKey ? item[valueKey] : item.id || item._id,
          label: labelKey ? item[labelKey] : item.name || item.title
        };
      }
      
      return null;
    }).filter(Boolean);
  };
  
  // Debounce function for search inputs
  export const debounce = (func, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  // Get error message from API response
  export const getErrorMessage = (error) => {
    if (!error) return 'An unknown error occurred';
    
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      const responseData = error.response.data;
      
      if (responseData.error) {
        return responseData.error;
      }
      
      if (responseData.errors && Array.isArray(responseData.errors)) {
        return responseData.errors.map(err => err.msg || err.message).join(', ');
      }
      
      if (responseData.message) {
        return responseData.message;
      }
      
      return `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      return 'No response from server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request
      return error.message || 'An error occurred. Please try again.';
    }
  };