'use client'
import React from 'react';
import styles from './SmoothImagesSlider.module.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination} from "swiper/modules";
import Image from "next/image";
import {IImage} from "@/types/IImage";

type TOrientation = 'right' | 'left';

interface SliderProps {
    slides: IImage[];
    paginationOrientation: TOrientation;
}

const SmoothImagesSlider = (
    {
        slides,
        paginationOrientation
    }: SliderProps
) => {

    const getPaginationOrientationStyle = (orientation: TOrientation): string => {
        let checkVal: never;

        switch (orientation) {
            case 'left':
                return `${styles.horizontalPagination_left}`;
            case 'right':
                return `${styles.horizontalPagination_right}`;
            default:
                checkVal = orientation;
                return '';
        }
    }

    return (
        <Swiper
            className={styles.swiper}
            modules={[Pagination, Autoplay, EffectFade]}
            slidesPerView={1}
            wrapperClass={styles.swiperWrapper}
            pagination={{
                enabled: true,
                clickable: true,
                horizontalClass: getPaginationOrientationStyle(paginationOrientation),
                bulletClass: styles.paginationBullet,
                bulletActiveClass: styles.paginationBulletActive
            }}
            autoplay={{
                delay: 5000,
            }}
            loop={true}
            effect={"fade"}
        >
            {slides.map((slide, num) =>
                <SwiperSlide
                    className={styles.swiperSlide}
                    key={num}
                >
                    <div className={styles.swiperSlideContent}>
                        <Image
                            src={slide.src}
                            alt={slide.imageAlt || ''}
                            fill={true}
                            className={styles.swiperImage}
                        />
                    </div>
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default SmoothImagesSlider;