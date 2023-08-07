import { memo } from 'react';
import styles from './Button.module.css';

const Button = ({ textName, type, size, color, onClick, ...otherProps }) => {
    const buttonClasses = [
        styles.button,
        size === 'large' ? styles.large : size === 'small' ? styles.small : '',
        color === 'primary' ? styles.primary : color === 'error' ? styles.error : styles.default,
      ].join(' ');
  return (
    <button type={type} className={buttonClasses} onClick={onClick} {...otherProps}>
      {textName}
    </button>
  );
};

export default memo(Button);
