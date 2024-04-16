import Project from "./project";
import { loadFromLocalStorage } from "./localStorage";
import TodoItem from "./todoItem";

class ProjectsManager {
  constructor() {
    this.projects = [];
    this.loadProjects();
  }

  loadProjects() {
    const storedProjects = loadFromLocalStorage("projects");
    if (storedProjects && storedProjects.length > 0) {
      this.projects = storedProjects.map((proj) => {
        const project = new Project(proj.name);
        project.todos.forEach((todo) =>
          project.addTodo(
            new TodoItem(
              todo.title,
              todo.description,
              todo.dueDate,
              todo.priotrity
            )
          )
        );
        return project;
      });
    } else {
      this.projects = [];
      this.saveProjects();
    }
  }

  saveProjects() {
    const projectsToStore = this.projects.map((proj) => ({
      name: proj.name,
      todos: proj.todos.map((todo) => ({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isCompleted: todo.isCompleted,
      })),
    }));
    saveToLocalStorage("projects", projectsToStore);
  }

  addProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
    this.saveProjects();
  }

  findProjectByName(name) {
    return this.projects.find((proj) => proj.name === name);
  }

  getProjectTodos(projectName) {
    const project = this.findProjectByName(projectName);
    return project ? project.todos : [];
  }

  deleteProject(name) {
    this.projects = this.projects.filter((proj) => proj.name !== name);
    this.saveProjects();
  }

  getProjects() {
    return this.projects;
  }

  addTodoToProject(projectName, title, description, dueDate, priority) {
    const project = this.findProjectByName(projectName);
    if (project) {
      const todo = new TodoItem(title, description, dueDate, priority);
      project.addTodo(todo);
      this.saveProjects;
    }
  }

  updateTodoInProject(projectName, todoId, data) {
    const project = this.findProjectByName(projectName);
    if (project) {
      project.updateTodo(todoId, data);
      this.saveProjects();
    }
  }

  removeTodoFromProject(projectName, todoId) {
    const project = this.findProjectByName(projectName);
    if (project) {
      project.deleteTodo(todoId);
      this.saveProjects();
    }
  }
}

const manager = new ProjectsManager();
export default manager;
