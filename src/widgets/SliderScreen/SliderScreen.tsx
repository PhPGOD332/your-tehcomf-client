'use client'
import React, {useEffect} from 'react';
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
    // const [isScreenSlide, setIsScreenSlide] = useState(false);

    const handleMoreClick = async () => {
        const screenHeight = window.outerHeight - 90;

        setTimeout(() => {
            // setIsScreenSlide(true);
            document.body.classList.remove('overflowStartYHidden');
            if (document.body.clientWidth <= 1000) {
                window.scrollTo({
                    top: screenHeight,
                    behavior: "smooth"
                });
            }
        }, 1000);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
        document.body.classList.add('overflowStartYHidden');
        // setIsScreenSlide(false);
    }, []);

    // useEffect(() => {
        // const screenHeight = window.outerHeight - 90;

        // if (isScreenSlide) {
        //     document.body.classList.remove('overflowYHidden');
        //     if (document.body.clientWidth <= 1000) {
        //         window.scrollTo({
        //             top: screenHeight,
        //             behavior: "smooth"
        //         });
        //     }
        // }

        // const handleScroll = () => {
            // if (isScreenSlide) {
                // if (document.body.clientWidth <= 1000) {
                //     if (window.scrollY < screenHeight) {
                //         window.scrollTo({
                //             top: screenHeight,
                //             behavior: "smooth"
                //         });
                //     }
                // }
            // } else {
            //     if (document.body.clientWidth <= 1000) {
                    // document.body.classList.add('overflowYHidden');
                // }
            // }
        // }

        // window.addEventListener('scroll', handleScroll);
        // return () => window.removeEventListener('scroll', handleScroll);
    // }, [isScreenSlide]);

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
                            <span className={styles.swiperText} dangerouslySetInnerHTML={{__html: slide.text ?? ''}}></span>
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