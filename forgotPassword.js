document.getElementById("fpForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const input = document.getElementById("fpInput").value.trim();
    const message = document.getElementById("fpMessage");
  
    if (!input) {
      message.style.color = "red";
      message.textContent = "Please enter your email or phone number.";
      return;
    }
  
    message.style.color = "green";
    message.textContent = "Password reset link has been sent!";
    alert("Check your email or phone for reset instructions.");
  });
  