'use client'
import React, {useRef, useState} from 'react';
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
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination} from "swiper/modules";
import Link from "next/link";
import { getPortfolioFilterHref } from '@/shared/utils/portfolioFiltersQuery';

export interface CatalogProps {
    title: string;
}

interface ICatalogCard {
    image: StaticImageData;
    caption: string;
    className: string;
    isIcon?: boolean;
    order: number;
    mobileOrder?: number;
    portfolioTypeName?: string;
}

const catalogCards: ICatalogCard[] = [
    {
        image: ImageBathrooms,
        caption: 'Ванные',
        className: styles.catalogItem_bathrooms,
        order: 0,
        mobileOrder: 4,
        portfolioTypeName: 'bathroomfurniture'
    },
    {
        image: ImageOffice,
        caption: 'Для офиса',
        className: styles.catalogItem_offices,
        order: 1,
        mobileOrder: 5,
        portfolioTypeName: 'officefurniture'
    },
    {
        image: ImageKitchens,
        caption: 'Кухни',
        className: styles.catalogItem_kitchens,
        order: 2,
        mobileOrder: 1,
        portfolioTypeName: 'kitchens'
    },
    {
        image: ImageWardrobes,
        caption: 'Шкафы',
        className: styles.catalogItem_wardrobes,
        order: 3,
        mobileOrder: 2,
        portfolioTypeName: 'wardrobes'
    },
    {
        image: ImageLivings,
        caption: 'Гостинные',
        className: styles.catalogItem_livings,
        order: 4,
        mobileOrder: 3,
        portfolioTypeName: 'livingfurniture'
    },
    {
        image: ImageHallways,
        caption: 'Прихожие',
        className: styles.catalogItem_hallways,
        order: 5,
        mobileOrder: 6,
        portfolioTypeName: 'entrancehalls'
    },
    {
        image: ImageDressings,
        caption: 'Гардеробные',
        className: styles.catalogItem_dressings,
        order: 6,
        mobileOrder: 7,
        portfolioTypeName: 'dressingrooms'
    },
    {
        image: ImageFurnishings,
        caption: 'Комплексная меблировка',
        className: styles.catalogItem_furnishings,
        order: 7,
        mobileOrder: 9
    },
    {
        image: ImageChildish,
        caption: 'Детские',
        className: styles.catalogItem_childish,
        order: 8,
        mobileOrder: 8,
        portfolioTypeName: 'nurseryfurniture'
    },
    {
        image: ImageBasket,
        caption: 'Акции',
        className: styles.catalogItem_basket,
        isIcon: true,
        order: 9,
        mobileOrder: 0
    },
];

const getCatalogCardHref = (card: ICatalogCard): string =>
    getPortfolioFilterHref('type', card.portfolioTypeName);

