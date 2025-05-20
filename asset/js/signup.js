const uploadInput = document.getElementById('uploads');
const profileImg = document.getElementById('imgs');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');
const errorMsg = document.getElementById('msg');
const form = document.querySelector('form');

document.getElementById('upTxt').textContent = "SignUp";
profileImg.addEventListener('click', () => uploadInput.click());

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onloadend = () => {
    profileImg.src = reader.result;
  };
  reader.readAsDataURL(file);
});


const validateNotEmpty = (value, fieldName) => {
  if (!value.trim()) return `${fieldName} is required.`;
  return "";
};

const validateEmail = (email) => {

  if (!email.trim()) return "Email is required.";
  if (!email.includes('@') || !email.includes('.')) return "Email must contain '@' and '.'";
  const atPos = email.indexOf('@');
  const dotPos = email.lastIndexOf('.');
  if (atPos < 1 || dotPos < atPos + 2 || dotPos + 1 >= email.length) return "Invalid email format.";
  return "";

};

const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  
  return "";
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Confirm Password is required.";
  if (password !== confirmPassword) return "Passwords do not match.";
  
  return "";
};

const validatePhone = (phone) => {
  if (!phone.trim()) return "Phone number is required.";
  if (isNaN(phone)) return "Phone number must contain only digits.";
  if (phone.length < 10) return "Phone number must be at least 10 digits.";
  return "";
};

const validateGender = () => {
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) return "Please select your gender.";
  return "";
};

const validateProfileImage = () => {
  if (uploadInput.files.length === 0) return "Please upload a profile image.";
  return "";
};

const validateForm = () => {
  let messages = [];

  messages.push(validateNotEmpty(document.getElementById('firstname').value, "First name"));
  messages.push(validateNotEmpty(document.getElementById('lastname').value, "Last name"));
  messages.push(validateEmail(document.getElementById('email').value));
  messages.push(validatePhone(document.getElementById('phone').value));
  messages.push(validateNotEmpty(document.getElementById('dob').value, "Date of birth"));
  messages.push(validateNotEmpty(document.getElementById('address').value, "Address"));
  messages.push(validateGender());
  messages.push(validatePassword(document.getElementById('password').value));
  messages.push(validateConfirmPassword(
    document.getElementById('password').value,
    document.getElementById('confirm_password').value
  ));
  messages.push(validateProfileImage());

  messages = messages.filter(msg => msg !== "");

  if (messages.length > 0) {
    errorMsg.innerHTML = messages.join("<br>");
    errorMsg.style.color = "red";
    return false;
  }

  errorMsg.textContent = "All validations passed. Submitting form...";
  errorMsg.style.color = "green";
  return true;
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateForm()) {
    setTimeout(() => {
      form.submit();
    }, 800);
  }
});

cancelBtn.addEventListener('click', () => {
  window.location.href = "../../view/html/loginPage.html";
});
