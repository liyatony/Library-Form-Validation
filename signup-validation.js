// Signup Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const username = document.querySelector('input[name="username"]');
    const email = document.querySelector('input[name="email"]');
    const password = document.querySelector('input[name="password"]');
    const confirmPassword = document.querySelector('input[name="confirm_password"]');
    
    // Create password strength indicator
    const strengthIndicator = document.createElement('div');
    strengthIndicator.id = 'password-strength';
    strengthIndicator.style.cssText = 'margin-top: 5px; padding: 5px; border-radius: 3px; font-size: 12px; text-align: center; display: none;';
    password.parentNode.insertBefore(strengthIndicator, password.nextSibling);
    
    // Create error message containers
    function createErrorElement(input) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.cssText = 'color: red; font-size: 12px; display: block; margin-top: 3px;';
        input.parentNode.insertBefore(error, input.nextSibling);
        return error;
    }
    
    const usernameError = createErrorElement(username);
    const emailError = createErrorElement(email);
    const passwordError = createErrorElement(password);
    password.parentNode.insertBefore(strengthIndicator, passwordError);
    const confirmPasswordError = createErrorElement(confirmPassword);
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Password validation
    function validatePassword(pass) {
        const minLength = pass.length >= 8;
        const hasUpperCase = /[A-Z]/.test(pass);
        const hasLowerCase = /[a-z]/.test(pass);
        const hasNumber = /[0-9]/.test(pass);
        
        return {
            isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
            minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumber
        };
    }
    
    // Password strength checker
    function checkPasswordStrength(pass) {
        let strength = 0;
        
        if (pass.length >= 8) strength++;
        if (pass.length >= 12) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^a-zA-Z0-9]/.test(pass)) strength++;
        
        if (strength <= 2) {
            return { level: 'Poor', color: '#dc3545', bgColor: '#f8d7da' };
        } else if (strength <= 4) {
            return { level: 'Medium', color: '#fd7e14', bgColor: '#fff3cd' };
        } else {
            return { level: 'Strong', color: '#28a745', bgColor: '#d4edda' };
        }
    }
    
    // Real-time password validation
    password.addEventListener('input', function() {
        const pass = this.value;
        const validation = validatePassword(pass);
        
        if (pass.length === 0) {
            passwordError.textContent = '';
            strengthIndicator.style.display = 'none';
            return;
        }
        
        strengthIndicator.style.display = 'block';
        const strength = checkPasswordStrength(pass);
        strengthIndicator.textContent = `Password Strength: ${strength.level}`;
        strengthIndicator.style.backgroundColor = strength.bgColor;
        strengthIndicator.style.color = strength.color;
        strengthIndicator.style.fontWeight = 'bold';
        
        if (!validation.isValid) {
            let errors = [];
            if (!validation.minLength) errors.push('at least 8 characters');
            if (!validation.hasUpperCase) errors.push('one uppercase letter');
            if (!validation.hasLowerCase) errors.push('one lowercase letter');
            if (!validation.hasNumber) errors.push('one number');
            
            passwordError.textContent = `Password must contain ${errors.join(', ')}`;
        } else {
            passwordError.textContent = '';
        }
    });
    
    // Email validation on blur
    email.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    // Username validation
    username.addEventListener('blur', function() {
        if (this.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
        } else {
            usernameError.textContent = '';
        }
    });
    
    // Confirm password validation
    confirmPassword.addEventListener('input', function() {
        if (this.value !== password.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
        } else {
            confirmPasswordError.textContent = '';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate username
        if (username.value.length < 3) {
            usernameError.textContent = 'Username must be at least 3 characters';
            isValid = false;
        } else {
            usernameError.textContent = '';
        }
        
        // Validate email
        if (!validateEmail(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Validate password
        const passValidation = validatePassword(password.value);
        if (!passValidation.isValid) {
            let errors = [];
            if (!passValidation.minLength) errors.push('at least 8 characters');
            if (!passValidation.hasUpperCase) errors.push('one uppercase letter');
            if (!passValidation.hasLowerCase) errors.push('one lowercase letter');
            if (!passValidation.hasNumber) errors.push('one number');
            
            passwordError.textContent = `Password must contain ${errors.join(', ')}`;
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        // Validate confirm password
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            // Uncomment the line below to actually submit the form
            // form.submit();
        }
    });
});