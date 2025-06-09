import React from 'react';
import styles from './ReviewsInfo.module.scss';
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import Image, {StaticImageData} from "next/image";
import AlexandrImage from '@/data/images/reviews/Alexandr.png';
import LarisaImage from '@/data/images/reviews/Larisa.png';
import KonstantinImage from '@/data/images/reviews/Konstantin.png';
import OlgaImage from '@/data/images/reviews/Olga.png';

interface IReview {
    name: string;
    project: string;
    image: StaticImageData;
    text: string;
}

const reviews: IReview[] = [
    {
        name: 'Александр',
        project: 'Кухня на заказ',
        image: AlexandrImage,
        text: 'Получили кухню своей мечты! Сделана “на совесть”.'
    },
    {
        name: 'Лариса',
        project: 'Кухня на заказ',
        image: LarisaImage,
        text: 'Качество материалов на высоте. Большое спасибо команде!'
    },
    {
        name: 'Константин',
        project: 'Гостиная',
        image: KonstantinImage,
        text: 'Сложно представить более компетентных специалистов!'
    },
    {
        name: 'Ольга',
        project: 'Творческий кабинет',
        image: OlgaImage,
        text: 'Теперь я обладательница мебели-мечты!'
    }
];

const ReviewsInfo = () => {
    return (
        <div className={styles.wrapper}>
            <div className='container'>
                <MiniTitle classNames={styles.reviewsTitle}>Вот что говорят наши клиенты</MiniTitle>
                <div className={styles.reviews}>
                    {reviews.map((review, num) =>
                        <div className={styles.reviewItem} key={num}>
                            <span className={styles.reviewText}>{review.text}</span>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewImage}>
                                    <Image src={review.image.src} alt='' width={44} height={44}/>
                                </div>
                                <div className={styles.reviewCardText}>
                                    <span className={styles.reviewName}>{review.name}</span>
                                    <span className={styles.reviewProject}>{review.project}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewsInfo;