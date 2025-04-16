document.getElementById("togglePassword").addEventListener("click", function () {
    const password = document.getElementById("password");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.textContent = type === "password" ? "👁️" : "🙈";
  });
  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");
  
    if (!email || !password) {
      message.style.color = "red";
      message.textContent = "Please fill in all fields.";
      return;
    }
  
    if (email === "tishadalam86@gmail.com" && password === "abcd1") {
      message.style.color = "green";
      message.textContent = "Login successful!";
      alert("Login Successful!");
    } else {
      message.style.color = "red";
      message.textContent = "Invalid email or password.";
      alert("Invalid username or password!");
    }
  });
  