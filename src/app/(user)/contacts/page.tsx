import React from 'react';
import {pagesData} from "@/shared/constants";
import Footer from "@/widgets/Footer/Footer";
import Image, {StaticImageData} from "next/image";
import styles from '@/app/styles/pages/contacts.module.scss';
import Contacts from "@/widgets/Contacts/Contacts";
import ProductionInfo from "@/widgets/ProductionInfo/ProductionInfo";
import CircularSlider from "@/widgets/CircularSlider/CircularSlider";
import {IFillImage} from "@/types/IImage";
import previewImage from '@/data/images/contacts/contact-preview.jpg';
import photo1 from '@/data/images/sliders/circular/first.png';
import photo2 from '@/data/images/sliders/circular/second.png';
import photo3 from '@/data/images/sliders/circular/third.png';
import photo4 from '@/data/images/sliders/circular/fourth.png';
import photo5 from '@/data/images/sliders/circular/fifth.png';
import photo6 from '@/data/images/sliders/circular/sixth.png';
import photo7 from '@/data/images/sliders/circular/seventh.png';
import photo8 from '@/data/images/sliders/circular/eighth.png';
import {createPageMetadata} from "@/shared/seo";

type TImage = StaticImageData;
const contactPreview: TImage = previewImage;

const imagesArray = [
    photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8
] as StaticImageData[]

export const metadata = createPageMetadata(pagesData.contacts);

const sliderPhotos: IFillImage[] = [
    {
        src: imagesArray[0].src,
        fill: true
    },
    {
        src: imagesArray[1].src,
        fill: true
    },
    {
        src: imagesArray[2].src,
        fill: true
    },
    {
        src: imagesArray[3].src,
        fill: true
    },
    {
        src: imagesArray[4].src,
        fill: true
    },
    {
        src: imagesArray[5].src,
        fill: true
    },
    {
        src: imagesArray[6].src,
        fill: true
    },
    // {
    //     src: imagesArray[7].src,
    //     fill: true
    // },
    // {
    //     src: imagesArray[8].src,
    //     fill: true
    // }
]

const Page = () => {
    return (
        <div className={styles.main}>
            <div className={'container'}>
                <div className={styles.previewBlock}>
                    <Image
                        src={contactPreview}
                        alt={'Кухня'}
                        fill={true}
                    />
                </div>
            </div>
            <Contacts titleAs="h1" />
            <ProductionInfo />
            <CircularSlider photos={sliderPhotos} />
            <Footer isFormContact={true} isFormContactOnlyContacts={{desktop: false, mobile: false}}/>
        </div>
    );
};

export default Page;
