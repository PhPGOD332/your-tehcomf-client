'use client'
import React, {useEffect, useState} from 'react';
import {Autoplay, EffectFade, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/effect-fade';
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

const SliderScreen = (
    {
        slides
    }: PhotoSliderProps) => {
    const [isMoreCompleted, setIsMoreCompleted] = useState(false);

    const handleMoreClick = () => {
        const screenHeight = window.outerHeight - 160;

        setTimeout(() => {
            document.body.classList.remove('overflowYHidden');
            window.scrollTo({
                top: screenHeight,
                behavior: "smooth"
            });

            setTimeout(() => {
                setIsMoreCompleted(true);
            }, 500)
        }, 1000);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (isMoreCompleted) {
                if (window.scrollY < window.outerHeight - 160) {
                    window.scrollTo(0, window.outerHeight - 160);
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMoreCompleted]);

    return (
        <div className={styles.screen}>
            <Swiper
                className={styles.swiper}
                modules={[Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={3}
                pagination={{
                    enabled: true,
                    clickable: true,
                    horizontalClass: styles.horizontalPagination,
                    bulletClass: styles.paginationBullet,
                    bulletActiveClass: styles.paginationBulletActive,
                }}
                autoplay={{
                    delay: 10000,
                }}
                effect={"fade"}
                breakpoints={{
                    1000: {

                    }
                }}
            >
                {slides.map((slide, num) =>
                    <SwiperSlide className={styles.swiperSlide} key={num} onTouchStart={(e) => e.stopPropagation()}>
                        <div className={styles.swiperImageWrapper}>
                            <Image
                                src={slide.photo}
                                alt={slide.photoAlt || ''}
                                fill={true}
                                className={styles.swiperImage}
                            />
                        </div>
                        <div className={styles.swiperSlideContent}>
                            <h2 className={styles.swiperTitle}>{slide.title}</h2>
                            <span className={styles.swiperText}>{slide.text}</span>
                        </div>
                    </SwiperSlide>
                )}
                <SwiperNavigation
                    isMobilePanel={true}
                    mobilePanelHandler={handleMoreClick}
                />
            </Swiper>
        </div>
    );
};

export default SliderScreen;