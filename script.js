// ===== DOM Elements =====
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMsg = document.getElementById("login-msg");
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const logoutBtn = document.getElementById("logoutBtn");

const taskForm = document.getElementById("taskForm");
const subjectInput = document.getElementById("subject");
const deadlineInput = document.getElementById("deadline");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const scheduleBox = document.getElementById("scheduleBox");
const timelineBox = document.getElementById("timelineBox");
const progressFill = document.getElementById("progressFill");

// ===== Allowed Users =====
const users = [
  { username: "student", password: "1234" },
  { username: "mentor", password: "4321" }
];

// ===== Tasks =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===== Check login on page load =====
window.addEventListener("load", () => {
  const loggedIn = localStorage.getItem("loggedIn");
  const currentUser = localStorage.getItem("currentUser");

  if(loggedIn === "true" && currentUser) {
    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    renderAll();
  } else {
    loginContainer.style.display = "block";
    appContainer.style.display = "none";
  }
});

// ===== Login Handler =====
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = usernameInput.value.trim().toLowerCase();
  const pass = passwordInput.value.trim();

  const validUser = users.find(u => u.username.toLowerCase() === user && u.password === pass);

  if(validUser) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", validUser.username);
    loginMsg.textContent = `Login successful! Welcome, ${validUser.username}.`;

    loginContainer.style.display = "none";
    appContainer.style.display = "block";
    renderAll();
  } else {
    loginMsg.textContent = "Invalid username or password!";
  }
});

// ===== Logout Handler =====
logoutBtn.addEventListener("click", () => {
  if(confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    loginContainer.style.display = "block";
    appContainer.style.display = "none";
  }
});

// ===== Add Task =====
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const subject = subjectInput.value.trim();
  const deadline = deadlineInput.value;
  const priority = priorityInput.value;

  if(!subject || !deadline) return;

  const task = { subject, deadline, priority, completed: false };
  tasks.push(task);
  saveTasks();
  renderAll();
  taskForm.reset();

  alert(`Reminder set! Don't forget to study "${subject}" by ${deadline}.`);
});

// ===== Render Task List =====
function renderTasks() {
  taskList.innerHTML = "";
  if(tasks.length === 0) return;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(index));

    const span = document.createElement("span");
    span.innerHTML = `<strong>${task.subject}</strong> - ${task.deadline} <em>[${task.priority}]</em>`;

    li.appendChild(span);
    li.appendChild(checkbox);
    taskList.appendChild(li);
  });
}

// ===== Toggle Complete =====
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderAll();
}

// ===== Render Schedule =====
function renderSchedule() {
  if(tasks.length === 0) {
    scheduleBox.innerHTML = "<p>No tasks yet. Add some above!</p>";
    return;
  }

  scheduleBox.innerHTML = tasks
    .map(t => `<p>📖 <strong>${t.subject}</strong> due <em>${t.deadline}</em> (${t.priority})</p>`)
    .join("");
}

// ===== Render Timeline =====
function renderTimeline() {
  if(tasks.length === 0) {
    timelineBox.innerHTML = "<p>No tasks yet!</p>";
    return;
  }

  timelineBox.innerHTML = tasks
    .map(t => `<p>${t.deadline}<br><strong>${t.subject}</strong><br><em>${t.priority}</em></p>`)
    .join("");
}

// ===== Update Progress =====
function updateProgress() {
  if(tasks.length === 0) {
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    return;
  }

  const completed = tasks.filter(t => t.completed).length;
  const percent = Math.round((completed / tasks.length) * 100);

  progressFill.style.width = percent + "%";
  progressFill.textContent = percent + "%";
}

// ===== Save Tasks =====
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== Render Everything =====
function renderAll() {
  renderTasks();
  renderSchedule();
  renderTimeline();
  updateProgress();
}

// ===== Smooth Scroll =====
function scrollToSection(id) {
  const section = document.getElementById(id);
  if(section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

