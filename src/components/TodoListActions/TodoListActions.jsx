import { RiRefreshLine, RiDeleteBin2Line } from 'react-icons/ri';
import Button from '../Button/Button';
import styles from './TodoListActions.module.css';

const TodoListActions = ({ delAllHandler, delComplHandler, hasComplete }) => {
  return (
    <div className={styles.todoAcitonsContainer}>
      <Button
        onClickHandler={delAllHandler}
        title="Reset todos"
      >
        <RiRefreshLine />
      </Button>
      <Button
        onClickHandler={delComplHandler}
        title="Clear complete"
        disabled={!hasComplete}
      >
        <RiDeleteBin2Line />
      </Button>
    </div>
  );
};

export default TodoListActions;