const CatalogNav = ({ title }: CatalogProps) => {
    const sliderRef = useRef<SwiperRef | null>(null);
    const [sliderPos, setSliderPos] = useState(0);

    const sliderChangeHandler = (newPos: number) => {
        if (!sliderRef.current) return;

        // console.log(newPos)

        sliderRef.current?.swiper.slideTo(newPos);

        setTimeout(() => {
            sliderRef.current?.swiper.slides[newPos].classList.add(styles.catalogItem_iconHidden);
        }, 2000)

        setSliderPos(newPos);
    }

    return (
        <div className='container'>
            <div className={styles.wrapper}>
                <SubTitle color={TitleColors.BLACK} classNames={`${styles.subTitle}`}>{title}</SubTitle>
                {catalogCards.sort((card1, card2) => card1.order - card2.order).map((card, num) =>
                    <Link
                        href={getCatalogCardHref(card)}
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
                    </Link>
                )}
            </div>
            <div className={styles.wrapper_mobile}>
                <Swiper
                    className={styles.swiperCatalog}
                    modules={[Pagination, Autoplay, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect={"fade"}
                    ref={sliderRef}
                    onSlideChange={(swiper) => sliderChangeHandler(swiper.activeIndex)}
                >
                {catalogCards.sort((card1, card2) => (card1.mobileOrder ?? card1.order) - (card2.mobileOrder ?? card2.order)).map((card, num) =>
                    <SwiperSlide key={num} className={styles.catalogItem}>
                        {!card.isIcon
                            ?
                            <Link href={getCatalogCardHref(card)} className={styles.catalogItemLinkImage}>
                                <div className={styles.catalogItemIcon}>
                                    <svg width="48" height="64" viewBox="0 0 48 64" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M28.4945 18.8121C29.4601 17.0496 30.0091 15.0264 30.0091 12.875C30.0091 6.04048 24.4686 0.5 17.6341 0.5C10.7996 0.5 5.25908 6.04048 5.25908 12.875C5.25908 17.684 8.00219 21.8524 12.0091 23.9007V21.295C9.29561 19.4787 7.50908 16.3855 7.50908 12.875C7.50908 7.28312 12.0422 2.75 17.6341 2.75C23.226 2.75 27.7591 7.28312 27.7591 12.875C27.7591 14.9703 27.1226 16.9169 26.0325 18.532C26.2302 18.5109 26.4309 18.5 26.6341 18.5C27.2874 18.5 27.9132 18.6099 28.4945 18.8121ZM23.2591 18.3864C24.6509 16.966 25.5091 15.0207 25.5091 12.875C25.5091 8.52576 21.9833 5 17.6341 5C13.2848 5 9.75908 8.52576 9.75908 12.875C9.75908 15.0207 10.6172 16.966 12.0091 18.3864V12.8772C12.0091 9.79009 14.5275 7.25 17.6341 7.25C20.7623 7.25 23.2591 9.76939 23.2591 12.8772V18.3864ZM30.0091 24.1045C30.0091 22.2519 28.511 20.75 26.6341 20.75C24.7701 20.75 23.2591 22.2715 23.2591 24.1045V28.4732V34.25H21.0091V28.625V12.8944C21.0091 11.0197 19.511 9.5 17.6341 9.5C15.7701 9.5 14.2591 10.9994 14.2591 12.8944V36.0463C9.62768 31.0953 3.53025 25.653 1.0314 28.1654C-1.41473 30.6247 4.88864 37.4016 13.6907 52.212C17.6566 58.885 22.6747 63.499 31.1341 63.5C40.4539 63.5 48.0091 55.9448 48.0091 46.625V39.3053V28.6394C48.0091 26.7675 46.511 25.25 44.6341 25.25C42.7701 25.25 41.2591 26.772 41.2591 28.6394V33.6869V34.25H39.0091V29.0259V26.3553C39.0091 24.5022 37.511 23 35.6341 23C33.7701 23 32.2591 24.4907 32.2591 26.3553V28.6435V32H30.0091V28.6435V24.1045Z"
                                              fill="#9DD2A8"/>
                                    </svg>
                                </div>
                                <Image
                                    src={card.image.src}
                                    alt={card.caption}
                                    className={styles.cardBg}
                                    fill={true}
                                />
                            </Link>
                            :
                            <Link href={getCatalogCardHref(card)} className={styles.catalogItemLinkIcon}>
                                <div className={styles.catalogItemIcon}>
                                    <svg width="48" height="64" viewBox="0 0 48 64" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M28.4945 18.8121C29.4601 17.0496 30.0091 15.0264 30.0091 12.875C30.0091 6.04048 24.4686 0.5 17.6341 0.5C10.7996 0.5 5.25908 6.04048 5.25908 12.875C5.25908 17.684 8.00219 21.8524 12.0091 23.9007V21.295C9.29561 19.4787 7.50908 16.3855 7.50908 12.875C7.50908 7.28312 12.0422 2.75 17.6341 2.75C23.226 2.75 27.7591 7.28312 27.7591 12.875C27.7591 14.9703 27.1226 16.9169 26.0325 18.532C26.2302 18.5109 26.4309 18.5 26.6341 18.5C27.2874 18.5 27.9132 18.6099 28.4945 18.8121ZM23.2591 18.3864C24.6509 16.966 25.5091 15.0207 25.5091 12.875C25.5091 8.52576 21.9833 5 17.6341 5C13.2848 5 9.75908 8.52576 9.75908 12.875C9.75908 15.0207 10.6172 16.966 12.0091 18.3864V12.8772C12.0091 9.79009 14.5275 7.25 17.6341 7.25C20.7623 7.25 23.2591 9.76939 23.2591 12.8772V18.3864ZM30.0091 24.1045C30.0091 22.2519 28.511 20.75 26.6341 20.75C24.7701 20.75 23.2591 22.2715 23.2591 24.1045V28.4732V34.25H21.0091V28.625V12.8944C21.0091 11.0197 19.511 9.5 17.6341 9.5C15.7701 9.5 14.2591 10.9994 14.2591 12.8944V36.0463C9.62768 31.0953 3.53025 25.653 1.0314 28.1654C-1.41473 30.6247 4.88864 37.4016 13.6907 52.212C17.6566 58.885 22.6747 63.499 31.1341 63.5C40.4539 63.5 48.0091 55.9448 48.0091 46.625V39.3053V28.6394C48.0091 26.7675 46.511 25.25 44.6341 25.25C42.7701 25.25 41.2591 26.772 41.2591 28.6394V33.6869V34.25H39.0091V29.0259V26.3553C39.0091 24.5022 37.511 23 35.6341 23C33.7701 23 32.2591 24.4907 32.2591 26.3553V28.6435V32H30.0091V28.6435V24.1045Z"
                                              fill="#9DD2A8"/>
                                    </svg>
                                </div>
                                <Image
                                    src={card.image.src}
                                    alt={card.caption}
                                    className={styles.cardIcon}
                                    width={291}
                                    height={284}
                                />
                            </Link>
                        }
                    </SwiperSlide>
                )}
                </Swiper>
                <div className={styles.swiperCatalogPagination}>
                    {catalogCards.sort((card1, card2) => (card1.mobileOrder ?? card1.order) - (card2.mobileOrder ?? card2.order)).map((card, num) =>
                        <button
                            key={num}
                            className={`${styles.catalogPaginationItem} ${sliderPos === num ? styles.catalogPaginationItem_active : ''}`}
                            onClick={() => sliderChangeHandler(num)}
                            // onTouchStart={()}
                        >{card.caption}</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogNav;
