import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { postTodo, postTag, getTodo, getTags, delTodo, delTag, switchTodoComplete } from './utils/TodoAPI';
import TagsSection from './components/TagsSection/TagsSection';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoLIst/TodoList';
import TodoListActions from './components/TodoListActions/TodoListActions';

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTagId, setActiveTagId] = useState();

  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  if (isTodosLoading) {
    getTodo().then((data) => {
      setTodos(data);
      setIsTodosLoading(false);
    });
  }

  if (isTagsLoading) {
    getTags().then((data) => {
      setTags(data);
      setIsTagsLoading(false);
    });
  }

  const createNewTag = (tagText) => {
    return {
      id: uuidv4(),
      text: tagText.toLowerCase()
    };
  };

  const addNewTag = (tagText) => {
    const newTag = createNewTag(tagText);
    postTag(newTag);
    return newTag;
  };

  const processNewTags = (todoTags) => {
    const newTags = [];

    const resultTags = todoTags.map((newTag) => {
      const searchResult = tags.findIndex((tag) => tag.text === newTag.toLowerCase());

      if (searchResult < 0) {
        const newTagItem = addNewTag(newTag);
        newTags.push(newTagItem);
        return newTagItem;
      } else {
        return tags[searchResult];
      }
    });

    setTags([...tags, ...newTags]);

    return resultTags;
  };

  const createNewTodo = (text, todoTags) => {
    return {
      id: uuidv4(),
      text: text,
      complete: false,
      tags: todoTags.length > 0 ? processNewTags(todoTags) : []
    };
  };

  const addTodo = (text, todoTags = []) => {
    const newTodo = createNewTodo(text, todoTags);
    setTodos([...todos, newTodo]);
    postTodo(newTodo);
  };

  const completeTodo = (id) => {
    setTodos(todos.map((todo) => {
      return id === todo.id ?
        { ...todo, complete: !todo.complete }
        : { ...todo };
    }));

    switchTodoComplete(id);
  };

  const clearTags = (tagItem) => {
    const tagInCount = todos.reduce((currentCount, todoItem) => {

      todoItem.tags.forEach((i) => {
        currentCount = tagItem.id === i.id ? currentCount + 1 : currentCount;
      });

      return currentCount;
    }, 0);

    if (tagInCount <= 1) {
      delTag(tagItem.id);

      return tagItem;
    }
  };

  const deleteTodo = (todoItem) => {
    const deletingTags = [];

    todoItem.tags.forEach((tagItem) => {
      deletingTags.push(clearTags(tagItem));
    });

    const newTagsState = tags.filter(function (el) {
      return deletingTags.indexOf(el) < 0;
    });

    setTags(newTagsState);
    setTodos(todos.filter((todo) => todoItem.id !== todo.id));
    delTodo(todoItem.id);
  };

  const deleteAllTodos = () => {
    todos.forEach(todo => delTodo(todo.id));
    tags.forEach(tag => delTag(tag.id));

    setTodos([]);
    setTags([]);
  };

  const deleteCompleteTodo = () => {
    todos.forEach(todoItem => {
      if (todoItem.complete) {
        deleteTodo(todoItem);
      }
    });
  };

  const activeTagHandler = (tagId) => {
    if (tagId === activeTagId)
      setActiveTagId();
    else
      setActiveTagId(tagId);
  };

  const completeCount = todos.reduce((currentCount, todo) => {
    return todo.complete ? currentCount + 1 : currentCount;
  }, 0);

  let todoListView = todos;
  if (activeTagId) {
    todoListView = todoListView.filter(todoItem => {
      const allTagIds = todoItem.tags.map(tag => tag.id);
      const activeTagContain = allTagIds.indexOf(activeTagId);
      return activeTagContain >= 0;
    });
  }

  const todoListContent = isTodosLoading ?
    <div>Loading...</div> :
    <TodoList
      todos={todoListView}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
      completeCount={completeCount}
      activeTagHandler={activeTagHandler}
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
    <TagsSection
      tags={tags}
      activeTagHandler={activeTagHandler}
      activeTagId={activeTagId}
    />;

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