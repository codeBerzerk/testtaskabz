import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
    return <div className={styles.loader} aria-label="Loading"></div>;
};

export default Loader;
