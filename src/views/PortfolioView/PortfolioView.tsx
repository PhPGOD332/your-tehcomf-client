'use client'
import React, {useState} from 'react';
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
import {PortfolioService} from "@/services/PortfolioService";
import {getPortfolioFiltersHref} from "@/shared/utils/portfolioFiltersQuery";
import {TELEGRAM_CHANNEL_URL} from "@/shared/constants";

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
    totalWorks: number;
    initialFilters: IFilters;
}

const NEXT_WORKS_LIMIT = 8;

const PortfolioView = (
    {
        title,
        titleAs = 'h2',
        subTitle,
        colors,
        layouts,
        types,
        budgets,
        works = [],
        totalWorks,
        initialFilters,
    }: PortfolioProps
) => {
    const router = useRouter();
    const [currentWorks, setCurrentWorks] = useState<IWork[]>(works);
    const [totalCount, setTotalCount] = useState<number>(totalWorks);
    const [filters, setFilters] = useState<IFilters>(initialFilters);
    const [isLoadingWorks, setIsLoadingWorks] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    React.useEffect(() => {
        setCurrentWorks(works);
        setTotalCount(totalWorks);
        setFilters(initialFilters);
        setIsLoadingWorks(false);
    }, [works, totalWorks, initialFilters]);

    const filtersApplyHandler = (newFilters: IFilters) => {
        setFilters({
            ...newFilters
        });
        setIsLoadingWorks(true);
        router.push(getPortfolioFiltersHref(newFilters), { scroll: false });
    }

    const moreClickHandle = async () => {
        if (isLoadingWorks) return;

        setIsLoadingWorks(true);
        try {
            const response = await PortfolioService.getWorksPage({
                offset: currentWorks.length,
                limit: NEXT_WORKS_LIMIT,
                filters,
            });

            setCurrentWorks([...currentWorks, ...response.items]);
            setTotalCount(response.total);
        } finally {
            setIsLoadingWorks(false);
        }
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
            clickAction: () => router.replace(TELEGRAM_CHANNEL_URL),
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
                                key={work.id ?? num}
                                work={work}
                            />
                        )
                        :
                        <div className={styles.emptyBlock}>
                            <MiniTitle classNames={styles.emptySpan}>Упс.. Ничего не найдено</MiniTitle>
                        </div>
                    }
                </div>
                {currentWorks.length < totalCount ?
                    <div className={styles.moreBtnBlock}>
                        <GreenButton classNames={styles.moreBtn} onClick={moreClickHandle}>
                            {isLoadingWorks ? 'Загрузка...' : 'Показать еще'}
                        </GreenButton>
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
