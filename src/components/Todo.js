
import React, { useReducer, useRef } from 'react';
import { Button } from 'react-bootstrap';
import './To.css'

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.payload,
        },
      ];

    case 'DELETE':
      return state.filter((d) => d.id !== action.payload);

    default:
      return state;
  }
};

const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);

  const addItem = () => {
    const value = inputRef.current.value;
    if (value.trim() !== '') {
      dispatch({ type: 'ADD_ITEM', payload: value });
      inputRef.current.value = ''; 
    }
  };

  return (
    <div className='top'>
      <div>
        <h1>Todo App</h1>
      </div>
      <div className='main'>
       <div><input type="text" ref={inputRef} /></div> 
       <div><Button variant='primary' onClick={addItem}>Add</Button></div> 
      </div>
      <div className='del'>
        {todos.map((todo) => (
          <li key={todo.id} style={{ listStyle: 'none'}}>
            {todo.name}
            <Button
              variant="danger" 
              onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}>
              Delete
            </Button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Todo