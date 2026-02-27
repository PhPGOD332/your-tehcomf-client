'use client'
import React, { useState } from 'react';
import styles from './TextWithSmoothSlider.module.scss';
import { IImage } from "@/types/IImage";
import Image from "next/image";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import SmoothImagesSlider from "@/widgets/SmoothImagesSlider/SmoothImagesSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

type TOrientation = 'right' | 'left';

interface SmoothTextProps {
    title: string;
    text: React.JSX.Element;
    isMap?: boolean;
    sliderOrientation: TOrientation;
    sliderItems: IImage[];
    brands?: IImage[];
    brandsDirection?: TOrientation;
}

const TextWithSmoothSlider = (
    {
        title,
        text,
        isMap,
        sliderOrientation,
        sliderItems,
        brands,
        brandsDirection
    }: SmoothTextProps
) => {
    const [isMapActive, setIsMapActive] = useState(false);

    const getOrientationStyle = (orientation: TOrientation): string => {
        let checkVal: never;

        switch (orientation) {
            case 'left':
                return styles.content_leftOrientation;
            case 'right':
                return styles.content_rightOrientation;
            default:
                checkVal = orientation;
                return checkVal;
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={`${styles.content} ${getOrientationStyle(sliderOrientation)} `}>
                    <div className={styles.textBlock}>
                        <MiniTitle classNames={styles.blockTitle}>{title}</MiniTitle>
                        <p className={styles.text}>
                            {text}
                        </p>
                        {isMap &&
					        <div className={styles.mapBlock}>
                                <span className={styles.mapButton} onClick={() => setIsMapActive(!isMapActive)}>
                                    {!isMapActive ? 'смотреть на карте' : 'скрыть карту'}
                                </span>
						        <div className={`${styles.mapWidget} ${isMapActive && styles.mapWidget_active}`}>
							        <iframe
                                        className={styles.map}
								        src="https://yandex.ru/map-widget/v1/?ll=37.429751%2C55.939470&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1MzE2NjM5OBIw0KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCX0LXQu9C10L3QvtCz0YDQsNC0IgoNidsUQhWz919C&z=10"
								        width={560} height={400} allowFullScreen={true}
								        style={{position: 'relative'}}></iframe>
						        </div>
					        </div>
                        }
                    </div>
                    {/*<div className={styles.sliderBlock}>*/}
                    <SmoothImagesSlider
                        slides={sliderItems}
                        paginationOrientation={sliderOrientation}
                    />
                    {/*</div>*/}
                </div>
            </div>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={brands ? brands.length : 0}
                speed={3000}
                spaceBetween={47}
                className={`container ${styles.brandsSlider}`}
                wrapperClass={styles.sliderWrapper}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: brandsDirection && brandsDirection === 'left'
                }}
                freeMode={{
                    enabled: true,
                    momentum: false
                }}
                // loopAdditionalSlides={brands ? brands.length : 0}
                enabled={false}
                breakpoints={{
                    1500: {
                        enabled: false
                    },
                    1000: {
                        enabled: true
                    }
                }}
                allowTouchMove={false}
            >
                {brands &&
                    brands.map((brand, num) =>
                        <SwiperSlide className={styles.sliderSlide} key={num}>
                            <div className={styles.brand}>
                                <Image
                                    className={styles.brandImage}
                                    src={brand.src}
                                    alt={brand.imageAlt ?? ''}
                                    width={brand.width}
                                    height={brand.height}
                                />
                            </div>
                        </SwiperSlide>
                    )
                }
                {brands &&
                    brands.map((brand, num) =>
                        <SwiperSlide className={styles.sliderSlide} key={num+100}>
                            <div className={styles.brand}>
                                <Image
                                    className={styles.brandImage}
                                    src={brand.src}
                                    alt={brand.imageAlt ?? ''}
                                    width={brand.width}
                                    height={brand.height}
                                />
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
            <div className={`container ${styles.brands}`}>
                {brands &&
                    brands.map((brand, num) =>
                        <div className={styles.brand} key={num}>
                            <Image
                                className={styles.brandImage}
                                src={brand.src}
                                alt={brand.imageAlt ?? ''}
                                width={brand.width}
                                height={brand.height}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TextWithSmoothSlider;