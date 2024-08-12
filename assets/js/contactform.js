document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      showSpinner();
      
      var formData = new FormData(this);
      
      fetch('https://script.google.com/macros/s/AKfycbwTt9xO94ZpB90LA8u_WotQUQkBgR6kZqBwvBI4L4ifbi-BRodzH_4PR2kJ9GEwlPGilA/exec', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(result => {
        console.log('Success:', result);
        hideSpinner();
        document.getElementById('myForm').style.display = 'none';
        document.getElementById('success-response').style.display = 'block';
      })
      .catch(error => {
        console.error('Error:', error);
        hideSpinner();
        alert('An error occurred. Please try again later.');
      });
    }
  });
  
  function validateForm() {
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('your-name');
    if (name.value.trim() === '') {
      showError('name-error', 'Name is required');
      isValid = false;
    } else {
      clearError('name-error');
    }
    
    // Email validation
    const email = document.getElementById('your-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError('email-error', 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError('email-error');
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (message.value.trim().length < 10) {
      showError('message-error', 'Message must be at least 10 characters long');
      isValid = false;
    } else {
      clearError('message-error');
    }
    
    return isValid;
  }
  
  function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  function clearError(id) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  function showSpinner() {
    document.querySelector('#myForm button[type="submit"]').innerHTML = '<div class="spinner"></div>';
  }

  function hideSpinner() {
    document.querySelector('#myForm button[type="submit"]').innerHTML = '<span class="color-white fw-600">Send Now</span>';
  }