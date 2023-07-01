import Content from "../../Components/layoutContent/Content";
import AddTodoForm from "../../Components/Form/AddTodoForm";
import EditTodoForm from "../../Components/Form/EditTodoForm";
import styles from './Dashboard.module.css';


const Dashboard = ()=> {

    return(
        <div className="">
            <div className={styles.contentContainer}>
                <Content />
            </div>
            <AddTodoForm />
            <EditTodoForm />      
        </div>
    );
}

export default Dashboard;