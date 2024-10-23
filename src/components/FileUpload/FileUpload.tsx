import React, { useState } from 'react';
import styles from './FileUpload.module.scss';

interface FileUploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
    const [fileName, setFileName] = useState<string>('Upload your photo');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            onChange(e);
        }
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
                className={styles['file-input']}
            />
            <span className={styles['file-name']}>{fileName}</span>
        </div>
    );
};

export default FileUpload;
