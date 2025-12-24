// Password validation
export function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Password must be at least 8 characters'
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter'
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter'
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one number'
    };
  }
  
  return {
    isValid: true,
    error: null
  };
}

// Email validation
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// NID validation (Bangladesh NID is 10, 13, or 17 digits)
export function validateNID(nid) {
  const nidRegex = /^(\d{10}|\d{13}|\d{17})$/;
  const isValid = nidRegex.test(nid);
  
  return {
    isValid,
    error: isValid ? null : 'NID must be 10, 13, or 17 digits'
  };
}

// Phone validation (Bangladesh format)
export function validatePhone(phone) {
  const phoneRegex = /^(\+?880|0)?1[3-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Phone validation with error message
export function validatePhoneNumber(phone) {
  const phoneRegex = /^(\+?880|0)?1[3-9]\d{8}$/;
  const isValid = phoneRegex.test(phone.replace(/\s/g, ''));
  
  return {
    isValid,
    error: isValid ? null : 'Invalid Bangladesh phone number (e.g., 01XXXXXXXXX)'
  };
}

// Registration form validation
export function validateRegistrationForm(formData) {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!formData.nid || !validateNID(formData.nid)) {
    errors.nid = 'Invalid NID number (must be 10, 13, or 17 digits)';
  }
  
  if (!formData.contact || !validatePhone(formData.contact)) {
    errors.contact = 'Invalid phone number';
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
