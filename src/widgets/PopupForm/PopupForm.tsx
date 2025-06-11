import React, {useRef} from 'react';
import styles from './PopupForm.module.scss';
import TextInput from "@/shared/UI/TextInput/TextInput";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import TextArea from "@/shared/UI/TextArea/TextArea";
import Link from "next/link";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const PopupForm = (
    {
        isOpen,
        setIsOpen,
    }: PopupProps) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    if (isOpen) {
        document.body.classList.add('overflowYHidden');
    }

    const submitHandler = () => {
        const timeout = setTimeout(() => {
            setIsOpen(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }

    return (
        <div
            className={`${styles.popupWrapper} ${!isOpen ? styles.popupWrapper_hidden : ''}`}
            ref={popupRef}
        >
            <form className={styles.popupContent}>
                <div className={styles.chooseBlock}>
                    <div className={styles.choseItem}>
                        <label htmlFor="">
                            asdfdsaf
                            <input type="checkbox"/>
                        </label>
                    </div>
                    <div className={styles.choseItem}>

                    </div>
                </div>
                <div className={styles.inputsBlock}>
                    <TextInput
                        label={'Имя'}
                        placeholder={'Иван'}
                    />
                    <MaskedInput
                        label='Телефон'
                        mask='+7 (___) ___-__-__'
                        replacement={{_: /[1-9]/}}
                        placeholder='+7 (000) 000-00-00'
                    />
                    <TextArea
                        placeholder='Ваши пожелания или любая информация, который хотите поделиться'
                        label='Примечание'
                        rows={3}
                    ></TextArea>
                </div>
                <div className={styles.submitBlock}>
                    <span className={styles.politicsSpan}>Я согласен(на) на <Link className={`${styles.link}`} href={'#'} >обработку персональных данных</Link></span>
                    <DragAndDropButton
                        formSubmit={submitHandler}
                    />
                </div>
            </form>
        </div>
    );
};

export default PopupForm;