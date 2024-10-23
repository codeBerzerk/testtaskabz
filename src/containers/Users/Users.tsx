import React, { useEffect, useState } from 'react';
import styles from './Users.module.scss';
import UserCard from '../../components/UserCard/UserCard';
import { UsersResponse, User } from '../../types/types';
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

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
        const count = currentPage === 1 ? 6 : 6;
        try {
            const response = await fetch(`${USERS_API_URL}?page=${currentPage}&count=${count}`);
            if (!response.ok) {
                throw new Error('Помилка при завантаженні користувачів');
            }
            const data: UsersResponse = await response.json();
            if (data.success) {
                const sortedUsers = data.users.sort(
                    (a, b) => b.registration_timestamp - a.registration_timestamp
                );
                setUsers((prevUsers) => [...prevUsers, ...sortedUsers]);
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
        <section id="users" className={styles.mainContainer}>
            <h1>Working with GET request</h1>
            <div className={styles.usersContainer}>
                {users.map((user, index) => (
                    <UserCard key={`${user.id}-${index}`} user={user}/>
                ))}
            </div>
            {loading && (
                <div className={styles.loaderContainer}>
                    <Loader/>
                </div>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {page < totalPages && !loading && !error && (
                <Button onClick={handleShowMore} disabled={loading}>Show more</Button>
            )}
        </section>
    );
};

export default Users;
