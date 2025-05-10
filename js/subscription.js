const form = document.getElementById("subform");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const checkboxes = document.querySelectorAll('input[name="prefs"]');

const nameError = document.getElementById("nameerror");
const emailError = document.getElementById("emailerror");
const ageError = document.getElementById("ageerror");
const passError = document.getElementById("passerror");
const prefsError = document.getElementById("prefserror");

function clearErrorOnInput(input, errorElement) {
    input.addEventListener('input', function() {
        errorElement.textContent = '';
    });
}

clearErrorOnInput(nameInput, nameError);
clearErrorOnInput(emailInput, emailError);
clearErrorOnInput(ageInput, ageError);
clearErrorOnInput(passwordInput, passError);

// Clear preferences error when any checkbox is clicked
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        prefsError.textContent = '';
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = '';
    emailError.textContent = '';
    ageError.textContent = '';
    passError.textContent = '';
    prefsError.textContent = '';
    
    let isValid = true;

    const name = form.name.value.trim();
    if (!name) {
        nameError.textContent = "Name is required";
        isValid = false;
    } else if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
        isValid = false;
    } else{
        let hasNonLetterChars = false;

        for (let i = 0; i < name.length; i++) {
            const char = name.charAt(i);
            if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')) {
                hasNonLetterChars = true;
                break;
            }
        }

        if (hasNonLetterChars) {
            nameError.textContent = "Name can only contain letters and spaces";
            isValid = false;
        }
    }

    const email = form.email.value.trim();
    if (!email) {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (email.includes(" ")) {
        emailError.textContent = "Email cannot contain spaces";
        isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    }

    const age = form.age.value.trim();
    if (!age) {
        ageError.textContent = "Age is required";
        isValid = false;
    } else {
        const ageNum = Number(age);
        if (isNaN(ageNum)) {
            ageError.textContent = "Age must be a number";
            isValid = false;
        } else if (ageNum < 18 || ageNum > 40) {
            ageError.textContent = "Age must be between 18 and 40";
            isValid = false;
        }
    }

    const password = form.password.value.trim();
    if (!password) {
        passError.textContent = "Password is required";
        isValid = false;
    } else if (password.length < 8) {
        passError.textContent = "Password must be at least 8 characters";
        isValid = false;
    } else {
        let hasUppercase = false;
        let hasLowercase = false;
        let hasNumber = false;
        
        for (let i = 0; i < password.length; i++) {
            const char = password.charAt(i);
            if (char === char.toUpperCase() && char !== char.toLowerCase()) {
                hasUppercase = true;
            }
            if (char === char.toLowerCase() && char !== char.toUpperCase()) {
                hasLowercase = true;
            }
            if (char >= '0' && char <= '9') {
                hasNumber = true;
            }
        }
        
        if (!hasUppercase) {
            passError.textContent = "Password must contain at least one uppercase letter";
            isValid = false;
        } else if (!hasLowercase) {
            passError.textContent = "Password must contain at least one lowercase letter";
            isValid = false;
        } else if (!hasNumber) {
            passError.textContent = "Password must contain at least one number";
            isValid = false;
        }
    }

    const checkedPrefs = document.querySelectorAll('input[name="prefs"]:checked');
    if (checkedPrefs.length === 0) {
        prefsError.textContent = "Please select at least one subscription preference";
        isValid = false;
    }

    if (isValid) {
        const successMessage = document.createElement('div');
        successMessage.textContent = "Thank you for subscribing!";
        successMessage.style.color = "#27ae60";
        successMessage.style.fontSize = "1.2rem";
        successMessage.style.textAlign = "center";
        successMessage.style.marginTop = "1rem";
        
        form.appendChild(successMessage);

        setTimeout(() => {
            form.reset();
            successMessage.remove();
        }, 1000);
    }
});