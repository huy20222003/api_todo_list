import { useEffect, useContext, memo } from "react";
import { LabelsContext } from "../../../Context/LabelsContext";
import styles from './LabelItem.module.css';
import Loader from "../../Loader/Loader";

const LabelItem = () => {
  const {
    getAllLabels,
    setId,
    loading,
    setLabels,
    setShowEditLabel,
    setShowModalDelete,
    labelState: {labels}
  } = useContext(LabelsContext);

  useEffect(() => {
    getAllLabels();
  }, []);

  const handleDeleteTodo = (labelId) => {
    setShowModalDelete(true);
    setId(labelId);
  };

  const handleEditTodoId = (labelId) => {
    setShowEditLabel(true);
    setLabels(labelId);
  };

  return (
    <>
      {loading ? <Loader />
       : labels.map((label) => (
          <div
            key={label._id}
            className={styles.container}
          >
            <div>
              <h3 className={styles.labelName}>{label.name}</h3>
            </div>
            <div className={styles.labelFooterContainer}>
              <div>
                <i
                  className={`fa-solid fa-pen ${styles.labelPencil}`}
                  onClick={() => handleEditTodoId(label._id)}
                ></i>
                <i
                  className={`fa-solid fa-trash ${styles.labelTrash}`}
                  onClick={() => handleDeleteTodo(label._id)}
                ></i>
              </div>
            </div>
          </div>
      ))}
    </>
  );
};

export default memo(LabelItem);
