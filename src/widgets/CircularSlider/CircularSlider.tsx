'use client'
import React from 'react';
import styles from './CircularSlider.module.scss';
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {IFillImage} from "@/types/IImage";

interface SliderProps {
    photos: IFillImage[]
}

const CircularSlider = (
    {
        photos
    }: SliderProps
) => {
    return (
        <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            className={styles.circularSlider}
            slidePrevClass={styles.prevSlide}
            slideNextClass={styles.nextSlide}
            slideActiveClass={styles.activeSlide}
            wrapperClass={styles.sliderWrapper}
            loop={true}
        >
            {photos.map((photo, num) =>
                <SwiperSlide className={styles.sliderSlide} key={num}>
                    <Image src={photo.src} alt={''} fill={photo.fill} className={styles.slideImage} />
                </SwiperSlide>
            )}
        </Swiper>
    );
};

export default CircularSlider;