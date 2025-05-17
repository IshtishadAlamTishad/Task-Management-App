function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const task = document.getElementById(data);
  if (ev.target.classList.contains("calendarCell")) {
    ev.target.appendChild(task);
  } else if (ev.target.closest(".calendarCell")) {
    ev.target.closest(".calendarCell").appendChild(task);
  }
}

function switchView(view) {
  alert(`Switching to ${view} view.`);
}
  