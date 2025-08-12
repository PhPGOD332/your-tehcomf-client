'use client'
import React, {useState} from 'react';
import styles from './PhraseOrder.module.scss';
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";
import PopupForm from "@/widgets/PopupForm/PopupForm";

const PhraseOrder = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='container'>
            <PopupForm
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                isPopup={true}
            />
            <div className={styles.wrapper}>
                <MiniTitle classNames={styles.caption}>Не выбирайте из того что есть — создавайте исключительно для себя!</MiniTitle>
                <GreenButton classNames={`${styles.orderButton}`} onClick={() => setIsModalOpen(true)}>Заказать проект</GreenButton>
            </div>
        </div>
    );
};

export default PhraseOrder;