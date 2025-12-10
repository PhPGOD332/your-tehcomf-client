'use client'
import React, {useEffect, useState} from 'react';
import styles from './PortfolioView.module.scss';
import PortfolioFilter from "@/widgets/PortfolioFilter/PortfolioFilter";
import SubTitle from "@/shared/UI/SubTitle/SubTitle";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import {IWork} from "@/types/IWork";
import {IFilters} from "@/types/IFilters";
import PortfolioCard from "@/widgets/PortfolioCard/PortfolioCard";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import StockBanner from "@/widgets/StockBanner/StockBanner";
import greenStock from '@/data/images/stocks_banners/guys.png';
import greenMobileStock from '@/data/images/stocks_banners/guys_mobile.png';
import blueStock from '@/data/images/stocks_banners/tg.png';
import {TImage} from "@/types/IImage";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';

const greenStockImage: TImage = greenStock;
const greenMobileStockImage: TImage = greenMobileStock;
const blueStockImage: TImage = blueStock;

interface PortfolioProps {
    title: string;
    subTitle: string;
    colors: IFilterColor[];
    layouts: IFilterLayout[];
    types: IFilterType[];
    budgets: IFilterBudget[];
    works: IWork[];
}

const PortfolioView = (
    {
        title,
        subTitle,
        colors,
        layouts,
        types,
        budgets,
        works = []
    }: PortfolioProps
) => {
    const isMobile = useMediaQuery('(max-width: 1150px)');
    const [currentCount, setCurrentCount] = useState<number>(12);
    const step = 6;
    const [allWorks, ] = useState<IWork[]>(works);
    const [currentWorks, setCurrentWorks] = useState<IWork[]>(works.filter((work, num) => num <= currentCount));
    const [filters, setFilters] = useState<IFilters>({
        color: null,
        layout: null,
        type: null,
        budget: null
    });

    const getCountedWorks = (works: IWork[]) => {
        return works.filter((work, num) => num <= currentCount)
    }

    const filtersApplyHandler = (newFilters: IFilters) => {
        setFilters({
            ...newFilters
        });
    }

    useEffect(() => {
        setCurrentWorks(getCountedWorks(allWorks));
    }, []);

    useEffect(() => {
        let newWorks: IWork[] = [];

        if (
            filters.layout === null
            && filters.type === null
            && filters.color === null
            && filters.budget === null
        ) {
            setCurrentWorks(getCountedWorks(allWorks));
            return;
        }

        let isFiltered = false;

        for (const [, filter] of Object.entries(filters)) {
            if (filter) {
                if (filter === filters.layout) {
                    if (!isFiltered) {
                        newWorks = [...allWorks.filter(work => work.layout.id === filters.layout?.id)];

                        isFiltered = true;
                    } else {
                        newWorks = [...newWorks.filter(work => work.layout.id === filters.layout?.id)];
                    }
                }

                if (filter === filters.type) {
                    if (!isFiltered) {
                        newWorks = [...allWorks.filter(work => work.type.id === filters.type?.id)];

                        isFiltered = true;
                    } else {
                        newWorks = [...newWorks.filter(work => work.type.id === filters.type?.id)];
                    }
                }

                if (filter === filters.color) {
                    if (!isFiltered) {
                        newWorks = [...allWorks.filter(work => work.facadeColors.some(color => filters.color && color.name === filters.color.name))];

                        isFiltered = true;
                    } else {
                        newWorks = [...newWorks.filter(work => work.facadeColors.some(color => filters.color && color.name === filters.color.name))];
                    }
                }

                if (filter === filters.budget) {
                    if (!isFiltered) {
                        newWorks = [...allWorks.filter(work => {
                            if (filter.minValue && filter.maxValue)
                                return work.price >= filter.minValue && work.price <= filter.maxValue;

                            if (filter.minValue && !filter.maxValue)
                                return work.price >= filter.minValue;

                            if (!filter.minValue && filter.maxValue)
                                return work.price <= filter.maxValue;
                        })]
                    } else {
                        newWorks = [...newWorks.filter(work => {
                            if (filter.minValue && filter.maxValue)
                                return work.price >= filter.minValue && work.price <= filter.maxValue;

                            if (filter.minValue && !filter.maxValue)
                                return work.price >= filter.minValue;

                            if (!filter.minValue && filter.maxValue)
                                return work.price <= filter.maxValue;
                        })]
                    }
                }
            }
        }
        setCurrentWorks(newWorks);
    }, [filters]);

    const moreClickHandle = () => {
        setCurrentCount(currentCount + step);
    }

    const completeStockAction = () => {

    }

    const subscribeStockAction = () => {

    }

    return (
        <div className={styles.portfolioView}>
            <div className={'container'}>
                <div className={styles.titleBlock}>
                    <SubTitle classNames={styles.title}>{title}</SubTitle>
                    <MiniTitle classNames={styles.subTitle}>{subTitle}</MiniTitle>
                    <PortfolioFilter
                        colors={colors}
                        countItems={currentWorks ? currentWorks.length : 0}
                        layouts={layouts}
                        types={types}
                        budgets={budgets}
                        currentFilters={filters}
                        filtersApplyHandler={filtersApplyHandler}
                    />
                </div>
                <div className={`${styles.portfolioBlock} ${!currentWorks || currentWorks.length === 0 ? styles.portfolioBlock_empty : ''}`}>
                    { currentWorks && currentWorks.length > 0 ?
                        currentWorks.map((work, num) =>
                            <PortfolioCard
                                key={num}
                                work={work}
                            />
                        )
                        :
                        <div className={styles.emptyBlock}>
                            <MiniTitle classNames={styles.emptySpan}>Упс.. Ничего не найдено</MiniTitle>
                        </div>
                    }
                </div>
                {currentWorks && currentWorks.length > currentCount ?
                    <div className={styles.moreBtnBlock}>
                        <GreenButton onClick={moreClickHandle}>Показать еще</GreenButton>
                    </div>
                    :
                    ''
                }
                <div className={styles.stocksWrapper}>
                    {isMobile ?
                        <Swiper
                            className={styles.stocksSwiper}
                            modules={[Autoplay]}
                            spaceBetween={20}
                            slidesPerView={'auto'}
                            effect={"slide"}
                            preventInteractionOnTransition={true}
                            noSwiping={true}
                            noSwipingClass={'no-swiping'}
                        >
                            <SwiperSlide
                                className={styles.stockSlide}
                            >
                                <StockBanner
                                    caption={'Скидка 10% <br> всем новосёлам'}
                                    buttonText={'Применить'}
                                    clickAction={completeStockAction}
                                    color={'green'}
                                    image={greenStockImage}
                                    imageWidth={228}
                                    imageHeight={228}
                                    imageStyles={{bottom: '-30px'}}
                                    mobileImage={greenMobileStockImage}
                                    mobileImageWidth={260}
                                    mobileImageHeight={260}
                                />
                            </SwiperSlide>
                            <SwiperSlide
                                className={styles.stockSlide}
                            >
                                <StockBanner
                                    caption={'Скидка 2% подписчикам <br> нашего ТГ канала'}
                                    mobileCaption={'Скидка 2% <br> подписчикам <br> ТГ канала'}
                                    buttonText={'Подписаться'}
                                    clickAction={subscribeStockAction}
                                    color={'blue'}
                                    image={blueStockImage}
                                    imageWidth={160}
                                    imageHeight={160}

                                />
                            </SwiperSlide>
                        </Swiper>
                        :
                        <div className={styles.stocks}>
                            <StockBanner
                                caption={'Скидка 10% <br> всем новосёлам'}
                                buttonText={'Применить'}
                                clickAction={completeStockAction}
                                color={'green'}
                                image={greenStockImage}
                                imageWidth={228}
                                imageHeight={228}
                                imageStyles={{bottom: '-30px'}}
                            />
                            <StockBanner
                                caption={'Скидка 2% подписчикам <br> нашего ТГ канала'}
                                buttonText={'Подписаться'}
                                clickAction={subscribeStockAction}
                                color={'blue'}
                                image={blueStockImage}
                                imageWidth={160}
                                imageHeight={160}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PortfolioView;