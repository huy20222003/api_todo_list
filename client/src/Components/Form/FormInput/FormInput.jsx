import styles from './FormInput.module.css';

const FormInput = ({ textName, icon, type, placeholder, onChange, textarea, readOnly, ...otherProps }) => {
  const Element = textarea ? 'textarea' : 'input';

  return (
    <div className='formElements'>
      <label htmlFor={textName} className='label'>
        {textName.charAt(0).toUpperCase() + textName.slice(1)}
      </label>
      <div className={readOnly ? `${styles.inputContainer} ${styles.bgReadOnly}` : `${styles.inputContainer}`}>
        <i className={icon}></i>
        <Element
          type={type}
          id={textName}
          name={textName}
          onChange={onChange}
          className={readOnly ? `${styles.formElementInput} ${styles.bgReadOnly}` : `${styles.formElementInput}`}
          placeholder={placeholder}
          readOnly = {readOnly}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default FormInput;
