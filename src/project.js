class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(todoID) {
    this.todos = this.todos.filter((todo) => todo.id !== todoID);
  }

  getTodoByID(todoID) {
    return this.todos.find((todo) => todo.id === todoID);
  }

  updateTodo(todoID, data) {
    const todo = this.getTodoByID(todoID);
    if (todo) {
      todo.title = data.title || todo.title;
      todo.description = data.description || todo.description;
      todo.dueDate = data.dueDate || todo.dueDate;
      todo.priority = data.priority || todo.priority;
    }
  }

  markCompleted(todoID) {
    const todo = this.getTodoByID(todoID);
    todo.isCompleted = true;
  }
}

export default Project;
