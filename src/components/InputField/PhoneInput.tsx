import React from 'react';
import InputMask from 'react-input-mask';
import styles from './InputField.module.scss';

interface PhoneInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error, onBlur }) => {
    return (
        <InputMask
            mask="+38 (999) 999 - 99 - 99"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`${styles['input-field']} ${error ? styles['input-error'] : ''}`}
            placeholder="Phone"
        />
    );
};

export default PhoneInput;
