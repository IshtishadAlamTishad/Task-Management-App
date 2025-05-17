const upload = document.getElementById('uploads');
const img = document.getElementById('imgs');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');
const er = document.getElementById('msg');

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
        er.innerHTML = 'All fields are required.';
        er.style.color = "red";
        e.preventDefault();
        return;
    }else if(password.length <8 ) {
        er.innerHTML = "Weak Password";
        er.style.color = "red";
        e.preventDefault();
        return;

    }else if(password !== cPass) {
        er.innerHTML = "Password didn't matched";
        er.style.color = "red";
        e.preventDefault();
        return;
    }
    else if(email.indexOf('@') === -1) {
        er.innerHTML = "Please enter a valid email address";
        er.style.color = "red";
        e.preventDefault();
        return;
    } else if(isNaN(phone) || phone.length < 10) {
        er.innerHTML = "Please enter a valid phone number";
        er.style.color = "red";
        e.preventDefault();
        return;
    }else if(!gender) {
        er.innerHTML = "Please select your gender.";
        er.style.color = "red";
        e.preventDefault();
        return;
    } else if(profileImage === 0) {
        er.innerHtml="Please upload a profile image.";
        er.style.color = "red";
        return;
    } else {
        er.innerHTML = "All validations passed. Submitting form...";
        er.style.color = "green";

        setTimeout(() => {
            document.querySelector('form').submit();
        }, 800);
    }
    
    
});

cancelBtn.addEventListener('click', () => {
    window.location.href = "../../view/html/loginPage.html";
});
