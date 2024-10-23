import React from 'react';
import styles from './TestAssignment.module.scss';
import Button from '../../components/Button/Button';
import {scrollToSignUp} from "../Header/Header";

const MainBlock: React.FC = () => {
    return (
        <section className={styles.mainBlock}>
            <div className={styles.textContainer}>
            <h1 className={styles.title}>Test assignment for front-end developer</h1>
            <p className={styles.description}>
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
                understanding of User design thinking as they'll be building web interfaces with accessibility in mind.
                They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </p>
            <div className={styles.buttonContainer}>
                <Button onClick={scrollToSignUp}>Sign Up</Button>
            </div>
            </div>
        </section>
    );
};

export default MainBlock;
