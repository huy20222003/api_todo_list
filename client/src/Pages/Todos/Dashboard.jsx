import { memo } from 'react';
import Content from '../../Components/layoutContent/Content';
import AddTodoForm from '../../Components/Form/AddTodoForm';
import EditTodoForm from '../../Components/Form/EditTodoForm';
import Modal from '../../Components/Form/Modal/Modal';
import styles from './Dashboard.module.css';
import useAuthCheck from '../../customHook/useAuthCheck';

const Dashboard = () => {
  //useAuthCheck();

  return (
    <div className="">
      <div className={styles.contentContainer}>
        <Content />
      </div>
      <AddTodoForm />
      <EditTodoForm />
    </div>
  );
};

export default memo(Dashboard);
