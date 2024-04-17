class TodoItem {
  constructor(title, description, dueDate, priority) {
    console.log("Assigning:", { title, description, dueDate, priority });
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = false;
  }
}

export default TodoItem;
