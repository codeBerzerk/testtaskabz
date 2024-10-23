import React from 'react';
import styles from './RadioGroup.module.scss';

interface RadioOption {
    id: number;
    name: string;
}

interface RadioGroupProps {
    options: RadioOption[];
    selectedOption: number | null;
    onChange: (id: number) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedOption, onChange }) => {
    return (
        <div className={styles['radio-group']}>
            {options.map((option) => (
                <div key={option.id} className={styles['radio-container']}>
                    <input
                        type="radio"
                        id={`position-${option.id}`}
                        name="position"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => onChange(option.id)}
                        className={styles['radio-input']}
                    />
                    <label htmlFor={`position-${option.id}`}>
                        <div className={styles['radio-custom']}></div>
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default RadioGroup;
