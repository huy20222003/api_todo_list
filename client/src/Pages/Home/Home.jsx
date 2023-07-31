import { memo } from 'react';
import Header from '../../Components/layoutHome/Header';
import Footer from '../../Components/layoutHome/Footer';
import image_todo1 from '../../assets/images/image_todo1.jpg';
import image_todo2 from '../../assets/images/image_todo2.jpg';
import image_todo3 from '../../assets/images/image_todo3.jpg';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header />
      </div>
      <div>
        <div className={styles.imageContainer}>
          <svg className={styles.svg}>
            <text
              className={styles.text}
              x="50%"
              y="50%"
              dy=".35em"
              textAnchor="middle"
            >
              TODO LIST
            </text>
          </svg>
        </div>
        <div className={styles.aboutContainer}>
          <h2 className={styles.aboutTitle}>About</h2>
          <div className={styles.aboutDescription}>
            <p className={styles.aboutDescriptionItem}>
              A "todolist" is a tool that helps individuals and teams keep track
              of tasks and goals that need to be accomplished. It provides a
              structured way to organize and prioritize work, ensuring that
              important tasks are not overlooked. By creating a todolist, you
              can effectively manage your workload, set deadlines, and monitor
              progress. Whether it's for personal use or team collaboration, a
              todolist serves as a visual representation of your tasks, helping
              you stay focused, productive, and organized.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.aboutContainer}>
        <h2 className={styles.aboutTitle}>Image</h2>
        <div className={styles.listImageContainer}>
          <img
            src={image_todo1}
            className={styles.listImageItem}
            alt="image_todo1"
          />
          <img
            src={image_todo2}
            className={styles.listImageItem}
            alt="image_todo2"
          />
          <img
            src={image_todo3}
            className={styles.listImageItem}
            alt="image_todo3"
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default memo(Home);
