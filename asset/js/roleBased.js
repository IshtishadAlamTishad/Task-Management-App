function updateUIBasedOnRole() {
    const role = document.getElementById('roleSelect').value;
  
    document.querySelectorAll('.admin-only,.editor-only,.user-only').forEach(el => {
      el.style.display = 'none';
    });
  
    if (role === 'admin') {
      document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
    } else if (role === 'editor') {
      document.querySelectorAll('.editor-only').forEach(el => el.style.display = 'block');
    } else if (role === 'user') {
      document.querySelectorAll('.user-only').forEach(el => el.style.display = 'block');
    }
  }
  
  window.onload = updateUIBasedOnRole;
  