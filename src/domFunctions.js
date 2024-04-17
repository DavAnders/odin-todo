import manager from "./projectsManager";

export function initializeUI() {
  renderProjectList();
  setupGlobalEventListeners();
  setupFormEventListeners();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const projectName = document.getElementById("current-project").value;
  const name = document.getElementById("item-name").value;
  const details = document.getElementById("item-details").value;
  const date = document.getElementById("item-date").value;
  const priority = document.getElementById("item-priority").value;

  if (!name.trim() || !details.trim() || !date.trim()) {
    console.error("Essential todo details are missing!");
    alert("Please fill in all fields.");
    return;
  }

  manager.addTodoToProject(projectName, name, details, date, priority);
  renderTodos(projectName);
  toggleModalVisibility(false);
  event.target.reset();
}

function renderProjectList() {
  const projects = manager.getProjects();
  const projectListElement = document.getElementById("project-list");
  projectListElement.innerHTML = "";

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.className = "project";
    projectElement.textContent = project.name;
    projectElement.onclick = () => {
      renderTodos(project.name);
      setCurrentProject(project.name);
    };
    projectListElement.appendChild(projectElement);
  });
}

function setCurrentProject(name) {
  const currentProjectInput = document.getElementById("current-project");
  currentProjectInput.value = name;
}

function renderTodos(projectName) {
  const todos = manager.getProjectTodos(projectName);
  const todoContainer = document.querySelector(".todo-container");
  if (!todoContainer) {
    console.error("Todo container not found!");
    return;
  }

  todoContainer.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.className =
      "todo-item" + (todo.isCompleted ? " completed" : "");

    todoElement.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Description: ${todo.description}</p>
            <p>Due: ${todo.dueDate}</p>
            <p>Priority: ${
              todo.priority[0].toUpperCase() + todo.priority.substring(1)
            }</p>
            <label><input type="checkbox" ${
              todo.isCompleted ? "checked" : ""
            } onclick="toggleTodoComplete('${projectName}', '${
      todo.id
    }')"> Completed</label>
        `;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTodo(projectName, todo.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTodo(projectName, todo.id);

    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);
    todoContainer.appendChild(todoElement);
  });
}

function toggleModalVisibility(show = true) {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.style.visibility = show ? "visible" : "hidden";
    modal.style.opacity = show ? 1 : 0;
  } else {
    console.error("Modal element not found!");
  }
}

function setupGlobalEventListeners() {
  const addTaskBtn = document.getElementById("add-task-btn");
  if (addTaskBtn) {
    addTaskBtn.addEventListener("click", () => toggleModalVisibility(true));
  } else {
    console.error("Add Task button not found!");
  }

  const projectSelector = document.getElementById("project-selector");
  if (projectSelector) {
    projectSelector.addEventListener("change", onProjectChange);
  } else {
    console.error("Project selector not found!");
  }

  const newProjectBtn = document.getElementById("new-project-btn");
  if (newProjectBtn) {
    newProjectBtn.addEventListener("click", createNewProject);
  } else {
    console.error("New Project button not found!");
  }
}

function setupFormEventListeners() {
  const todoForm = document.getElementById("todo-form");
  if (todoForm) {
    todoForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.error("Todo form not found!");
  }

  document.querySelectorAll(".modal .close").forEach((button) => {
    button.addEventListener("click", () => toggleModalVisibility(false));
  });
}

function onProjectChange() {
  const selectedProject = document.getElementById("project-selector").value;
  renderTodos(selectedProject);
}

function createNewProject() {
  const projectName = prompt("Enter the name of the new project:");
  if (projectName) {
    manager.addProject(projectName);
    renderProjectList();
    toggleModalVisibility(false);
  }
}

window.editTodo = function (projectName, todoId) {
  console.log("Project Name:", projectName);
  console.log("Todo ID:", todoId);

  const todos = manager.getProjectTodos(projectName);
  console.log("Todos:", todos);

  const todo = todos.find((t) => t.id === todoId);
  console.log("Found Todo:", todo);

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

window.toggleTodoComplete = function (projectName, todoId) {
  const todo = manager
    .getProjectTodos(projectName)
    .find((t) => t.id === todoId);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    manager.updateTodoInProject(projectName, todoId, todo);
    renderTodos(projectName);
  }
};
