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
import {IFilterStyle} from "@/types/PortfolioFilters/IFilterStyle";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";

interface PortfolioProps {
    title: string;
    subTitle: string;
    colors: IFilterColor[];
    stylingItems: IFilterStyle[];
    types: IFilterType[];
    budgets: IFilterBudget[];
    works: IWork[];
}

const PortfolioView = (
    {
        title,
        subTitle,
        colors,
        stylingItems,
        types,
        budgets,
        works = []
    }: PortfolioProps
) => {
    const [currentCount, setCurrentCount] = useState<number>(12);
    const step = 6;
    const [allWorks, setAllWorks] = useState<IWork[]>(works);
    const [currentWorks, setCurrentWorks] = useState<IWork[]>(works.filter((work, num) => num <= currentCount));
    const [filters, setFilters] = useState<IFilters>({
        color: null,
        style: null,
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
            filters.style === null
            && filters.type === null
            && filters.color === null
            && filters.budget === null
        ) {
            setCurrentWorks(getCountedWorks(allWorks));
            return;
        }

        let isFiltered = false;

        for (const [name, filter] of Object.entries(filters)) {
            if (filter) {
                if (filter === filters.style) {
                    if (!isFiltered) {
                        newWorks = [...allWorks.filter(work => work.style.id === filters.style?.id)];

                        isFiltered = true;
                    } else {
                        newWorks = [...newWorks.filter(work => work.style.id === filters.style?.id)];
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
            }
        }

        setCurrentWorks(newWorks);
    }, [filters]);

    useEffect(() => {
        setCurrentCount(currentWorks.length);
    }, [currentWorks]);

    const moreClickHandle = () => {
        setCurrentCount(currentCount + step);
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
                        stylingItems={stylingItems}
                        types={types}
                        budgets={budgets}
                        currentFilters={filters}
                        filtersApplyHandler={filtersApplyHandler}
                    />
                </div>
                <div className={styles.portfolioBlock}>
                    { currentWorks && currentWorks.length > 0 ?
                        currentWorks.map((work, num) =>
                            <PortfolioCard
                                key={num}
                                work={work}
                            />
                        )
                        :
                        ''
                    }
                </div>
                {currentWorks && currentWorks.length > currentCount ?
                    <div className={styles.moreBtnBlock}>
                        <GreenButton onClick={moreClickHandle}>Показать еще</GreenButton>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );
};

export default PortfolioView;