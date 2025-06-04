'use client'
import React from 'react';
import styles from './ProjectSequence.module.scss';

interface SequenceItem {
    title: string;
    description: string;
}

const sequenceItems: SequenceItem[] = [
    {
        title: 'Обсуждение проекта',
        description: 'От вашей идеи до конкретного изделия'
    },
    {
        title: 'Подготовка эскиза',
        description: 'Максимально точный вариант с конкретными размерами'
    },
    {
        title: 'Создание 3D-проекта',
        description: 'Увидели, полюбили, согласовали'
    },
    {
        title: 'Подписание договора',
        description: 'Подписание док-ов на изготовление с четкими сроками, суммой и гарантией'
    },
    {
        title: 'Оплата авансовой части',
        description: 'Предоплата заказа и запуск производства'
    },
    {
        title: 'Производство',
        description: 'Производственный процесс изготовления мебели'
    },
    {
        title: 'Оплата второй части',
        description: 'По готовности, вторая оплата по договору и отгрузка мебели'
    },
    {
        title: 'Доставка и сборка',
        description: 'Доставка по вашему адресу и сборка мебели нашей бригадой'
    }
];

const ProjectSequence = () => {
    // const hoverOnNotify = (e: React.MouseEvent<HTMLDivElement>) => {
    //     if (e.target.) {
    //
    //     }
    //
    //     e.currentTarget.parentElement.classList.toggle(styles.)
    // }

    return (
        <div className='container'>
            <div className={styles.wrapper}>
                <ol className={styles.sequenceList}>
                    {sequenceItems.map((stage, num) =>
                        <li key={num}>
                            <div className={styles.sequenceItem}>
                                <span className={styles.sequenceTitle}>{stage.title}</span>
                                <span className={styles.sequenceDescription}>{stage.description}</span>
                            </div>
                            <div
                                className={styles.notify}
                                // onMouseEnter={(e) => hoverOnNotify(e)}
                                // onMouseLeave={(e) => hoverOnNotify(e)}
                            >
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11 0.5C5.2075 0.5 0.5 5.2075 0.5 11C0.5 16.7925 5.2075 21.5 11 21.5C16.7925 21.5 21.5 16.7925 21.5 11C21.5 5.2075 16.7925 0.5 11 0.5ZM11 19.75C6.17 19.75 2.25 15.83 2.25 11C2.25 6.17 6.17 2.25 11 2.25C15.83 2.25 19.75 6.17 19.75 11C19.75 15.83 15.83 19.75 11 19.75Z"
                                        fill="#58595B"/>
                                    <path
                                        d="M11 8.98755C10.51 8.98755 10.125 9.37255 10.125 9.86255V15.8125C10.125 16.3025 10.51 16.6875 11 16.6875C11.49 16.6875 11.875 16.3025 11.875 15.8125V9.86255C11.875 9.39005 11.49 8.98755 11 8.98755Z"
                                        fill="#58595B"/>
                                    <path
                                        d="M11.0175 5.40003C10.5625 5.36503 10.1425 5.83753 10.125 6.31003C10.125 6.32753 10.125 6.43252 10.125 6.45002C10.125 6.92252 10.4925 7.27252 10.9825 7.29002H11C11.4725 7.29002 11.8575 6.87002 11.875 6.41502C11.875 6.39752 11.875 6.22252 11.875 6.22252C11.875 5.71502 11.5075 5.40003 11.0175 5.40003Z"
                                        fill="#58595B"/>
                                </svg>
                            </div>
                        </li>
                    )}

                </ol>
            </div>
        </div>
    );
};

export default ProjectSequence;