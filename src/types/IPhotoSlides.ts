export interface IPhotoSlide {
    photo: string;
    photoAlt?: string;
    title: string;
    text?: string;
    href?: string;
}

export type TPhotoSliderSlides = IPhotoSlide[];
