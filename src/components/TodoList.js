import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/todos' : 'https://75296.sse.codesandbox.io/todos';

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      setMessage("Todo cannot be empty")
      return;
    }

    if(todos.some(t => t.text === todo.text)) {
      setMessage("Todo cannot be duplicated")
      return;
    }

    const newTodos = [todo, ...todos];
    setMessage("")

    setTodos(newTodos);

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;

        fetch(`${API_URL}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isComplete: todo.isComplete }),
        });
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? {...newValue, id: todoId} : item))
    );

    fetch(`${API_URL}/${todoId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newValue.text }),
    }).then(res => res.json()).then(data => console.log(data));
  };

  const removeTodo = (id) => {
    console.log(id)
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <p>{message}</p>
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
