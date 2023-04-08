import { RiTodoFill, RiCheckFill, RiDeleteBin2Line } from 'react-icons/ri';
import classNames from 'classnames';
import styles from './Todo.module.css';

const Todo = ({ text, tags, complete, completeHandler, deleteHandler }) => {
  const todoClasses = classNames(styles.todo, {
    [styles.completedTodo]: complete,
  });

  return (
    <div className={todoClasses}>
      <div className={styles.todoContent}>
        <RiTodoFill className={styles.todoIcon} />
        <div className={styles.todoText}>{text}</div>
        <RiDeleteBin2Line className={styles.deleteIcon} onClick={deleteHandler} />
        <RiCheckFill className={styles.checkIcon} onClick={completeHandler} />
      </div>
      <div className={styles.todoTags}>
        {tags.map((tag) => <li key={tag.id}>#{tag.text}</li>)}
      </div>
    </div>
  );
};

export default Todo;