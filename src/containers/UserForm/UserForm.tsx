import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from '../../components/InputField/InputField';
import RadioGroup from '../../components/RadioGroup/RadioGroup';
import FileUpload from '../../components/FileUpload/FileUpload';
import Button from "../../components/Button/Button";
import PhoneInput from "../../components/InputField/PhoneInput";
import successImage from "../../assets/success-image.svg";
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
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        name: false,
        email: false,
        phone: false,
        photo: false,
    });

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

    const validateForm = () => {
        const newErrors: any = {};

        if (!name || name.length < 2 || name.length > 60) {
            newErrors.name = 'Name must be between 2 and 60 characters long';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email) || email.length > 100) {
            newErrors.email = 'Please enter a valid email (max 100 characters)';
        }

        // Очистити номер телефону від нецифрових символів
        const cleanedPhone = phone.replace(/\D/g, '');

        const phoneRegex = /^380\d{9}$/;
        if (!phone || !phoneRegex.test(cleanedPhone)) {
            newErrors.phone = 'Please enter a valid phone number in format +38 (0XX) XXX - XX - XX';
        }

        if (!photo) {
            newErrors.photo = 'Please upload a photo';
        } else {
            const allowedTypes = ['image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(photo.type)) {
                newErrors.photo = 'Photo must be a JPEG image';
            }
            const maxSize = 5 * 1024 * 1024;
            if (photo.size > maxSize) {
                newErrors.photo = 'Photo must be less than 5 MB';
            }
            const img = new Image();
            img.src = URL.createObjectURL(photo);
            img.onload = () => {
                if (img.width < 70 || img.height < 70) {
                    setErrors((prevErrors: any) => ({
                        ...prevErrors,
                        photo: 'Photo resolution must be at least 70x70 pixels',
                    }));
                    setIsValid(false);
                }
            };
        }

        return newErrors;
    };

    useEffect(() => {
        const newErrors = validateForm();
        const formIsValid = Object.keys(newErrors).length === 0;
        setIsValid(formIsValid);
        setErrors(newErrors);
    }, [name, email, phone, photo, touched]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPhoto(e.target.files[0]);
        }
        setTouched((prev) => ({ ...prev, photo: true }));
    };

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({
            name: true,
            email: true,
            phone: true,
            photo: true,
        });

        const newErrors = validateForm();
        const formIsValid = Object.keys(newErrors).length === 0;
        setErrors(newErrors);
        setIsValid(formIsValid);

        if (!formIsValid || !token || !positionId || !photo) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);

        const cleanedPhone = phone.replace(/\D/g, '');
        formData.append('phone', '+'.concat(cleanedPhone));

        formData.append('position_id', positionId.toString());
        formData.append('photo', photo);

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
            if (axios.isAxiosError(error) && error.response) {
                const apiErrors = error.response.data?.fails;
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    ...apiErrors,
                }));
            }
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
        <form id="signUp" onSubmit={handleSubmit} className={styles.userForm}>
            <h1>Working with POST request</h1>
            <div className={styles.formGroup}>
                <InputField
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur('name')}
                    error={touched.name ? errors.name : ''}
                />
                {touched.name && errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
            <div className={styles.formGroup}>
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    error={touched.email ? errors.email : ''}
                />
                {touched.email && errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
                <PhoneInput
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    error={touched.phone ? errors.phone : ''}
                />
                {touched.phone && errors.phone && <p className={styles.errorText}>{errors.phone}</p>}
            </div>
            <RadioGroup
                options={positions}
                selectedOption={positionId}
                onChange={(id) => setPositionId(id)}
            />
            <div className={styles.formGroup}>
                <FileUpload
                    onChange={handlePhotoChange}
                    onBlur={() => handleBlur('photo')}
                    error={touched.photo ? errors.photo : ''}
                    className={touched.photo && errors.photo ? styles.inputError : ''}
                />
                {touched.photo && errors.photo && <p className={styles.errorText}>{errors.photo}</p>}

            </div>
            <Button type="submit" disabled={!isValid}>
                Sign up
            </Button>
        </form>
    );
};

export default UserForm;
