import manager from "./projectsManager";

export function initializeUI() {
  renderProjectList();
  setupGlobalEventListeners();
}

function renderProjectList() {
  const projects = manager.getProjects();
  const projectListElement = document.getElementById("project-list");
  projectListElement.innerHTML = "";

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.className = "project";
    projectElement.textContent = project.name;
    projectElement.onclick = () => renderTodos(project.name);
    projectListElement.appendChild(projectElement);
  });
}

function renderTodos(projectName) {
  const todos = manager.getProjectTodos(projectName);
  const contentContainer = document.querySelector(".content-container");
  contentContainer.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.className = "todo-item";
    todoElement.innerHTML = `
        <h3>${todo.title}</h3>
        <p>Description: ${todo.description}</p>
        <p>Due: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <button onclick="updateTodo('${projectName}', '${todo.id}')">Edit</button>
        <button onclick="deleteTodo('${projectName}', '${todo.id}')">Delete</button>
    `;
    if (todo.isCompleted) {
      todoElement.classList.add("completed");
    }
    contentContainer.appendChild(todoElement);
  });
}

function setupGlobalEventListeners() {
  document
    .getElementById("new-project-btn")
    .addEventListener("click", createNewProject);
}

function createNewProject() {
  const projectName = prompt("Enter the name of the new project:");
  if (projectName) {
    manager.addProject(projectName);
    renderProjectList();
  }
}

window.editTodo = function (projectName, todoId) {
  const todo = manager
    .getProjectTodos(projectName)
    .find((t) => t.id === todoId);
  if (!todo) {
    alert("Todo not found!");
    return;
  }

  const newTitle = prompt("Enter new title", todo.title);
  const newDescription = prompt("Enter new description", todo.description);
  const newDueDate = prompt("Enter new due date (YYYY-MM-DD)", todo.dueDate);
  const newPriority = prompt(
    "Enter new priority (low, medium, high)",
    todo.priority
  );

  const updatedData = {
    title: newTitle,
    description: newDescription,
    dueDate: newDueDate,
    priority: newPriority,
    isCompleted: todo.isCompleted,
  };

  manager.updateTodoInProject(projectName, todoId, updatedData);
  renderTodos(projectName);
};

window.deleteTodo = function (projectName, todoId) {
  if (confirm("Are you sure you want to delete this todo?")) {
    manager.removeTodoFromProject(projectName, todoId);
    renderTodos(projectName);
  }
};
