// validation.js
// Purpose: Client-side form validation helpers
// Provides reusable validation functions with user-friendly error messages

export function validateRequired(value, fieldName = "This field") {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateEmail(email) {
  if (!email || email.trim() === "") {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}

export function validateUsername(username) {
  if (!username || username.trim() === "") {
    return "Username is required";
  }
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  if (username.length > 20) {
    return "Username must be less than 20 characters";
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return "Username can only contain letters, numbers, hyphens, and underscores";
  }
  return null;
}

export function validateAge(age) {
  if (!age) {
    return "Age is required";
  }
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum)) {
    return "Age must be a number";
  }
  if (ageNum < 1 || ageNum > 18) {
    return "Age must be between 1 and 18";
  }
  return null;
}

export function validateDate(dateStr, fieldName = "Date") {
  if (!dateStr || dateStr.trim() === "") {
    return `${fieldName} is required`;
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return `Please enter a valid ${fieldName.toLowerCase()}`;
  }
  return null;
}

export function validateTime(timeStr) {
  if (!timeStr || timeStr.trim() === "") {
    return "Time is required";
  }
  // HH:MM format
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(timeStr)) {
    return "Please enter time in HH:MM format (e.g., 09:30)";
  }
  return null;
}

export function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    return null; // Phone is optional
  }
  // Basic phone validation - allows various formats
  const phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number";
  }
  if (phone.replace(/\D/g, "").length < 10) {
    return "Phone number must be at least 10 digits";
  }
  return null;
}

export function validateLength(value, fieldName, min, max) {
  if (!value) {
    return `${fieldName} is required`;
  }
  if (min && value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (max && value.length > max) {
    return `${fieldName} must be less than ${max} characters`;
  }
  return null;
}

// Multi-field validation
export function validateForm(fields) {
  const errors = {};
  let hasErrors = false;

  for (const [fieldName, validator] of Object.entries(fields)) {
    const error = validator();
    if (error) {
      errors[fieldName] = error;
      hasErrors = true;
    }
  }

  return hasErrors ? errors : null;
}
