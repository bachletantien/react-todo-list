import './App.css';
import React, { useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState([]);

  return (
    <div className='App'>
      <header className='todo-app'>
        <TodoList />
      </header>
    </div>
  );
}

export default App;
