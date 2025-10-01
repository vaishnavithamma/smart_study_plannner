const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const scheduleBox = document.getElementById("scheduleBox");
const timelineBox = document.getElementById("timelineBox");
const progressFill = document.getElementById("progressFill");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const subject = document.getElementById("subject").value;
  const deadline = document.getElementById("deadline").value;
  const priority = document.getElementById("priority").value;

  const task = { subject, deadline, priority, completed: false };
  tasks.push(task);

  saveTasks();
  renderAll();
  taskForm.reset();

  alert(`Reminder set! Don't forget to study "${subject}" by ${deadline}.`);
});

// Render Task List
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${task.subject}</strong> - ${task.deadline} 
        <em>[${task.priority}]</em>
      </span>
      <input type="checkbox" ${task.completed ? "checked" : ""} 
        onchange="toggleComplete(${index})">
    `;
    taskList.appendChild(li);
  });
}

// Toggle Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderAll();
}

// Render Schedule
function renderSchedule() {
  if (tasks.length === 0) {
    scheduleBox.innerHTML = "<p>No tasks yet. Add some above!</p>";
    return;
  }
  scheduleBox.innerHTML = tasks
    .map(
      (t) =>
        `<p>📖 <strong>${t.subject}</strong> due <em>${t.deadline}</em> (${t.priority})</p>`
    )
    .join("");
}

// Render Timeline
function renderTimeline() {
  if (tasks.length === 0) {
    timelineBox.innerHTML = "<p>No tasks yet!</p>";
    return;
  }
  timelineBox.innerHTML = tasks
    .map(
      (t) =>
        `<p>${t.deadline}<br><strong>${t.subject}</strong><br><em>${t.priority}</em></p>`
    )
    .join("");
}

// Update Progress
function updateProgress() {
  if (tasks.length === 0) {
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    return;
  }
  const completed = tasks.filter((t) => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);

  progressFill.style.width = percent + "%";
  progressFill.textContent = percent + "%";
}

// Save Tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Everything
function renderAll() {
  renderTasks();
  renderSchedule();
  renderTimeline();
  updateProgress();
}

// Scroll Smooth
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
// Dummy user (for demo only)
const demoUser = {
  username: "student",
  password: "1234"
};

// Login handler
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  
  if(user === demoUser.username && pass === demoUser.password) {
    localStorage.setItem("loggedIn", "true"); // save login status
    document.getElementById("login-msg").textContent = "Login successful!";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
  } else {
    document.getElementById("login-msg").textContent = "Invalid username or password!";
  }
});

// Check login on page load
window.onload = function() {
  if(localStorage.getItem("loggedIn") === "true") {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app-container").style.display = "block";
  }
};

// Initial Load
renderAll();
