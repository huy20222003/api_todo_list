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

  const handleGoBack = () => {
    history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderContent />
      </div>
      <div className={styles.content}>
        <div className={styles.backButtonContainer} onClick={handleGoBack}>
          <i className={`fa-solid fa-arrow-left ${styles.backButton}`}></i>
          <span className={styles.backButtonDescription}>Back</span>
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
