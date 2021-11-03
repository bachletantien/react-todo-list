import React, { useState, useEffect, useRef } from 'react';

const TodoForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      isComplete: false,
    });

    

    setInput('');
  };

  const handleUpdate = (e) =>{
    e.preventDefault();

    props.onSubmit({
      text: input,
      isComplete: false,
    })

    setInput('');
  }

  return (
    <form className='todo-form' onSubmit={props.edit ? handleUpdate : handleSubmit}>
      {props.edit ? (
        <>
          <input
            type='text'
            placeholder='Update your item'
            value={input}
            name='text'
            className='todo-input edit'
            onChange={handleChange}
            ref={inputRef}
          />
          <button className='todo-button edit'>Update</button>
        </>
      ) : (
        <>
          <input
            type='text'
            placeholder='Add a todo'
            value={input}
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
          />
          <button className='todo-button'>Add todo</button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
