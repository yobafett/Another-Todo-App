import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import TagsSection from './components/TagsSection/TagsSection';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoLIst/TodoList';
import TodoListActions from './components/TodoListActions/TodoListActions';

function App() {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState();

  //
  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  if (isTodosLoading) {
    axios.get('http://localhost:3001/todos')
      .then(function (response) {
        setTodos(response.data);
        setIsTodosLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  if (isTagsLoading) {
    axios.get('http://localhost:3001/tags')
      .then(function (response) {
        setTags(response.data);
        setIsTagsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  //

  const addTodo = (text, todoTags = []) => {
    const newTodo = {
      id: uuidv4(),
      text: text,
      complete: false,
      tags: todoTags
    };
    setTodos([...todos, newTodo]);

    const allTags = [...tags, ...todoTags];
    const uniqueTags = allTags.filter((value, index) => allTags.indexOf(value) === index);
    setTags(uniqueTags);
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

  const content = isTodosLoading ?
    (<div>Loading...</div>) :
    (
      <>
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

        {isTagsLoading ? (<div>Loading</div>) : <TagsSection tags={tags} />}

        <TodoList
          todos={todos}
          deleteTodo={delTodo}
          completeTodo={completeTodo}
          completeCount={completeCount}
        />
      </>
    )

  return (
    <div className="App">
      <h1>Todo app</h1>
      {content}
    </div>
  );
}

export default App;
