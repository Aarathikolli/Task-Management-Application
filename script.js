let tasks = [];
let userName = "";
document.addEventListener("DOMContentLoaded", () => {
  userName = prompt("What's your name?");
  if (userName) {
    document.getElementById("userName").innerText = userName;
    loadTasks();
    updateTaskTable();
    updateProgress();
  }
});
document.getElementById("modeSwitch").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});
function addTask() {
  let taskInput = document.getElementById("newTask").value;
  if (taskInput !== "") {
    tasks.push({ text: taskInput, completed: false });
    document.getElementById("newTask").value = "";
    updateTaskTable();
    updateProgress();
    saveTasks(); 
  }
}
function updateTaskTable(filter = "pending") {
  let taskTableBody = document.querySelector("#taskTable tbody");
  taskTableBody.innerHTML = "";
  tasks
    .filter((task) => task.completed === (filter === "completed"))
    .forEach((task, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
      <td>${task.text}</td>
      <td>
        <button onclick="toggleComplete(${index})">${
        task.completed ? "Undo" : "Complete"
      }</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>`;
      taskTableBody.appendChild(row);
    });
}
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskTable();
  updateProgress();
  saveTasks(); 
}
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskTable();
  updateProgress();
  saveTasks();
}
function showPending() {
  updateTaskTable("pending");
}
function showCompleted() {
  updateTaskTable("completed");
}
function updateProgress() {
  let completedTasks = tasks.filter((task) => task.completed).length;
  let totalTasks = tasks.length;
  let progressPercent = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  document.getElementById("progressBar").value = progressPercent;
  document.getElementById("progressText").innerText = `${Math.round(
    progressPercent
  )}% Completed`;
}
function saveTasks() {
  if (userName) {
    localStorage.setItem(userName, JSON.stringify(tasks));
  }
}
function loadTasks() {
  if (userName && localStorage.getItem(userName)) {
    tasks = JSON.parse(localStorage.getItem(userName));
  } else {
    tasks = [];
  }
}
