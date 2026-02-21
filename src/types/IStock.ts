import { CSSProperties } from "react";
import { StaticImageData } from "next/image";

export type TBgColor = 'blue' | 'green' | 'pink' | 'peach';

export interface IStock {
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