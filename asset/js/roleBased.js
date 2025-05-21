const users = [
  { name: "Tishad", email: "tishadAlam@outlook.com", role: "admin" },
  { name: "Rakib", email: "rakib@gmail.com", role: "editor" },
  { name: "Ronaldo", email: "ronaldo7@example.com", role: "user" },
  { name: "Benzema", email: "benzema9@example.com", role: "user" },
  { name: "Torres", email: "torres9@example.com", role: "editor" }
];

let selectedUserIndex = null;

function renderUserList(filter = "all") {
  const box = document.getElementById("userScrollBox");
  box.innerHTML = "";
  users.forEach((user, i) => {
    if (filter === "all" || user.role === filter) {
      const div = document.createElement("div");
      div.textContent = user.name + " (" + user.role + ")";
      div.onclick = () => showUserInfo(i);
      box.appendChild(div);
    }
  });
}

function showUserInfo(index) {
  selectedUserIndex = index;
  const user = users[index];
  const infoBox = document.getElementById("userDetails");
  infoBox.innerHTML = `
    <strong>Name:</strong> ${user.name}<br>
    <strong>Email:</strong> ${user.email}<br>
    <strong>Role:</strong> ${user.role}
  `;
  document.getElementById("newRole").value = user.role;
}

function updateUserRole() {
  if (selectedUserIndex === null) return;
  const newRole = document.getElementById("newRole").value;
  users[selectedUserIndex].role = newRole;
  renderUserList(document.getElementById("roleSelect").value);
  showUserInfo(selectedUserIndex);
}

function filterUsersByRole() {
  const role = document.getElementById("roleSelect").value;
  renderUserList(role);
}

window.onload = () => renderUserList();
