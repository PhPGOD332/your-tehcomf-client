export interface IPhotoSlide {
    photo: string;
    photoAlt?: string;
    title: string;
    text?: string;
}

export type TPhotoSliderSlides = IPhotoSlide[];