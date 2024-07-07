import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { HoverBorderGradient } from './components/ui/HoverBorderGradient';

function TodoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const exportTodos = () => {
    const todoText = todos.map(todo => `${todo.completed ? '[x]' : '[ ]'} ${todo.text}`).join('\n');
    const blob = new Blob([todoText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg">
      <h2 className="text-3xl mb-4 text-cyan-400 font-abril">Todo List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What's next on your list?"
          className="flex-grow mr-2 p-2 rounded-full bg-[#000000] text-white font-sans"
        />
        <HoverBorderGradient
          containerClassName="rounded-full"
          className="text-white flex items-center space-x-2 font-abril"
          onClick={addTodo}
        >
          <span>Add Todo</span>
        </HoverBorderGradient>
      </div>
      <List>
        {todos.map((todo, index) => (
          <ListItem key={index} className="bg-[#2A2A2A] mb-2 rounded-lg">
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
              className="text-cyan-400"
            />
            <ListItemText
              primary={todo.text}
              className={`text-xl font-sans ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(index)}>
              <DeleteIcon className="text-red-500" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <div className="mt-4">
        <HoverBorderGradient
          containerClassName="rounded-full w-full"
          className="text-white flex items-center justify-center space-x-2 font-abril"
          onClick={exportTodos}
        >
          <span>Export Todos</span>
        </HoverBorderGradient>
      </div>
    </div>
  );
}

export default TodoList;