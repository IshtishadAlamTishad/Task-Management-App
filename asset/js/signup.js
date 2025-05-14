const upload = document.getElementById('uploads');
const img = document.getElementById('imgs');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');
const errorElement = document.getElementById('error');

document.getElementById('upTxt').innerHTML = "SignUp";

img.addEventListener('click',() => {
    upload.click();
});

upload.addEventListener('change',function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = function () {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();  

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cPass = document.getElementById('confirm_password').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const profileImage = document.getElementById('uploads').files.length;

    if(!firstname || !lastname || !email || !phone || !dob || !address || !gender || !password || !cPass) {
        errorElement.innerHTML = 'All fields are required.';
        e.preventDefault();
        return;
    }
    if(password.length <8 ) {
        errorElement.innerHTML = "Weak Password";
        e.preventDefault();
        return;
    }
    if(password !== cPass) {
        errorElement.innerHTML = "Password didn't matched";
        e.preventDefault();
        return;
    }
    if(email.indexOf('@') === -1) {
        errorElement.innerHTML = "Please enter a valid email address";
        e.preventDefault();
        return;
    }
    if(isNaN(phone) || phone.length < 10) {
        errorElement.innerHTML = "Please enter a valid phone number";
        e.preventDefault();
        return;
    }
    if(!gender) {
        errorElement.innerHTML = "Please select your gender.";
        e.preventDefault();
        return;
    }
    if(profileImage === 0) {
        alert("Please upload a profile image.");
        return;
    }

    document.querySelector('form').submit();  
});

cancelBtn.addEventListener('click', () => {
    window.location.href = "../../view/html/loginPage.html";
});
