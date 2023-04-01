import styles from './TagsSection.module.css';

const TagsSection = ({ tags }) => {
  const tagsElem = tags.map((tag) => <li key={tag.id}>#{tag.text}</li >);

  return (
    <div className={styles.tagsSection}>
      {tagsElem}
    </div>
  );
};

export default TagsSection;