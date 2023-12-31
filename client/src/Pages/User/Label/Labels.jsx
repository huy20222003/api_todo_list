import React, { useContext, Suspense } from 'react';
import { LabelsContext } from '../../../Context/LabelsContext';
import HeaderContent from '../../../Components/layoutContent/HeaderContent';
const LabelItem = React.lazy(() =>
  import('../../../Components/layoutLabelPage/LabelItem')
);
import AddLabelForm from '../../../Components/Form/AddLabelForm';
import EditLabelForm from '../../../Components/Form/EditLabelForm';
import Loader from '../../../Components/Loader/Loader';
import styles from './Labels.module.css';

const Labels = () => {
  const { setShowAddLabel } = useContext(LabelsContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderContent />
      </div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>List Label</h2>
        </div>
        <div className={styles.labelList}>
          <Suspense fallback={<Loader />}>
            <LabelItem />
          </Suspense>
        </div>
        <div className={styles.addButtonContainer}>
          <span data-tooltip="Add new Label!" data-flow="top">
            <i
              className={`fa-solid fa-plus ${styles.addButton}`}
              onClick={() => setShowAddLabel(true)}
            ></i>
          </span>
        </div>
      </div>
      <AddLabelForm />
      <EditLabelForm />
    </div>
  );
};

export default Labels;
