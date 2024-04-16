import manager from "./projectsManager";

export function initializeUI() {
  renderProjectList();
  setupGlobalEventListeners();
  setupFormEventListeners();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const projectName = document.getElementById("project-selector").value;
  const name = document.getElementById("item-name").value;
  const details = document.getElementById("item-details").value;
  const date = document.getElementById("item-date").value;
  const priority = document.getElementById("item-priority").value;

  manager.addTodoToProject(projectName, name, details, date, priority);
  console.log("Form Submitted", { projectName, name, details, date, priority });
  renderTodos(projectName);
  toggleModalVisibility(false); // Close modal on submit
  event.target.reset();
}

function renderProjectList() {
  const projects = manager.getProjects();
  const projectListElement = document.getElementById("project-list");
  const projectSelector = document.getElementById("project-selector");
  projectSelector.innerHTML = "";
  projectListElement.innerHTML = "";

  projects.forEach((project) => {
    const projectElement = document.createElement("div");
    projectElement.className = "project";
    projectElement.textContent = project.name;
    projectElement.onclick = () => renderTodos(project.name);
    projectListElement.appendChild(projectElement);

    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelector.appendChild(option);
  });

  if (projects.length > 0) {
    renderTodos(projects[0].name);
  } else {
    toggleModalVisibility(true); // Show modal if no projects exist
  }
}

function renderTodos(projectName) {
  const todos = manager.getProjectTodos(projectName);
  const todoContainer = document.querySelector(".todo-container"); // This should be already defined in your HTML
  if (!todoContainer) {
    console.error("Todo container not found!");
    return; // Stop the function if the container doesn't exist
  }

  todoContainer.innerHTML = ""; // Clear existing todos only, without affecting the modal

  todos.forEach((todo) => {
    const todoElement = document.createElement("div");
    todoElement.className = "todo-item";
    todoElement.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Description: ${todo.description}</p>
            <p>Due: ${todo.dueDate}</p>
            <p>Priority: ${todo.priority}</p>
        `; // Define the HTML structure of a todo item

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editTodo(todo, projectName));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this todo?")) {
        manager.removeTodoFromProject(projectName, todo.id);
        renderTodos(projectName); // Update the list after deleting
      }
    });

    todoElement.appendChild(editButton);
    todoElement.appendChild(deleteButton);

    if (todo.isCompleted) {
      todoElement.classList.add("completed");
    }

    todoContainer.appendChild(todoElement); // Append each todo element to the designated todo container
  });
}

function showNewTodoModal() {
  toggleModalVisibility(true);
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
    addTaskBtn.addEventListener("click", () => toggleModalVisibility(true)); // Correctly toggle visibility to add tasks
  } else {
    console.error("Add Task button not found!");
  }

  const projectSelector = document.getElementById("project-selector");
  if (projectSelector) {
    projectSelector.addEventListener("change", onProjectChange);
  } else {
    console.error("Project selector not found!");
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
