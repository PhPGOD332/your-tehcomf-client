'use client'
import React, {useEffect, useState} from 'react';
import styles from './TextWithSmoothSlider.module.scss';
import {IImage} from "@/types/IImage";
import Image from "next/image";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import SmoothImagesSlider from "@/widgets/SmoothImagesSlider/SmoothImagesSlider";

type TOrientation = 'right' | 'left';

interface SmoothTextProps {
    title: string;
    text: React.JSX.Element;
    isMap?: boolean;
    sliderOrientation: TOrientation;
    sliderItems: IImage[];
    brands?: IImage[];
}

const TextWithSmoothSlider = (
    {
        title,
        text,
        isMap,
        sliderOrientation,
        sliderItems,
        brands
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
                return '';
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
								        src="https://yandex.ru/map-widget/v1/?azimuth=1.7132151937576336&ll=37.716604%2C55.747647&mode=search&oid=8560001252&ol=biz&tilt=0.25666606646975454&z=17.6"
								        width="560" height="400" allowFullScreen={true}
								        style={{position: "relative"}}></iframe>
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