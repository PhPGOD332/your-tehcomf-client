import React, {CSSProperties} from 'react';
import styles from './StockBanner.module.scss';
import Image, {StaticImageData} from "next/image";

type TBgColor = 'blue' | 'green';

interface BannerProps {
    caption: string;
    buttonText: string;
    clickAction: () => void;
    image?: StaticImageData;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    imageStyles?: CSSProperties;
    color: TBgColor;
}

const StockBanner = (
    {
        caption,
        buttonText = "Применить",
        clickAction,
        color,
        image,
        imageAlt,
        imageWidth,
        imageHeight,
        imageStyles
    }: BannerProps
) => {
    const getBgStyle = (color: TBgColor) => {
        let checkColors: never;

        switch (color) {
            case "green":
                return styles.banner_green;
            case "blue":
                return styles.banner_blue;
            default:
                checkColors = color;
                return checkColors;
        }
    }

    return (
        <div className={`${styles.banner} ${getBgStyle(color)}`}>
            <div className={styles.wrapper}>
                <span className={styles.caption} dangerouslySetInnerHTML={{__html: caption}}></span>
                <button
                    className={styles.bannerBtn}
                    onClick={clickAction}
                >
                    {buttonText}
                </button>
            </div>
            <div className={styles.imageBlock} style={imageStyles}>
                {image ?
                    <Image
                        className={styles.image}
                        src={image.src}
                        alt={imageAlt ?? ''}
                        width={imageWidth}
                        height={imageHeight}
                    />
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default StockBanner;