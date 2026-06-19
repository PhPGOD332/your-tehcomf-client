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
import greenStock from '@/data/images/stocks_banners/guys.png';
import greenMobileStock from '@/data/images/stocks_banners/guys_mobile.png';
import blueStock from '@/data/images/stocks_banners/tg.png';
import {TImage} from "@/types/IImage";
import PopupForm from "@/widgets/PopupForm/PopupForm";
import {useRouter} from "next/navigation";
import {IStock} from "@/types/IStock";
import StockBanners from "@/widgets/StockBanners/StockBanners";

const greenStockImage: TImage = greenStock;
const greenMobileStockImage: TImage = greenMobileStock;
const blueStockImage: TImage = blueStock;

interface PortfolioProps {
    title: string;
    titleAs?: 'h1' | 'h2';
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
        titleAs = 'h2',
        subTitle,
        colors,
        layouts,
        types,
        budgets,
        works = []
    }: PortfolioProps
) => {
    const router = useRouter();
    const [currentCount, setCurrentCount] = useState<number>(11);
    const step = 6;
    const [allWorks, ] = useState<IWork[]>(works);
    const [currentWorks, setCurrentWorks] = useState<IWork[]>([]);
    const [filters, setFilters] = useState<IFilters>({
        color: null,
        layout: null,
        type: null,
        budget: null
    });
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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
                        newWorks = [...allWorks.filter(work => work.color.id === filters.color?.id)];

                        isFiltered = true;
                    } else {
                        newWorks = [...newWorks.filter(work => work.color.id === filters.color?.id)];
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

    useEffect(() => {
        setCurrentWorks(works.filter((work, num) => num - 1 <= currentCount));
    }, [currentCount]);

    const moreClickHandle = () => {
        setCurrentCount(currentCount + step);
    }

    const stocks: IStock[] = [
        {
            caption: 'Скидка 10% <br> всем новосёлам',
            buttonText: 'Применить',
            clickAction: () => setIsPopupOpen(true),
            color: 'green',
            image: greenStockImage,
            imageWidth: 228,
            imageHeight: 228,
            imageStyles: {bottom: '-30px'},
            mobileImage: greenMobileStockImage,
            mobileImageWidth: 260,
            mobileImageHeight: 260
        },
        {
            caption: 'Скидка 2% подписчикам <br> нашего ТГ канала',
            mobileCaption: 'Скидка 2% <br> подписчикам <br> ТГ канала',
            buttonText: 'Подписаться',
            clickAction: () => router.replace('https://t.me/youkuhnya'),
            color: 'blue',
            image: blueStockImage,
            imageWidth: 160,
            imageHeight: 160
        }
    ];

    return (
        <div className={styles.portfolioView}>
            <div className={'container'}>
                <div className={styles.titleBlock}>
                    <SubTitle classNames={styles.title} as={titleAs}>{title}</SubTitle>
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
                {works && works.length > currentCount - 1 ?
                    <div className={styles.moreBtnBlock}>
                        <GreenButton classNames={styles.moreBtn} onClick={moreClickHandle}>Показать еще</GreenButton>
                    </div>
                    :
                    ''
                }
                <StockBanners stocks={stocks} title={''} />
            </div>
            <PopupForm
                isOpen={isPopupOpen}
                setIsOpen={setIsPopupOpen}
                noteText={'Я новосел, хочу скидку 10%!'}
            />
        </div>
    );
};

export default PortfolioView;
