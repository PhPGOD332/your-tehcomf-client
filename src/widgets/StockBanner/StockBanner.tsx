import React, {CSSProperties} from 'react';
import styles from './StockBanner.module.scss';
import Image, {StaticImageData} from "next/image";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import {TBgColor} from "@/types/IStock";

interface BannerProps {
    caption: string;
    mobileCaption?: string;
    buttonText: string;
    clickAction: () => void;
    image?: StaticImageData;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    imageStyles?: CSSProperties;
    mobileImage?: StaticImageData;
    mobileImageWidth?: number;
    mobileImageHeight?: number;
    mobileImageAlt?: string;
    mobileImageStyles?: CSSProperties;
    color: TBgColor;
}

const StockBanner = (
    {
        caption,
        mobileCaption,
        buttonText = "Применить",
        clickAction,
        color,
        image,
        imageAlt,
        imageWidth,
        imageHeight,
        imageStyles,
        mobileImage,
        mobileImageAlt,
        mobileImageWidth,
        mobileImageHeight,
        mobileImageStyles
    }: BannerProps
) => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    const getBgStyle = (color: TBgColor) => {
        let checkColors: never;

        switch (color) {
            case "green":
                return styles.banner_green;
            case "blue":
                return styles.banner_blue;
            case "pink":
                return styles.banner_pink;
            case "peach":
                return styles.banner_peach;
            default:
                checkColors = color;
                return checkColors;
        }
    }

    return (
        <div className={`${styles.banner} ${getBgStyle(color)}`}>
            <div className={styles.wrapper}>
                <span
                    className={styles.caption}
                    dangerouslySetInnerHTML={{__html: isMobile ? mobileCaption ?? caption : caption}}
                ></span>
                <div className={styles.imageBlock} style={isMobile && mobileImageStyles ? mobileImageStyles : imageStyles}>
                    {isMobile && mobileImage ?
                        <Image
                            className={styles.image}
                            src={mobileImage.src}
                            alt={mobileImageAlt ?? ''}
                            width={mobileImageWidth}
                            height={mobileImageHeight}
                        />
                    :
                    image ?
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
                <button
                    className={styles.bannerBtn}
                    onClick={clickAction}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default StockBanner;