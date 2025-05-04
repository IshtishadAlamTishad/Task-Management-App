const quickInput = document.getElementById('quickTaskInput');
const taskNameInput = document.getElementById('taskName');

quickInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    quickAddTask();
  }
});

function quickAddTask() {
  if (quickInput.value.trim() !== '') {
    showToast(`Task "${quickInput.value.trim()}" added successfully!`);
    quickInput.value = '';
  } else {
    showToast('Please enter a task name.', true);
  }
}

function toggleAdvanced() {
  const form = document.getElementById('advancedForm');
  if (form.style.display === 'none' || form.style.display === '') {
    taskNameInput.value = quickInput.value.trim(); 
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

function submitDetailedForm() {
  const name = document.getElementById('taskName').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const label = document.getElementById('taskLabel').value.trim();

  if (!name) {
    showToast('Task name is required!', true);
    return false;
  }

  showToast(`Detailed Task "${name}" added with labels: ${label || 'none'}`);
  document.getElementById('taskForm').reset();
  document.getElementById('advancedForm').style.display = 'none';
  return false; 
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.backgroundColor = isError ? '#e74c3c' : '#3498db';
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}
