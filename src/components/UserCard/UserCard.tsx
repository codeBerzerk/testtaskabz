import React, { useState } from 'react';
import styles from './UserCard.module.scss';
import { User } from '../../types/types';
import PhotoCover from '../../assets/photo-cover.svg';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const [imgSrc, setImgSrc] = useState<string>(user.photo || PhotoCover);
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number }>({
        visible: false,
        x: 0,
        y: 0,
    });

    const handleImageError = () => {
        setImgSrc(PhotoCover);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({
            visible: false,
            x: 0,
            y: 0,
        });
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
            <div className={styles.emailContainer}>
                <p
                    className={styles.userEmail}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {user.email}
                </p>
                {tooltip.visible && (
                    <div
                        className={styles.tooltip}
                        style={{ top: tooltip.y + 10, left: tooltip.x }}
                    >
                        {user.email}
                    </div>
                )}
            </div>
            <p className={styles.userPhone}>{user.phone}</p>
        </div>
    );
};

export default UserCard;
