function updateTask(taskID, isDone) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../../controller/taskController.php', true);
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                try {
                    const res = JSON.parse(xhr.responseText);
                    if (!res.success) {
                        alert('Update unsuccessful.');
                        fetchAndUpdateTasks();
                    }
                } catch (e) {
                    alert('Invalid response from server.');
                    fetchAndUpdateTasks();
                }
            } else {
                alert('Failed to update task. Please try again.');
                fetchAndUpdateTasks();
            }
        }
    };

    xhr.send(JSON.stringify({ taskID: taskID, isDone: isDone ? 1 : 0 }));
}

function fetchAndUpdateTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../../controller/taskController.php', true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            try{
                const tasks = JSON.parse(xhr.responseText);
                tasks.forEach(task => {
                    const cb = document.querySelector(`.task-checkbox[data-taskid="${task.taskID}"]`);
                    if (cb) cb.checked = task.isDone == 1;
                });
                updateProgress();
            } catch (e) {
                alert('Failed to parse tasks data.');
            }
        }
    };

    xhr.send();
}