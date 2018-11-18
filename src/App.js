import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function TodoForm( {addTodo}) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="todo">
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)}></input>
      </div>
    </form>
  )
}

function Todo({todo, index, completeTodo, removeTodo}) {
  return (
    <div className="todo" style={{textDecoration: todo.isCompleted? "line-through": ""}}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  )
}

function App() {
  // const [todos, setTodos] = useState([
  //   { text: "Learn about React", isCompleted: false },
  //   { text: "Meet friend for lunch", isCompleted: false },
  //   { text: "Build really cool todo app", isCompleted: false }
  // ]);

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      (async function() {
          setIsLoading(true);
          try {
              const response = await axios('http://localhost:3001/todos')
              setTodos(response.data);
          } catch (e) {
              console.error(e);
          }
          setIsLoading(false);
      })();
  }, []);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  
  return (
    <div className="App">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
      <div className="todo-list">      
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>      
      )}
    </div>
  );
}

export default App;
