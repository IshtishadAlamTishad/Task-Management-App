const addTaskBtn = document.getElementById('addTaskBtn');
const taskTitleInput = document.getElementById('taskTitle');
const taskList = document.getElementById('taskList');
const completionBar = document.getElementById('completionBar');
const completedCountElem = document.getElementById('completedCount');
const totalCountElem = document.getElementById('totalCount');
const completionPercentageElem = document.getElementById('completionPercentage');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
  const taskTitle = taskTitleInput.value.trim();

  if (taskTitle) {
    const task = {
      title: taskTitle,
      completed: false,
      subtasks: [] 
    };
    tasks.push(task);
    taskTitleInput.value = '';
    renderTasks(); 
  }
});

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, taskIndex) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(taskIndex));

    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.title;

    const addSubtaskBtn = document.createElement('button');
    addSubtaskBtn.classList.add('add-subtask-btn');
    addSubtaskBtn.textContent = 'Add Subtask';
    addSubtaskBtn.addEventListener('click', () => addSubtask(taskIndex));

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(addSubtaskBtn);

    const subtaskList = document.createElement('div');
    subtaskList.classList.add('subtask-list');
    task.subtasks.forEach((subtask, subtaskIndex) => {
      const subtaskItem = document.createElement('div');
      subtaskItem.classList.add('subtask-item');
      const subtaskCheckbox = document.createElement('input');
      subtaskCheckbox.type = 'checkbox';
      subtaskCheckbox.checked = subtask.completed;
      subtaskCheckbox.addEventListener('change', () => toggleSubtaskCompletion(taskIndex, subtaskIndex));

      const subtaskLabel = document.createElement('span');
      subtaskLabel.textContent = subtask.title;

      subtaskItem.appendChild(subtaskCheckbox);
      subtaskItem.appendChild(subtaskLabel);
      subtaskList.appendChild(subtaskItem);
    });

    taskItem.appendChild(subtaskList);
    taskList.appendChild(taskItem);
  });

  updateProgress(); 
}

function addSubtask(taskIndex) {
  const subtaskTitle = prompt('Enter subtask title:');
  if (subtaskTitle) {
    tasks[taskIndex].subtasks.push({
      title: subtaskTitle,
      completed: false
    });
    renderTasks(); 
  }
}

function toggleTaskCompletion(taskIndex) {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  renderTasks(); 
}


function toggleSubtaskCompletion(taskIndex, subtaskIndex) {
  tasks[taskIndex].subtasks[subtaskIndex].completed = !tasks[taskIndex].subtasks[subtaskIndex].completed;
  renderTasks(); 
}

function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalSubtasks = tasks.reduce((acc, task) => acc + task.subtasks.length, 0);
  const completedSubtasks = tasks.reduce((acc, task) => acc + task.subtasks.filter(subtask => subtask.completed).length, 0);
  const totalCompleted = completedTasks + completedSubtasks;

  const completionPercentage = totalTasks === 0 && totalSubtasks === 0 ? 0 : (totalCompleted / (totalTasks + totalSubtasks)) * 100;

  completedCountElem.textContent = totalCompleted;
  totalCountElem.textContent = totalTasks + totalSubtasks;
  completionPercentageElem.textContent = `${completionPercentage.toFixed(2)}%`;

  completionBar.style.width = `${completionPercentage}%`;
}
