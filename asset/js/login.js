document.getElementById('loginTitleTxt').textContent = "Task Management";

document.getElementById("togglePassword").addEventListener("click", function () {
    const password = document.getElementById("password");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.innerHTML = type === "password" ? "👁" : "✖";
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (!email || !password) {
        e.preventDefault();
        message.style.color = "red";
        message.textContent = "Please fill in all fields.";
        return;
    }
    

    if (password.length < 8) {
        e.preventDefault();
        message.style.color = "red";
        message.textContent = "Password must be at least 8 characters.";
        return;
    }
});

window.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('message');

    if (errorMessage) {
        const message = document.getElementById("message");
        message.style.color = "red";
        message.textContent = decodeURIComponent(errorMessage);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

