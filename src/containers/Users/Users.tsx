import React, { useEffect, useState } from 'react';
import styles from './Users.module.scss';
import UserCard from '../../components/UserCard/UserCard';
import { UsersResponse, User } from '../../types/types';

const USERS_API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async (currentPage: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${USERS_API_URL}?page=${currentPage}&count=5`);
            if (!response.ok) {
                throw new Error('Помилка при завантаженні користувачів');
            }
            const data: UsersResponse = await response.json();
            if (data.success) {
                setUsers((prevUsers) => [...prevUsers, ...data.users]);
                setTotalPages(data.total_pages);
            } else {
                throw new Error('Не вдалося отримати дані користувачів');
            }
        } catch (err: any) {
            setError(err.message || 'Сталася помилка');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handleShowMore = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <section className={styles.mainContainer}>
            <h1>Working with GET request</h1>
            <div className={styles.usersContainer}>
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
            {loading && <p>Завантаження...</p>}
            {error && <p>{error}</p>}
            {page < totalPages && !loading && !error && (
                <button onClick={handleShowMore}>Показати більше</button>
            )}
        </section>
    );
};

export default Users;
