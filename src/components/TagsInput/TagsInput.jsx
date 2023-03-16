import styles from './TagsInput.module.css';

const TagsInput = ({tags, setTags}) => {
    const addTag = (e) => {
        e.preventDefault();
        setTags([...tags, '']);
    }

    const editTag = (value, i) => {
        const currentTags = [...tags];
        currentTags[i] = value;
        setTags(currentTags);
    }

    return (
        <div>
            <button onClick={addTag}>+</button>
            {tags.map((tag, i) => <input key={i} value={tag} onChange={(e) => editTag(e.target.value, i)}></input>)}
        </div>
    );
}

export default TagsInput;