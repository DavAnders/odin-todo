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
    if (storedProjects) {
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
}
