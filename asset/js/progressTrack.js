const taskList = document.getElementById('taskList');
const completionBar = document.getElementById('completionBar');
const completedCountElem = document.getElementById('completedCount');
const totalCountElem = document.getElementById('totalCount');
const completionPercentageElem = document.getElementById('completionPercentage');

let tasks = [
  // { title: "Task 1", completed: false },
  // { title: "Task 2", completed: true }
];


function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(index));

    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.title;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);

    taskList.appendChild(taskItem);
  });

  updateProgress();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function updateProgress() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  completedCountElem.textContent = completedTasks;
  totalCountElem.textContent = totalTasks;
  completionPercentageElem.textContent = `${completionPercentage.toFixed(2)}%`;

  completionBar.style.width = `${completionPercentage}%`;
}

renderTasks();
