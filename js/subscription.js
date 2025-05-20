const form = document.getElementById("subform");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const checkboxes = document.querySelectorAll('input[name="prefs"]');
const successMessage = document.getElementById("successMessage");

const nameError = document.getElementById("nameerror");
const emailError = document.getElementById("emailerror");
const ageError = document.getElementById("ageerror");
const passError = document.getElementById("passerror");
const prefsError = document.getElementById("prefserror");

function clearErrorOnInput(input, errorElement){
    input.addEventListener('input', function() {
        errorElement.textContent = '';
    });
}
clearErrorOnInput(nameInput, nameError);
clearErrorOnInput(emailInput, emailError);
clearErrorOnInput(ageInput, ageError);
clearErrorOnInput(passwordInput, passError);

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        prefsError.textContent = '';
    });
});

function hideSuccessMessage(){
    successMessage.classList.remove('show');
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    nameError.textContent = '';
    emailError.textContent = '';
    ageError.textContent = '';
    passError.textContent = '';
    prefsError.textContent = '';

    let Valid = true;
    const name = form.name.value.trim();
    if(!name){
        nameError.textContent = "Name is required";
        Valid = false;
    }else if (name.length < 3){
        nameError.textContent = "Name must be at least 3 characters";
        Valid = false;
    }else{
        let hasNonLetterChars = false;
        for(let i = 0; i < name.length; i++){
            const char = name.charAt(i);
            if(!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')){
                hasNonLetterChars = true;
                break;
            }
        }
        if(hasNonLetterChars){
            nameError.textContent = "Name can only contain letters and spaces";
            Valid = false;
        }
    }

    const email = form.email.value.trim();
    if(!email){
        emailError.textContent = "Email is required";
        Valid = false;
    }else if(email.includes(" ")){
        emailError.textContent = "Email cannot contain spaces";
        Valid = false;
    }else if(!email.includes("@") || !email.includes(".") || !email.includes(".com")){
        emailError.textContent = "Please enter a valid email address (must include '@', '.', '.com').";
        Valid = false;
    }

    const age = form.age.value.trim();
    if(!age){
        ageError.textContent = "Age is required";
        Valid = false;
    }else{
        const ageNum = Number(age);
        if(isNaN(ageNum)){
            ageError.textContent = "Age must be a number";
            Valid = false;
        }else if(ageNum < 18 || ageNum > 40){
            ageError.textContent = "Age must be between 18 and 40";
            Valid = false;
        }
    }

    const password = form.password.value.trim();
    if(!password){
        passError.textContent = "Password is required";
        Valid = false;
    }else if(password.length < 8){
        passError.textContent = "Password must be at least 8 characters";
        Valid = false;
    }else{
        let hasUpper = false;
        let hasLower = false;
        let hasNumber = false;
        for(let i = 0; i < password.length; i++){
            const char = password.charAt(i);
            if(char >= 'A' && char <= 'Z'){
                hasUpper = true;
            }
            if(char >= 'a' && char <= 'z'){
                hasLower = true;
            }
            if(char >= '0' && char <= '9'){
                hasNumber = true;
            }
        }

        if(!hasUpper){
            passError.textContent = "Password must contain at least one uppercase letter";
            Valid = false;
        }else if(!hasLower){
            passError.textContent = "Password must contain at least one lowercase letter";
            Valid = false;
        }else if(!hasNumber){
            passError.textContent = "Password must contain at least one number";
            Valid = false;
        }
    }

    const checkedPrefs = document.querySelectorAll('input[name="prefs"]:checked');
    if(checkedPrefs.length === 0){
        prefsError.textContent = "Please select at least one subscription preference";
        Valid = false;
    }

    if(Valid){
        successMessage.classList.add('show');

        setTimeout(() => {
            form.reset();
            hideSuccessMessage();
        }, 3000);
    }
});