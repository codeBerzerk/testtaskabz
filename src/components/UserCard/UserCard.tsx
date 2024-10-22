import React from 'react';
import styles from './UserCard.module.scss';
import { User } from '../../types/types';

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <div className={styles.userCard}>
            <img src={user.photo} alt={user.name} className={styles.userPhoto} />
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userPosition}>{user.position}</p>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userPhone}>{user.phone}</p>
        </div>
    );
};

export default UserCard;
