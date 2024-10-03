let tasks = [];
let userName = "";

// On page load, ask for username and load tasks if they exist
document.addEventListener("DOMContentLoaded", () => {
  userName = prompt("What's your name?");

  if (userName) {
    document.getElementById("userName").innerText = userName;

    // Load tasks from localStorage for the given username
    loadTasks();
    updateTaskTable();
    updateProgress();
  }
});

// Handle Dark Mode toggle
document.getElementById("modeSwitch").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Add a new task and save to localStorage
function addTask() {
  let taskInput = document.getElementById("newTask").value;
  if (taskInput !== "") {
    tasks.push({ text: taskInput, completed: false });
    document.getElementById("newTask").value = "";
    updateTaskTable();
    updateProgress();
    saveTasks(); // Save the updated task list to localStorage
  }
}

// Update the task table based on the task filter (pending/completed)
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

// Toggle the completion status of a task
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskTable();
  updateProgress();
  saveTasks(); // Save the updated task list to localStorage
}

// Delete a task and update the list
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskTable();
  updateProgress();
  saveTasks(); // Save the updated task list to localStorage
}

// Show only pending tasks
function showPending() {
  updateTaskTable("pending");
}

// Show only completed tasks
function showCompleted() {
  updateTaskTable("completed");
}

// Update the progress bar and progress text based on task completion
function updateProgress() {
  let completedTasks = tasks.filter((task) => task.completed).length;
  let totalTasks = tasks.length;
  let progressPercent = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  document.getElementById("progressBar").value = progressPercent;
  document.getElementById("progressText").innerText = `${Math.round(
    progressPercent
  )}% Completed`;
}

// Save the current task list to localStorage for the given username
function saveTasks() {
  if (userName) {
    localStorage.setItem(userName, JSON.stringify(tasks));
  }
}

// Load tasks from localStorage for the given username
function loadTasks() {
  if (userName && localStorage.getItem(userName)) {
    tasks = JSON.parse(localStorage.getItem(userName));
  } else {
    tasks = [];
  }
}
