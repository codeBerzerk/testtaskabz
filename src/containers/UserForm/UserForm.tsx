import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../../components/InputField/InputField';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import FileUpload from '../../components/FileUpload/FileUpload';
import Button from "../../components/Button/Button";
import successImage from "../../assets/success-image.svg"
import styles from './UserForm.module.scss';

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';
const POSITIONS_URL = `${API_URL}positions`;
const USERS_URL = `${API_URL}users`;
const TOKEN_URL = `${API_URL}token`;

interface Position {
    id: number;
    name: string;
}

const UserForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [positions, setPositions] = useState<Position[]>([]);
    const [positionId, setPositionId] = useState<number | null>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);  // Додаємо стан для успішного відправлення форми

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await axios.get(POSITIONS_URL);
                setPositions(response.data.positions);
                setPositionId(response.data.positions[0]?.id || null);
            } catch (error) {
                console.error('Помилка при завантаженні позицій', error);
            }
        };
        fetchPositions();
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await axios.get(TOKEN_URL);
                setToken(response.data.token);
            } catch (error) {
                console.error('Помилка при отриманні токена', error);
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        const validateForm = () => {
            const newErrors: any = {};

            if (!name || name.length < 2) {
                newErrors.name = 'Name must be at least 2 characters long';
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                newErrors.email = 'Please enter a valid email';
            }

            const phoneRegex = /^\+380\d{9}$/;
            if (!phone || !phoneRegex.test(phone)) {
                newErrors.phone = '+38 (XXX) XXX - XX - XX';
            }

            if (!photo) {
                newErrors.photo = 'Please upload a photo';
            }

            setErrors(newErrors);
            setIsValid(Object.keys(newErrors).length === 0);
        };

        validateForm();

    }, [name, email, phone, photo]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid || !token || !positionId) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('position_id', positionId.toString());
        formData.append('photo', photo!);

        try {
            const response = await axios.post(USERS_URL, formData, {
                headers: {
                    'Token': token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Успішна реєстрація:', response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Помилка при відправленні форми:', error);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.successContainer}>
                <img src={successImage} alt="Success" />
                <h1>Thank you for your submission!</h1>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={styles.userForm}>
            <h1>Working with POST request</h1>
            <div className={styles.formGroup}>
                <InputField
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                />
                {errors.name && <p className={styles['error-text']}>{errors.name}</p>}
            </div>
            <div className={styles['form-group']}>
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />
                {errors.email && <p className={styles['error-text']}>{errors.email}</p>}
            </div>
            <div className={styles['form-group']}>
                <InputField
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                />
                {errors.phone && <p className={styles['error-text']}>{errors.phone}</p>}
            </div>
            <RadioGroup
                options={positions}
                selectedOption={positionId}
                onChange={(id) => setPositionId(id)}
            />
            <div className={styles['form-group']}>
                <FileUpload onChange={handlePhotoChange} />
                {errors.photo && <p className={styles['error-text']}>{errors.photo}</p>}
            </div>
            <Button type="submit" disabled={!isValid}>
                Sign up
            </Button>
        </form>
    );
};

export default UserForm;
