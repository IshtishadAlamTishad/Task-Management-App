const quickInput = document.getElementById('quickTaskInput');
const taskNameInput = document.getElementById('taskName');
const categoryList = document.getElementById('categoryList');
const categorySelect = document.getElementById('taskCategory');
const taskListsContainer = document.getElementById('taskLists');

let categories = [];
let tasks = [];

quickInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    quickAddTask();
  }
});

function quickAddTask() {
  const name = quickInput.value.trim();
  if (name) {
    tasks.push({ name, category: '' });
    renderTasks();
    showToast(`Task "${name}" added successfully!`);
    quickInput.value = '';
  } else {
    showToast('Please enter a task name.', true);
  }
}

function toggleAdvanced() {
  const form = document.getElementById('advancedForm');
  taskNameInput.value = quickInput.value.trim();
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
}

function submitDetailedForm() {
  const name = document.getElementById('taskName').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const label = document.getElementById('taskLabel').value.trim();
  const category = document.getElementById('taskCategory').value;

  if (!name) {
    showToast('Task name is required!', true);
    return false;
  }

  tasks.push({ name, desc, label, category });
  renderTasks();
  showToast(`Detailed Task "${name}" added`);
  document.getElementById('taskForm').reset();
  document.getElementById('advancedForm').style.display = 'none';
  return false;
}

function toggleCategoryManager() {
  const manager = document.getElementById('categoryManager');
  manager.style.display = (manager.style.display === 'none' || manager.style.display === '') ? 'block' : 'none';
}

function addCategory() {
  const input = document.getElementById('newCategoryInput');
  const name = input.value.trim();
  if (name && !categories.includes(name)) {
    categories.push(name);
    updateCategoryUI();
    input.value = '';
  }
}

function updateCategoryUI() {
  categorySelect.innerHTML = '<option value="">Select Category</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  categoryList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;
    categoryList.appendChild(li);
  });

  renderTasks();
}

function renderTasks() {
  taskListsContainer.innerHTML = '';
  categories.forEach(cat => {
    const container = document.createElement('div');
    const heading = document.createElement('h3');
    heading.textContent = cat;
    container.appendChild(heading);

    tasks
      .filter(t => t.category === cat)
      .forEach((task, index) => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.textContent = task.name;
        div.draggable = true;
        div.dataset.index = index;
        div.ondragstart = handleDrag;
        container.appendChild(div);
      });

    container.ondrop = handleDrop;
    container.ondragover = allowDrop;
    taskListsContainer.appendChild(container);
  });
}

function handleDrag(e) {
  e.dataTransfer.setData('taskIndex', e.target.dataset.index);
}

function allowDrop(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const index = e.dataTransfer.getData('taskIndex');
  const targetCategory = e.currentTarget.querySelector('h3').textContent;
  tasks[index].category = targetCategory;
  renderTasks();
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
