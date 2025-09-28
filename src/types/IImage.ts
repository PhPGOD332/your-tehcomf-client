import {StaticImageData} from "next/image";

export interface IImage {
    image: string;
    imageAlt?: string;
    width: number;
    height: number;
}

export interface IFillImage {
    src: string;
    imageAlt?: string;
    fill: boolean;
}

export type TImage = StaticImageData;