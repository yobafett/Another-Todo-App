import styles from './Button.module.css';


const Button = ({ children, onClickHandler, title, disabled = false }) => {
    return (
        <button
            className={styles.todoButton}
            onClick={onClickHandler}
            title={title}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;