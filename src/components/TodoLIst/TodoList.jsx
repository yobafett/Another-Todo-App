import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

const TodoList = ({ todos, deleteTodo, completeTodo, completeCount, activeTagHandler }) => {
  return (
    <div className={styles.todoListContainer}>
      {todos.length > 0 ? null : <h2>Todo is empty</h2>}
      {todos.map((todo) =>
        <Todo
          key={todo.id}
          text={todo.text}
          tags={todo.tags}
          complete={todo.complete}
          completeHandler={() => completeTodo(todo.id)}
          deleteHandler={() => deleteTodo(todo)}
          activeTagHandler={activeTagHandler}
        />)}
      {completeCount <= 0 ? null : <h2>You have completed {completeCount} todo!</h2>}
    </div>
  );
};

export default TodoList;