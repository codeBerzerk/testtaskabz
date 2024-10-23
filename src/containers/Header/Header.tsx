import React from 'react';
import Button from '../../components/Button/Button';
import styles from './Header.module.scss';
import Logo from '../../assets/Logo.svg';

export const scrollToSignUp = () => {
    const element = document.getElementById("signUp");
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const scrollToUsers = () => {
    const element = document.getElementById("users");
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <img src={Logo} alt="Logo" className={styles.logo} />
                <div className={styles.buttonGroup}>
                    <Button onClick={scrollToSignUp}>Sign up</Button>
                    <Button onClick={scrollToUsers}>Users</Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
