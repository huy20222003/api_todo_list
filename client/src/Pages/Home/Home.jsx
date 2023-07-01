import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <Link to="/" className={styles.logo}>
                        Todo List
                    </Link>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to = '/auth/login' className={styles.buttonItem}>
                        <i className={`fa-solid fa-right-to-bracket ${styles.buttonItemIcon}`}></i>
                        <button className={styles.button}>Login</button>
                    </Link>
                    <Link to = '/auth/register' className={styles.buttonItem}>
                        <i className={`fa-solid fa-user ${styles.buttonItemIcon}`}></i>
                        <button className={styles.button}>Register</button>
                    </Link>
                </div>
            </div>
            <div>
                <div className={styles.imageContainer}>
                    <h2 className={styles.titleOnImage}>TODO LIST</h2>
                </div>
                <div className={styles.aboutContainer}>
                    <h2 className={styles.aboutTitle}>About</h2>
                    <div className={styles.aboutDescription}>
                        <p className={styles.aboutDescriptionItem}>
                            A "todolist" is a tool that helps individuals and teams keep track of tasks and goals that need to be accomplished. 
                            It provides a structured way to organize and prioritize work, ensuring that important tasks are not overlooked. 
                            By creating a todolist, you can effectively manage your workload, set deadlines, and monitor progress. 
                            Whether it's for personal use or team collaboration, a todolist serves as a visual representation of your tasks, helping you stay focused, productive, and organized.
                        </p>
                        <p className={styles.aboutDescriptionItem}>
                            The benefits of using a todolist are numerous. 
                            Firstly, it helps you maintain clarity and focus by outlining the tasks you need to complete. 
                            It allows you to break down larger projects into smaller, manageable steps, making them less overwhelming. 
                            Secondly, a todolist enables you to prioritize your tasks, ensuring that you tackle the most important and time-sensitive ones first. 
                            This helps improve productivity and efficiency. Additionally, a todolist serves as a reminder system, preventing you from forgetting important tasks or deadlines. 
                            It also provides a sense of accomplishment as you check off completed tasks, motivating you to continue working towards your goals. 
                            Overall, a todolist is an invaluable tool for personal and professional organization, aiding in time management and goal achievement.
                        </p>
                    </div>
                    {/* <div>
                        <img src="../../assets/images/image_todo1" alt="Image" />
                        <img src="../../assets/images/image_todo2" alt="Image" />
                        <img src="../../assets/images/image_todo3" alt="Image" />
                    </div> */}
                </div>
            </div>
            <footer className={styles.footerContainer}>
                <h2 className={styles.footerDescription}>Copyright © 2023 Huy Nguyen</h2>
            </footer>
        </>
    );
}

export default Home;