const quickInput = document.getElementById('quickTaskInput');
const expandBtn = document.getElementById('expandFormBtn');
const advancedForm = document.getElementById('advancedForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

quickInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const task = quickInput.value.trim();
    if (task !== '') {
      addTaskToList(task);
      quickInput.value = '';
    }
  }
});


expandBtn.addEventListener('click', () => {
  advancedForm.classList.toggle('hidden');
});

addTaskBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const label = document.getElementById('taskLabel').value.trim();
  const dueDate = document.getElementById('dueDate').value;
  const dueTime = document.getElementById('dueTime').value;

  if (title !== '') {
    const formatted = `${title} ${desc ? `- ${desc}` : ''} ${label ? `[${label}]` : ''}`;
    addTaskToList(formatted, dueDate, dueTime);
    clearAdvancedForm();
  }
});

function addTaskToList(taskText, dueDate, dueTime) {
  const li = document.createElement('li');
  const dueDateTime = new Date(`${dueDate}T${dueTime}`);
  const currentDateTime = new Date();

  li.textContent = `${taskText} - Due: ${dueDate} ${dueTime}`;

  if (dueDateTime < currentDateTime) {
    li.classList.add('overdue'); 
  } else {
    li.classList.add('upcoming'); 
  }

  taskList.appendChild(li);
}

function clearAdvancedForm() {
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskLabel').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('dueTime').value = '';
  advancedForm.classList.add('hidden');
}
