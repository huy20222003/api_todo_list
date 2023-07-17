import { memo } from "react";
import Content from "../../Components/layoutContent/Content";
import AddTodoForm from "../../Components/Form/AddTodoForm";
import EditTodoForm from "../../Components/Form/EditTodoForm";
import Modal from "../../Components/Form/Modal/Modal";
import styles from './Dashboard.module.css';


const Dashboard = ()=> {

    return(
        <div className="">
            <div className={styles.contentContainer}>
                <Content />
            </div>
            <AddTodoForm />
            <EditTodoForm />     
            <Modal />
        </div>
    );
}

export default memo(Dashboard);