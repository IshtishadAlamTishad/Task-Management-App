const upload = document.getElementById('uploads');
const img = document.getElementById('imgs');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');

document.getElementById('upTxt').innerHTML = "SignUp";

img.addEventListener('click', () => {
    upload.click();
});

upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = function () {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});


submitBtn.addEventListener('click', () => {
    window.location.href = "userPanel.html";
});

cancelBtn.addEventListener('click', () => {
    window.location.href = "loginPage.html";
});
