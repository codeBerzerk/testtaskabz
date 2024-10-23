import React from 'react';
import styles from "./InputField.module.scss"

interface InputFieldProps {
    type: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, onBlur, error }) => {
    return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`${styles['input-field']} ${error ? styles['input-error'] : ''}`}
            />
    );
};

export default InputField;
