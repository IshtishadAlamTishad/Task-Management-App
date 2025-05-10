const addTaskBtn = document.getElementById('addTaskBtn');
const taskTitleInput = document.getElementById('taskTitle');
const taskList = document.getElementById('taskList');
const completionBar = document.getElementById('completionBar');
const completedCountElem = document.getElementById('completedCount');
const totalCountElem = document.getElementById('totalCount');
const completionPercentageElem = document.getElementById('completionPercentage');

let tasks = [];
let history = [];

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
    logHistory('Task Added', task);
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
    logHistory('Subtask Added', tasks[taskIndex]);
    renderTasks();
  }
}

function toggleTaskCompletion(taskIndex) {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  logHistory('Task Status Changed', tasks[taskIndex]);
  renderTasks();
}

function toggleSubtaskCompletion(taskIndex, subtaskIndex) {
  tasks[taskIndex].subtasks[subtaskIndex].completed = !tasks[taskIndex].subtasks[subtaskIndex].completed;
  logHistory('Subtask Status Changed', tasks[taskIndex]);
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

function logHistory(action, task) {
  const timestamp = new Date().toLocaleString();
  const logEntry = {
    action: action,
    taskTitle: task.title,
    timestamp: timestamp
  };
  history.push(logEntry);
  renderHistory();
}

function renderHistory() {
  const historyLog = document.getElementById('historyLog');
  historyLog.innerHTML = '';

  history.forEach(entry => {
    const historyItem = document.createElement('li');
    historyItem.classList.add('history-item');
    historyItem.textContent = `${entry.timestamp} - ${entry.action}: ${entry.taskTitle}`;
    historyLog.appendChild(historyItem);
  });
}

document.getElementById('exportHistoryBtn').addEventListener('click', () => {
  let csvContent = "Timestamp,Action,Task Title\n";
  history.forEach(entry => {
    csvContent += `${entry.timestamp},${entry.action},${entry.taskTitle}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "activity_history.csv";
  link.click();
});
