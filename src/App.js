import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

import { postTodo, postTag, getTodo, getTags } from './utils/TodoAPI';
import TagsSection from './components/TagsSection/TagsSection';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoLIst/TodoList';
import TodoListActions from './components/TodoListActions/TodoListActions';


function App() {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState();

  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  if (isTodosLoading) {
    getTodo().then((data) => {
      setTodos(data);
      setIsTodosLoading(false);
    })
  }

  if (isTagsLoading) {
    getTags().then((data) => {
      setTags(data);
      setIsTagsLoading(false);
    })
  }

  const addTodo = (text, todoTags = []) => {
    const tagsObjs = todoTags.map((newTag, i) => {
      const searchResult = tags.findIndex((tag) => tag.text === newTag.toLowerCase());

      let tag;
      if (searchResult < 0) {
        tag = {
          id: uuidv4(),
          text: newTag.toLowerCase()
        }

        setTags([...tags, tag]);
        postTag(tag)
      } else {
        tag = tags[searchResult];
      }

      return tag;
    })

    const newTodo = {
      id: uuidv4(),
      text: text,
      complete: false,
      tags: tagsObjs
    };

    setTodos([...todos, newTodo]);
    postTodo(newTodo);
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
