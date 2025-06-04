'use client'
import React from 'react';
import styles from './OrderForms.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";
import TextInput from "@/shared/UI/TextInput/TextInput";
import {InputMask} from "@react-input/mask";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";

const OrderForms = () => {
    const showForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.parentElement.classList.toggle(styles.hidden);
        e.currentTarget.parentElement.classList.toggle(styles.visible);
        e.currentTarget.parentElement.parentElement.children.item(1).classList.toggle(styles.visible);
        e.currentTarget.parentElement.parentElement.children.item(1).classList.toggle(styles.hidden);
    }

    return (
        <div className={styles.wrapper}>
            <SubTitle color={TitleColors.WHITE}>От слов — к делу</SubTitle>
            <div className={styles.formsBlock}>
                <div className={styles.formItem}>
                    <div className={`${styles.formPreview} ${styles.visible}`}>
                        <img src="/icons/track-icon.svg" alt="" className={styles.previewIcon}/>
                        <MiniTitle classNames={styles.previewTitle}>Я хочу замерить помещение и проконсультироваться с
                            дизайнером</MiniTitle>
                        <span className={styles.explanationText}>
                            Наш специалист приедет к вам с рулеткой,
                            блокнотом и кучей идей. Обсудим, что вам нравится, померяем пространство и вместе
                            придумаем, как реализовать вашу мечту
                        </span>
                        <ul className={styles.previewList}>
                            <li>
                                <img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>
                                <span>Бесплатный выезд</span>
                            </li>
                            <li>
                                <img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>
                                <span>Экспертная консультация</span>
                            </li>
                            <li>
                                <img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>
                                <span>Образцы материалов и цветов</span>
                            </li>
                        </ul>
                        <GreenButton
                            classNames={`${styles.orderButton}`}
                            onClick={(e) => showForm(e)}
                        >
                            Заказать проект
                        </GreenButton>
                    </div>
                    <div className={`${styles.formMain} ${styles.hidden}`}>
                        <div className={styles.inputsBlock}>
                            <TextInput
                                label='Имя'
                                placeholder='Иван Петров'
                            />
                            <MaskedInput
                                label='Телефон'
                                mask='+7 (___) ___-__-__'
                                replacement={{_: /[1-9]/}}
                                placeholder='+7 (000) 000-00-00'
                            />
                        </div>
                        <div className={styles.submitBlock}>
                            <span className={styles.personalText}>Я согласен(на) на <a href="#" className='underline'>обработку персональных данных</a></span>
                        </div>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles.formPreview}>
                        <img src="/icons/3dmodeling-icon.svg" alt="" className={styles.previewIcon}/>
                        <MiniTitle classNames={styles.previewTitle}>У меня уже есть все замеры, и я хочу визуализировать
                            и создать красивый 3D-проект</MiniTitle>
                        <span className={styles.explanationText}>
                        Превратим ваши "хочу" в 3D-проект с продуманными деталями. Вы увидите, как всё будет
                        выглядеть, прежде чем мы начнём работу. Возможны правки и консультация
                    </span>
                        <ul className={styles.previewList}>
                            <li>
                                <img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>
                                <span>Бесплатно онлайн</span>
                            </li>
                            <li>
                                <img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>
                                <span>Бесплатные правки</span>
                            </li>
                            <li>
                                <img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>
                                <span>Помощь с выбором материалов</span>
                            </li>
                        </ul>
                        <GreenButton classNames={`${styles.orderButton}`}>Заказать проект</GreenButton>
                    </div>
                    <div className={styles.formMain}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForms;