const TodoManager = (() => {
  let todos = [];

  const addTodo = (todo) => {
    todos.push(todo);
  };

  const deleteTodo = (index) => {
    todos.splice(index, 1);
  };

  return {
    addTodo,
    deleteTodo,
  };
})();

export default TodoManager;
