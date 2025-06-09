'use client'
import React from 'react';
import styles from './OrderForms.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";
import TextInput from "@/shared/UI/TextInput/TextInput";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import Image from "next/image";
import TextArea from "@/shared/UI/TextArea/TextArea";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";

const OrderForms = () => {
    const showForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        const parent = e.currentTarget?.parentElement;
        const grandParent = parent?.parentElement;
        const childGrandParent = grandParent?.children.item(1);

        if (!parent) return;

        parent.classList.toggle(styles.hidden);
        parent.classList.toggle(styles.visible);

        if (!grandParent || !childGrandParent) return;

        childGrandParent.classList.toggle(styles.visible);
        childGrandParent.classList.toggle(styles.hidden);
    }

    const formSubmit = () => {

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.formsWrapper}>
                <SubTitle color={TitleColors.WHITE}>От слов — к делу</SubTitle>
                <div className={styles.formsBlock}>
                    <div className={styles.formItem}>
                        <div className={`${styles.formPreview} ${styles.visible}`}>
                            <Image
                                src={'/icons/track-icon.svg'}
                                alt={''}
                                className={styles.previewIcon}
                                width={256}
                                height={256}
                            />
                            {/*<img src="/icons/track-icon.svg" alt="" className={styles.previewIcon}/>*/}
                            <MiniTitle classNames={styles.previewTitle}>Я хочу замерить помещение и проконсультироваться с
                                дизайнером</MiniTitle>
                            <span className={styles.explanationText}>
                            Наш специалист приедет к вам с рулеткой,
                            блокнотом и кучей идей. Обсудим, что вам нравится, померяем пространство и вместе
                            придумаем, как реализовать вашу мечту
                        </span>
                            <ul className={styles.previewList}>
                                <li>
                                    <Image
                                        src='/icons/check-green.svg'
                                        alt={''}
                                        className={styles.checkImage}
                                        width={24}
                                        height={24}
                                    />
                                    {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                                    <span>Бесплатный выезд</span>
                                </li>
                                <li>
                                    <Image
                                        src='/icons/check-green.svg'
                                        alt={''}
                                        className={styles.checkImage}
                                        width={24}
                                        height={24}
                                    />
                                    {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                                    <span>Экспертная консультация</span>
                                </li>
                                <li>
                                    <Image
                                        src='/icons/check-green.svg'
                                        alt={''}
                                        className={styles.checkImage}
                                        width={24}
                                        height={24}
                                    />
                                    {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
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
                                <TextArea
                                    placeholder='Ваши пожелания или любая информация, который хотите поделиться'
                                    label='Примечание'
                                    rows={3}
                                ></TextArea>
                            </div>
                            <div className={styles.submitBlock}>
                                <span className={styles.personalText}>Я согласен(на) на <a href="#" className='underline'>обработку персональных данных</a></span>
                                <DragAndDropButton />
                            </div>
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <div className={`${styles.formPreview} ${styles.visible}`}>
                            <Image
                                src={'/icons/3dmodeling-icon.svg'}
                                alt={''}
                                className={styles.previewIcon}
                                width={256}
                                height={256}
                            />
                            {/*<img src="/icons/3dmodeling-icon.svg" alt="" className={styles.previewIcon}/>*/}
                            <MiniTitle classNames={styles.previewTitle}>У меня уже есть все замеры, и я хочу визуализировать
                                и создать красивый 3D-проект</MiniTitle>
                            <span className={styles.explanationText}>
                            Превратим ваши &quot;хочу&quot; в 3D-проект с продуманными деталями. Вы увидите, как всё будет
                            выглядеть, прежде чем мы начнём работу. Возможны правки и консультация
                        </span>
                            <ul className={styles.previewList}>
                                <li>
                                    <Image
                                        src='/icons/check-green.svg'
                                        alt={''}
                                        className={styles.checkImage}
                                        width={24}
                                        height={24}
                                    />
                                    {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                                    <span>Бесплатно онлайн</span>
                                </li>
                                <li>
                                    <Image
                                        src='/icons/check-green.svg'
                                        alt={''}
                                        className={styles.checkImage}
                                        width={24}
                                        height={24}
                                    />
                                    {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                                    <span>Бесплатные правки</span>
                                </li>
                                <li>
                                    <Image
                                        src='/icons/check-green.svg'
                                        alt={''}
                                        className={styles.checkImage}
                                        width={24}
                                        height={24}
                                    />
                                    {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                                    <span>Помощь с выбором материалов</span>
                                </li>
                            </ul>
                            <GreenButton onClick={(e) => showForm(e)} classNames={`${styles.orderButton}`}>Заказать проект</GreenButton>
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
                                <TextArea
                                    placeholder='Ваши пожелания или любая информация, который хотите поделиться'
                                    label='Примечание'
                                    rows={3}
                                ></TextArea>
                            </div>
                            <div className={styles.submitBlock}>
                                <span className={styles.personalText}>Я согласен(на) на <a href="#" className='underline'>обработку персональных данных</a></span>
                                <DragAndDropButton formSubmit={formSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForms;