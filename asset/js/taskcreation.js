function toggleAdvanced() {
    const form = document.getElementById('advancedForm');
    form.style.display = (form.style.display === 'block') ? 'none' : 'block';
}

function toggleCategoryManager() {
    const manager = document.getElementById('categoryManager');
    manager.style.display = (manager.style.display === 'block') ? 'none' : 'block';
}

function quickAddTask() {
    const quickInput = document.getElementById('quickTaskInput');
    const name = quickInput.value.trim();
    if (!name) {
        showToast('Please enter a task name.', true);
        return;
    }
    showToast(`Task "${name}" added successfully!`);
    quickInput.value = '';
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + (isError ? 'error' : 'success');
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}


