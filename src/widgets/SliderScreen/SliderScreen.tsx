'use client'
import React from 'react';
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import styles from "./SliderScreen.module.scss";
import Image from "next/image";
import SwiperNavigation from "@/widgets/SwiperNavigation/SwiperNavigation";

interface PhotoSlide {
    photo: string;
    photoAlt?: string;
    title: string;
    text?: string;
}

export type PhotoSliderSlides = PhotoSlide[];

interface PhotoSliderProps {
    slides: PhotoSliderSlides;
    isNavigation?: boolean;
    isPagination?: boolean;
}

const SliderScreen = ({ slides }: PhotoSliderProps) => {

    return (
        <div className={styles.screen}>
            <Swiper
                className={styles.swiper}
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                    enabled: true,
                    clickable: true,
                    horizontalClass: styles.horizontalPagination,
                    bulletClass: styles.paginationBullet,
                    bulletActiveClass: styles.paginationBulletActive
                }}
                autoplay={{
                    delay: 10000,
                }}
            >
                {slides.map((slide, num) =>
                    <SwiperSlide className={styles.swiperSlide} key={num}>
                        <div className={styles.swiperSlideContent}>
                            <Image
                                src={slide.photo}
                                alt={slide.photoAlt || ''}
                                fill={true}
                                className={styles.swiperImage}
                            />
                            <h2 className={styles.swiperTitle}>{slide.title}</h2>
                            <span className={styles.swiperText}>{slide.text}</span>
                        </div>
                    </SwiperSlide>
                )}
                <SwiperNavigation />
            </Swiper>
        </div>
    );
};

export default SliderScreen;