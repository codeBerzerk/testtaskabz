import React, { useState } from 'react';
import styles from './UserCard.module.scss';
import { User } from '../../types/types';
import PhotoCover from '../../assets/photo-cover.svg';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [imgSrc, setImgSrc] = useState<string>(user.photo || PhotoCover);

    const handleImageError = () => {
        setImgSrc(PhotoCover);
    };

    return (
        <div className={styles.userCard}>
            <img
                src={imgSrc}
                alt={user.name}
                className={styles.userPhoto}
                onError={handleImageError}
            />
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userPosition}>{user.position}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userPhone}>{user.phone}</p>
        </div>
    );
};

export default UserCard;
