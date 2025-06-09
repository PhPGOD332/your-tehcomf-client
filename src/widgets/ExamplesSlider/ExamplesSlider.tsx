'use client'
import React from 'react';
import {Autoplay, EffectCoverflow, Pagination} from "swiper/modules";
import styles from "./ExamplesSlider.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/modules/effect-coverflow.min.css';
import Image from "next/image";
import SwiperNavigation from "@/widgets/SwiperNavigation/SwiperNavigation";
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import Link from "next/link";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";

interface PhotoSlide {
    photo: string;
    photoAlt?: string;
    title: string;
    text?: string;
}

export type PhotoSliderSlides = PhotoSlide[];

interface PhotoSliderProps {
    slides: PhotoSliderSlides;
    title: string;
    isNavigation?: boolean;
    isPagination?: boolean;
}

const ExamplesSlider = ({ slides, title }: PhotoSliderProps) => {
    return (
        <div className={styles.screen}>
            <SubTitle classNames={styles.title}>{title}</SubTitle>
            <Link href={'#'} className={styles.linkDetail}>смотреть всё</Link>
            <Swiper
                className={styles.swiper}
                modules={[Pagination, Autoplay, EffectCoverflow]}
                spaceBetween={20}
                slidesPerView={'auto'}
                centeredSlides={true}
                wrapperClass={styles.swiperWrapper}
                pagination={{
                    enabled: true,
                    clickable: true,
                    horizontalClass: styles.horizontalPagination,
                    bulletClass: styles.paginationBullet,
                    bulletActiveClass: styles.paginationBulletActive
                }}
                autoplay={{
                    delay: 5000,
                }}
                effect={"coverflow"}
                coverflowEffect={{
                    rotate: 20,
                    stretch: -30,
                    depth: 100,
                    modifier: 2,
                    slideShadows: true
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
                            <MiniTitle
                                classNames={styles.swiperTitle}
                                color={TitleColors.WHITE}
                            >
                                {slide.title}
                            </MiniTitle>
                            <span className={styles.swiperText}>{slide.text}</span>
                        </div>
                    </SwiperSlide>
                )}
                <SwiperNavigation/>
            </Swiper>
        </div>
    );
};

export default ExamplesSlider;