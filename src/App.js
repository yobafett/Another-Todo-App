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

  const createNewTag = (tagText) => {
    return {
      id: uuidv4(),
      text: tagText.toLowerCase()
    };
  }

  const addNewTag = (tagText) => {
    const tag = createNewTag(tagText);

    setTags([...tags, tag]);
    postTag(tag);

    return tag;
  }

  const processNewTags = (todoTags) => {
    return todoTags.map((newTag) => {
      const searchResult = tags.findIndex((tag) => tag.text === newTag.toLowerCase());
      return searchResult < 0 ? addNewTag(newTag) : tags[searchResult];
    });
  }

  const createNewTodo = (text, todoTags) => {
    return {
      id: uuidv4(),
      text: text,
      complete: false,
      tags: todoTags.length > 0 ? processNewTags(todoTags) : []
    };
  }

  const addTodo = (text, todoTags = []) => {
    const newTodo = createNewTodo(text, todoTags);
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

  const deleteTodo = (id) => setTodos(todos.filter((todo) => id !== todo.id));
  const deleteAllTodos = () => setTodos([]);
  const deleteCompleteTodo = () => setTodos(todos.filter((item) => !item.complete));

  const completeCount = todos.reduce(function (currentCount, todo) {
    return todo.complete ? currentCount + 1 : currentCount;
  }, 0);

  const todoListContent = isTodosLoading ?
    <div>Loading...</div> :
    <TodoList
      todos={todos}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
      completeCount={completeCount}
    />;

  const todoListActions = todos.length <= 0 ?
    null :
    <TodoListActions
      delAllHandler={deleteAllTodos}
      delComplHandler={deleteCompleteTodo}
      hasComplete={completeCount > 0}
    />;

  const tagsContent = isTagsLoading ?
    <div>Loading...</div> :
    <TagsSection tags={tags} />;

  return (
    <div className="App">
      <h1>Todo app</h1>
      <TodoForm addTodo={addTodo} />
      {todoListActions}
      {tagsContent}
      {todoListContent}
    </div>
  );
}

export default App;