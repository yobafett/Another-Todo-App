import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoLIst/TodoList';
import TodoListActions from './components/TodoListActions/TodoListActions';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text, tags = []) => {
    const newTodo = {
      id: uuidv4(),
      text: text,
      complete: false,
      tags: tags.map(tag => ({
        tagName: tag,
        tagID: uuidv4()
      }))
    };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    setTodos(todos.map((todo) => {
      return id === todo.id ?
        { ...todo, complete: !todo.complete }
        : { ...todo }
    }));
  }

  const delTodo = (id) => setTodos(todos.filter((todo) => id !== todo.id));
  const delAllTodo = () => setTodos([]);
  const delCompleteTodo = () => setTodos(todos.filter((item) => !item.complete));

  const completeCount = todos.reduce(function (currentCount, todo) {
    return todo.complete ? currentCount + 1 : currentCount;
  }, 0);

  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoForm addTodo={addTodo} />
      {
        todos.length <= 0 ?
          null :
          <TodoListActions
            delAllHandler={delAllTodo}
            delComplHandler={delCompleteTodo}
            hasComplete={completeCount > 0}
          />
      }
      <TodoList
        todos={todos}
        deleteTodo={delTodo}
        completeTodo={completeTodo}
        completeCount={completeCount}
      />
    </div>
  );
}

export default App;
