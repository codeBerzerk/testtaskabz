import React from 'react';
import Button from '../../components/Button/Button';
import styles from './Header.module.scss';
import Logo from '../../assets/Logo.svg';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <img src={Logo} alt="Logo" className={styles.logo} />
                <div className={styles.buttonGroup}>
                    <Button>Sign up</Button>
                    <Button>Users</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
