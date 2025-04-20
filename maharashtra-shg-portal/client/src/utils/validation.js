// Email validation using regex
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  // Phone number validation for Indian numbers
  export const isValidPhone = (phone) => {
    // Allow +91 prefix or start with 6-9
    const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };
  
  // Min and max length validation
  export const isValidLength = (value, min, max) => {
    const length = value.trim().length;
    return length >= min && length <= max;
  };
  
  // Number range validation
  export const isInRange = (value, min, max) => {
    const num = Number(value);
    return num >= min && num <= max;
  };
  
  // Validate file size in MB
  export const isValidFileSize = (file, maxSizeMB) => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
  };
  
  // Validate file type
  export const isValidFileType = (file, acceptedTypes) => {
    // Get file extension from file name
    const extension = file.name.split('.').pop().toLowerCase();
    return acceptedTypes.includes(extension);
  };
  
  // Validate image file (for photo upload)
  export const isValidImage = (file) => {
    const acceptedTypes = ['jpg', 'jpeg', 'png'];
    const maxSizeMB = 5; // 5MB limit
    
    return isValidFileType(file, acceptedTypes) && isValidFileSize(file, maxSizeMB);
  };
  
  // Validate login form
  export const validateLoginForm = (data) => {
    const errors = {};
    
    if (!data.groupCode) {
      errors.groupCode = 'Group code is required';
    }
    
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!isValidLength(data.password, 6, 50)) {
      errors.password = 'Password must be between 6 and 50 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Validate registration form
  export const validateRegistrationForm = (data) => {
    const errors = {};
    
    // Required fields
    const requiredFields = [
      'name', 'age', 'gender', 'phone', 'address',
      'country', 'state', 'city', 'district', 'taluka', 'groupCode'
    ];
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // Specific validations
    if (data.name && !isValidLength(data.name, 3, 50)) {
      errors.name = 'Name must be between 3 and 50 characters';
    }
    
    if (data.age && !isInRange(data.age, 18, 100)) {
      errors.age = 'Age must be between 18 and 100';
    }
    
    if (data.phone && !isValidPhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (data.email && !isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Check if photo is provided and valid
    if (!data.photo) {
      errors.photo = 'Photo is required';
    } else if (!isValidImage(data.photo)) {
      errors.photo = 'Please upload a valid image (JPG, JPEG, PNG) under 5MB';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Format validation errors for display
  export const formatErrors = (errors) => {
    if (typeof errors === 'string') return errors;
    
    if (Array.isArray(errors)) {
      return errors.map(err => err.msg || err.message || err).join(', ');
    }
    
    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }
    
    return 'An unknown error occurred';
  };