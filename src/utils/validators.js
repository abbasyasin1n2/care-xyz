// Password validation
export function validatePassword(password) {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  return {
    isValid: errors.length === 0,
    errors
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
  return nidRegex.test(nid);
}

// Phone validation (Bangladesh format)
export function validatePhone(phone) {
  const phoneRegex = /^(\+?880|0)?1[3-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
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
