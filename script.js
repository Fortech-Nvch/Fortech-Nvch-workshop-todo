const todoForm = document.querySelector(".todo-form");
const newTaskInput = document.querySelector(".task-input");
const tasksList = document.querySelector(".tasks-list");
const deleteAllButton = document.querySelector(".delete-all");

let tasks = [];

if(localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    newTaskInput.value = "";
    newTaskInput.focus();
  }
});

deleteAllButton.addEventListener("click", deleteAllTasks);

function addTask(taskText) {
  const task = { id: Date.now(), todo: taskText, isComplete: false };
  tasks.push(task);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, isComplete: !task.isComplete } : task
  );
  renderTasks();
}

function renderTasks() {
  tasksList.innerHTML = "";
  saveTasks();
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    if (task.isComplete) {
      taskItem.classList.add("completed");
    }

    const taskContent = document.createElement("span");
    taskContent.textContent = task.todo;
    taskItem.appendChild(taskContent);

    taskItem.addEventListener("click", () => {
      toggleComplete(task.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Х";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTask(task.id);
    });
    taskItem.appendChild(deleteButton);

    tasksList.appendChild(taskItem);
  });
}
