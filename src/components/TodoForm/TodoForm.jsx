import { useState } from 'react';
import Button from '../Button/Button';
import TagsInput from '../TagsInput/TagsInput';
import styles from './TodoForm.module.css';

const TodoForm = ({ addTodo }) => {
    const [inputText, setInputText] = useState('');
    const [tags, setTags] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        setInputText('');
        addTodo(inputText, tags);
        setTags([]);
    }

    const tagSection = inputText.length > 0 ? (
        <div className={styles.tagsInput}>
            <TagsInput tags={tags} setTags={setTags} />
        </div>
    ) : null;

    return (
        <div className={styles.formWrapper}>
            <form>
                <div className={styles.textInput}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter new todo..."
                    />
                    <Button
                        onClickHandler={submitHandler}
                        title="Add todo"
                        disabled={inputText.length === 0}
                    >
                        Submit
                    </Button>
                </div>
                {tagSection}
            </form>
        </div>
    );
}

export default TodoForm;