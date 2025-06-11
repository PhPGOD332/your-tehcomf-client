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
                            <div className={styles.quoteIcon}>
                                <svg width="40" height="29" viewBox="0 0 40 29" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M30.156 28.854C27.336 28.7913 25.2367 27.7573 23.858 25.752C22.542 23.7467 21.884 21.3967 21.884 18.702C21.884 15.694 22.542 12.9367 23.858 10.43C25.174 7.92333 26.866 5.79266 28.934 4.038C31.002 2.22066 33.164 0.935996 35.42 0.183995L39.086 5.73C38.2713 6.16866 37.3 6.858 36.172 7.798C35.044 8.738 34.01 9.74066 33.07 10.806C32.13 11.8087 31.5033 12.78 31.19 13.72C32.4433 13.8453 33.5713 14.2213 34.574 14.848C35.6393 15.412 36.4853 16.2267 37.112 17.292C37.7387 18.3573 38.052 19.642 38.052 21.146C38.052 23.7153 37.2373 25.658 35.608 26.974C34.0413 28.2273 32.224 28.854 30.156 28.854ZM8.536 28.854C5.716 28.7913 3.61667 27.7573 2.238 25.752C0.922 23.7467 0.264 21.3967 0.264 18.702C0.264 15.694 0.922 12.9367 2.238 10.43C3.554 7.92333 5.246 5.79266 7.314 4.038C9.382 2.22066 11.5753 0.935996 13.894 0.183995L17.56 5.73C16.62 6.16866 15.586 6.858 14.458 7.798C13.3927 8.738 12.39 9.74066 11.45 10.806C10.51 11.8087 9.88333 12.78 9.57 13.72C10.886 13.8453 12.0453 14.2213 13.048 14.848C14.0507 15.412 14.8653 16.2267 15.492 17.292C16.1187 18.3573 16.432 19.642 16.432 21.146C16.432 23.7153 15.6173 25.658 13.988 26.974C12.4213 28.2273 10.604 28.854 8.536 28.854Z"
                                        fill="#EFEFEF"/>
                                </svg>
                            </div>
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