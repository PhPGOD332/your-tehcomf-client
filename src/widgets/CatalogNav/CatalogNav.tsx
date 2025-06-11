import React from 'react';
import styles from './CatalogNav.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import ImageBathrooms from '@/data/images/catalog/bathrooms.webp';
import ImageOffice from '@/data/images/catalog/office.webp';
import ImageKitchens from '@/data/images/catalog/kitchens.webp';
import ImageWardrobes from '@/data/images/catalog/wardrobes.webp';
import ImageLivings from '@/data/images/catalog/livings.webp';
import ImageHallways from '@/data/images/catalog/hallways.webp';
import ImageDressings from '@/data/images/catalog/dressings.webp';
import ImageFurnishings from '@/data/images/catalog/furnishings.webp';
import ImageChildish from '@/data/images/catalog/childish.webp';
import ImageBasket from '@/data/images/catalog/basket.webp';
import Image, {StaticImageData} from "next/image";

export interface CatalogProps {
    title: string;
}

interface ICatalogCard {
    image: StaticImageData;
    caption: string;
    className: string;
    isIcon?: boolean;
}

const catalogCards: ICatalogCard[] = [
    {
        image: ImageBathrooms,
        caption: 'Ванные',
        className: styles.catalogItem_bathrooms
    },
    {
        image: ImageOffice,
        caption: 'Для офиса',
        className: styles.catalogItem_offices
    },
    {
        image: ImageKitchens,
        caption: 'Кухни',
        className: styles.catalogItem_kitchens
    },
    {
        image: ImageWardrobes,
        caption: 'Шкафы',
        className: styles.catalogItem_wardrobes
    },
    {
        image: ImageLivings,
        caption: 'Гостинные',
        className: styles.catalogItem_livings
    },
    {
        image: ImageHallways,
        caption: 'Прихожие',
        className: styles.catalogItem_hallways
    },
    {
        image: ImageDressings,
        caption: 'Гардеробные',
        className: styles.catalogItem_dressings
    },
    {
        image: ImageFurnishings,
        caption: 'Комплексная меблировка',
        className: styles.catalogItem_furnishings
    },
    {
        image: ImageChildish,
        caption: 'Детские',
        className: styles.catalogItem_childish
    },
    {
        image: ImageBasket,
        caption: 'Акции',
        className: styles.catalogItem_basket,
        isIcon: true
    },
];

const CatalogNav = ({ title }: CatalogProps) => {
    return (
        <div className='container'>
            <div className={styles.wrapper}>
                <SubTitle color={TitleColors.BLACK} classNames={`${styles.subTitle}`}>{title}</SubTitle>
                {catalogCards.map((card, num) =>
                    <a
                        href='#'
                        className={`${styles.catalogItem} ${card.className} ${card.isIcon ? styles.catalogItem_withIcon : ''}`}
                        key={num}
                    >
                        <span className={`${styles.cardCaption} ${card.isIcon ? styles.cardCaption_white : ''}`}>{card.caption}</span>
                        {card.isIcon
                            ?
                            <Image
                                src={card.image.src}
                                alt={''}
                                className={card.isIcon ? styles.cardIcon : styles.cardBg}
                                width={191}
                                height={184}
                            />
                            :
                            <Image
                                src={card.image.src}
                                alt={''}
                                className={card.isIcon ? styles.cardIcon : styles.cardBg}
                                fill={true}
                            />
                        }
                        {/*<img*/}
                        {/*    src={card.image.src}*/}
                        {/*    alt={''}*/}
                        {/*    className={card.isIcon ? styles.cardIcon : styles.cardBg}*/}
                        {/*/>*/}
                    </a>
                )}
            </div>
        </div>
    );
};

export default CatalogNav;