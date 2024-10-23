// FileUpload.tsx
import React, { useState } from 'react';
import styles from './FileUpload.module.scss';

interface FileUploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, onBlur }) => {
    const [displayName, setDisplayName] = useState<string>('Upload your photo');
    const [extension, setExtension] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const originalName = e.target.files[0].name;
            const { truncatedName, fileExtension } = formatFileName(originalName);
            setDisplayName(truncatedName);
            setExtension(fileExtension);
            onChange(e);
        }
    };

    // Функція для обрізання назви файлу посередині
    const formatFileName = (name: string) => {
        const maxLength = 30; // Максимальна довжина відображуваного імені
        if (name.length <= maxLength) {
            return { truncatedName: name, fileExtension: '' };
        }
        const extIndex = name.lastIndexOf('.');
        const extension = name.substring(extIndex);
        const nameWithoutExt = name.substring(0, extIndex);
        const charsToShow = maxLength - extension.length - 3; // 3 символи для '...'
        const frontChars = Math.ceil(charsToShow / 2);
        const backChars = Math.floor(charsToShow / 2);
        const truncatedName =
            nameWithoutExt.substring(0, frontChars) +
            '...' +
            nameWithoutExt.substring(nameWithoutExt.length - backChars);
        return { truncatedName, fileExtension: extension };
    };

    return (
        <div className={styles['file-upload']}>
            <label htmlFor="fileInput" className={styles['upload-button']}>
                Upload
            </label>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={onBlur}
                className={styles['file-input']}
            />
            <div className={styles['file-name']}>
                <span className={styles['file-name__text']}>{displayName}</span>
                <span className={styles['file-name__extension']}>{extension}</span>
            </div>
        </div>
    );
};

export default FileUpload;
