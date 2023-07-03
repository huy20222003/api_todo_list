import { memo } from 'react';
import Header from '../../Components/layoutHome/Header';
import Footer from '../../Components/layoutHome/Footer';
import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.container}> 
            <div className={styles.headerContainer}>
                < Header/>
            </div>
            <div>
                <div className={styles.imageContainer}>
                    <svg className={styles.svg}>
                        <text className={styles.text} x="50%" y="50%" dy=".35em" textAnchor="middle">
                            TODO LIST
                        </text>
                    </svg>
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
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default memo(Home);