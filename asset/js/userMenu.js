function showContent(page) {
  document.getElementById("contentFrame").src = page;
}

function logout() {
  alert("Logging out!");
  window.location.href = "loginPage.html";
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}
