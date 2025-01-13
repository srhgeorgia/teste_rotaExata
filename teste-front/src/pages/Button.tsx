import React from 'react';
import styles from '../styles/Button.module.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {label}
    </button>
  );
};
