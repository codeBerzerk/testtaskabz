import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, error }) => {
    return (
        <div className={styles['input-wrapper']}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${styles['input-field']} ${error ? styles['input-error'] : ''}`}
            />
        </div>
    );
};

export default InputField;
