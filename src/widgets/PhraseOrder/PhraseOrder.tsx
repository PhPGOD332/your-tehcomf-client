import React from 'react';
import styles from './PhraseOrder.module.scss';
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";

const PhraseOrder = () => {
    return (
        <div className='container'>
            <div className={styles.wrapper}>
                <MiniTitle>Не выбирайте из того что есть — создавайте исключительно для себя!</MiniTitle>
                <GreenButton classNames={`${styles.orderButton}`}>Заказать проект</GreenButton>
            </div>
        </div>
    );
};

export default PhraseOrder;