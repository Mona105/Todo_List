import React, { useState, useEffect } from 'react';
import '../StyleSheet/Todo.css';

function TodoList() {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAddTodo = () => {
        if (title) {
            const newTodo = { id: Date.now(), title, completed: false };
            setTodos([...todos, newTodo]);
            setTitle('');
        }
    };

    const handleCheckboxChange = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
    };

    const handleDoubleClick = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, editing: true };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
    };

    const handleTitleEdit = (id, newTitle) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, title: newTitle, editing: false };
            } else {
                return todo;
            }
        });
        setTodos(updatedTodos);
    };

    const handleClearCompleted = () => {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1 className='headingTodo'>Todo List</h1>
            <table className='table table-dark table-striped table-bordered'>
  <thead>
    <tr>
      <th>Status</th>
      <th>Title</th>
    </tr>
  </thead>
  <tbody>
    {todos.map((todo) => (
      <tr key={todo.id} onDoubleClick={() => handleDoubleClick(todo.id)}>
        <td>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo.id)}
          />
        </td>
        <td>
          {todo.editing ? (
            <input  
              type="text" 
              value={todo.title} 
              onChange={(e) => handleTitleEdit(todo.id, e.target.value)} 
            />
          ) : (
            <span className={todo.completed ? 'colorChange' : ''}>{todo.title}</span>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

            <div>
                <input type="text" value={title} onChange={handleTitleChange} />&nbsp;&nbsp;
                <button className='addButton' onClick={handleAddTodo}>Add</button>
            </div>
            <br />

            <button className='clearButton' onClick={handleClearCompleted}>Clear Completed</button>
            <br />
            <div className='text'>
               <b> If you want to edit title so double click in checkbox.</b>
            </div>
        </div>
    );
}

export default TodoList;
