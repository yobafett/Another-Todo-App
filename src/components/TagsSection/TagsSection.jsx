import classNames from 'classnames';

import styles from './TagsSection.module.css';

const TagsSection = ({ tags, activeTagHandler, activeTagId }) => {
  const tagsElem = tags.map((tag) =>
    <li
      className={
        classNames({
          [styles.activeTag]: activeTagId === tag.id,
        })
      }
      onClick={() => activeTagHandler(tag.id)}
      key={tag.id}
    >#{tag.text}
    </li >
  );



  return (
    <div className={styles.tagsSection}>
      {tagsElem}
    </div>
  );
};

export default TagsSection;