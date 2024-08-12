fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const countrySelect = document.getElementById('country');
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching countries:', error));

function validateForm() {
    console.log('Validating form');
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Validate First Name
    const firstName = document.getElementById('firstName').value.trim();
    if (firstName.length < 2) {
        document.getElementById('firstNameError').textContent = 'First name must be at least 2 characters long.';
        isValid = false;
    }

    // Validate Last Name
    const lastName = document.getElementById('lastName').value.trim();
    if (lastName.length < 2) {
        document.getElementById('lastNameError').textContent = 'Last name must be at least 2 characters long.';
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate Postal Code
    const postalCode = document.getElementById('postalCode').value.trim();
    if (postalCode.length < 3) {
        document.getElementById('postalCodeError').textContent = 'Please enter a valid postal code.';
        isValid = false;
    }

    // Validate Country
    if (!document.getElementById('country').value) {
        document.getElementById('countryError').textContent = 'Please select a country.';
        isValid = false;
    }

    // Validate State/Region
    const stateRegion = document.getElementById('stateRegion').value.trim();
    if (stateRegion.length < 2) {
        document.getElementById('stateRegionError').textContent = 'Please enter a valid state or region.';
        isValid = false;
    }

    // Validate Phone Number for Calls
    const phoneNumberCalls = document.getElementById('phoneNumberCalls').value.trim();
    if (phoneNumberCalls.length < 10) {
        document.getElementById('phoneNumberCallsError').textContent = 'Please enter a valid phone number.';
        isValid = false;
    }

    // Validate Phone Number for SMS
    const phoneNumberSMS = document.getElementById('phoneNumberSMS').value.trim();
    if (phoneNumberSMS.length < 10) {
        document.getElementById('phoneNumberSMSError').textContent = 'Please enter a valid phone number for SMS.';
        isValid = false;
    }

    // Validate Role
    if (!document.getElementById('role').value) {
        document.getElementById('roleError').textContent = 'Please select a role.';
        isValid = false;
    }

    // Validate Graduation Year
    if (!document.getElementById('graduationYear').value) {
        document.getElementById('graduationYearError').textContent = 'Please select a graduation year.';
        isValid = false;
    }

    // Validate Services of Interest
    const services = document.querySelectorAll('input[name="Services"]:checked');
    if (services.length === 0) {
        document.getElementById('servicesError').textContent = 'Please select at least one service of interest.';
        isValid = false;
    }

    // Validate How Did You Hear About Us
    if (!document.getElementById('howDidHearAboutUs').value) {
        document.getElementById('howDidHearAboutUsError').textContent = 'Please select how you heard about us.';
        isValid = false;
    }

    // Validate Additional Information (optional)
    const additionalInfo = document.getElementById('additionalInfo').value.trim();
    if (additionalInfo.length > 500) {
        document.getElementById('additionalInfoError').textContent = 'Additional information must be 500 characters or less.';
        isValid = false;
    }

    // Validate Agreement
    if (!document.getElementById('rememberMe').checked) {
        document.getElementById('agreementError').textContent = 'You must agree to the terms.';
        isValid = false;
    }

    console.log('Validation result:', isValid);
    return isValid;
}

document.getElementById('talktoadvisor').addEventListener('submit', function(e) {
    console.log('Form submission attempted');
    e.preventDefault();
    
    if (validateForm()) {
        console.log('Form validated successfully');
        submitForm();
    } else {
        console.log('Form validation failed');
    }
});


function submitForm() {
    const form = document.getElementById('talktoadvisor');
    const formData = new FormData(form);

    // Convert checkboxes to comma-separated string
    const services = Array.from(form.querySelectorAll('input[name="Services"]:checked')).map(cb => cb.value).join(', ');
    formData.set('Services', services);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxV198bGG0FPxMfL6aKljxVPt1bCHzdiJpPU02PLpt3vkup56AoN3w7Mcq6HYlUoGlg/exec';

    // Replace submit button with preloader
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<div class="spinner"></div> Submitting...';

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (response.ok) {
                // Hide the form
                form.style.display = 'none';
                
                // Show the success-response div
                const successResponse = document.getElementById('success-response');
                if (successResponse) {
                    successResponse.style.display = 'block';
                } else {
                    console.error('Success response element not found');
                }
            } else {
                throw new Error('Form submission failed.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        })
        .finally(() => {
            // Restore submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
}