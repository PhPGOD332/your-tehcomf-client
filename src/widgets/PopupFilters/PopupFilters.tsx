'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './PopupFilters.module.scss';
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import {TFilter, IFilters, TNameCategory} from "@/types/IFilters";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    types: IFilterType[];
    colors: IFilterColor[];
    stylingItems: IFilterLayout[];
    budgets: IFilterBudget[];
    filters: IFilters;
    filtersApplyHandler: (
        filters: IFilters
    ) => void;
    clearFiltersHandle: () => void;
}

type TCategory = {
    name: TNameCategory;
    caption: string;
    isActive?: boolean;
}

interface IViewFilters {
    activeCategory: TCategory | null;
    filters: IFilterType[] | IFilterBudget[] | IFilterLayout[] | IFilterColor[];
}

const isFilterFound = (filterName: string, filtersList: IFilters): boolean => {
    for (const [, filter] of Object.entries(filtersList)) {
        if (filter && filterName === filter.name) {
            return true;
        }
    }

    return false;
}

const isFiltersListsEquals = (filtersList1: IFilters, filtersList2: IFilters): boolean => {
    for (const [name1, filter1] of Object.entries(filtersList1)) {
        for (const [name2, filter2] of Object.entries(filtersList2)) {
            if (name1 === name2) {
                if (filter1?.name !== filter2?.name)
                    return false;
            }
        }
    }

    return true;
}

const PopupFilters = (
    {
        isOpen,
        setIsOpen,
        filters,
        filtersApplyHandler,
        types,
        colors,
        stylingItems,
        budgets,
        clearFiltersHandle
    }: PopupProps
) => {
    const popupBgRef = useRef<HTMLDivElement | null>(null);
    const popupContentRef = useRef<HTMLDivElement | null>(null);

    const isMobile = useMediaQuery('(max-width: 1000px)');
    const [popupPosition, setPopupPosition] = useState(0);
    const [popupStartPos, setPopupStartPos] = useState(0);
    const [popupHeight, setPopupHeight] = useState(0);

    const [currentFilters, setCurrentFilters] = useState<IFilters>(filters);

    const categories: TCategory[] = [
        {
            name: 'type',
            caption: 'Тип',
        },
        {
            name: 'budget',
            caption: 'Бюджет'
        },
        {
            name: 'layout',
            caption: 'Планировка'
        },
        {
            name: 'color',
            caption: 'Цвет'
        }
    ];

    const [viewFilters, setViewFilters] = useState<IViewFilters>({
        activeCategory: categories[0],
        filters: types
    });
    const [isFiltersEquals, setIsFiltersEquals] = useState<boolean>(() => isFiltersListsEquals(currentFilters, filters));

    const bgPopupHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === popupBgRef.current)
            setIsOpen(false);
    }

    const touchPopupStartDragHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!popupContentRef.current) return;

        const touch = e.touches[0];
        setPopupStartPos(touch.clientY);
    }

    const touchMoveHandle = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!popupContentRef.current) return;

        const touch = e.touches[0];
        const currY = touch.clientY - popupStartPos;

        if (currY > 0) {
            setPopupPosition(-popupHeight + currY);
        }
    }

    const touchEndHandle = () => {
        if (!popupContentRef.current) return;

        if (popupPosition > -(popupHeight / 2)) {
            setIsOpen(false);
        } else {
            setPopupPosition(-popupHeight || 0);
        }
    }

    useEffect(() => {
        setPopupPosition(-popupHeight);
    }, [popupHeight]);

    useEffect(() => {
        if (popupPosition !== 0) {
            if (!popupContentRef.current)
                return;

            const resizeObserver = new ResizeObserver(() => {
                if (popupContentRef.current && popupContentRef.current?.offsetHeight !== popupHeight) {
                    if ("offsetHeight" in popupContentRef.current)
                        setPopupHeight(popupContentRef.current.offsetHeight);
                }
            });

            resizeObserver.observe(popupContentRef.current as Element);

            return function cleanup() {
                resizeObserver.disconnect();
            }
        }
    }, [popupPosition, popupHeight]);

    useEffect(() => {
        if (!popupContentRef.current) return;

        if (isOpen) {
            document.body.classList.add('overflowYHidden');
            setPopupPosition(-popupContentRef.current?.offsetHeight || 0);
        } else {
            document.body.classList.remove('overflowYHidden');
            setPopupPosition(0);
        }
    }, [isOpen]);

    const categoryClickHandler = (category: TCategory) => {
        let checkCategories: never;

        switch (category.name) {
            case "type":
                setViewFilters({activeCategory: category, filters: types});
                return;
            case "budget":
                setViewFilters({activeCategory: category, filters: budgets});
                return;
            case "layout":
                setViewFilters({activeCategory: category, filters: stylingItems});
                return;
            case "color":
                setViewFilters({activeCategory: category, filters: colors});
                return;
            default:
                checkCategories = category.name;
                setViewFilters({activeCategory: null, filters: []});
                return checkCategories;
        }
    }

    const changeCurrentFilters = (filter: TFilter) => {
        let checkFilters: never;

        switch (filter.type) {
            case "type":
                setCurrentFilters({...currentFilters, type: filter});
                return;
            case "layout":
                setCurrentFilters({...currentFilters, layout: filter});
                return;
            case "budget":
                setCurrentFilters({...currentFilters, budget: filter});
                return;
            case "color":
                setCurrentFilters({...currentFilters, color: filter});
                return;
            default:
                checkFilters = filter;
                return checkFilters;
        }
    }

    const applyFilters = () => {
        filtersApplyHandler({...currentFilters});
        setIsOpen(false);
    }

    const clearFilters = () => {
        if (clearFiltersHandle)
            clearFiltersHandle();
        setIsOpen(false);
    }

    useEffect(() => {
        setCurrentFilters(filters);
    }, [filters]);

    useEffect(() => {
        setIsFiltersEquals(() => isFiltersListsEquals(currentFilters, filters));
    }, [currentFilters]);

    return (
        <>
            {!isMobile ?
                <div
                    className={`${styles.popupWrapper} ${!isOpen ? styles.popupWrapper_hidden : ''}`}
                    ref={popupBgRef}
                    onClick={(e) => bgPopupHandler(e)}
                >
                    <div
                        className={isOpen ? styles.popupContent : styles.popupWrapper_hidden}
                        ref={popupContentRef}
                    >
                        <div className={styles.mobileDragBlock}></div>
                        <div className={styles.filtersBlock}>
                            <div className={styles.header}>
                                <span className={styles.title}>Фильтр</span>
                                <button
                                    className={styles.clearBtn}
                                    onClick={clearFilters}
                                >
                                    Сбросить
                                </button>
                            </div>
                            <div className={styles.filters}>
                                <div className={styles.categories}>
                                    {categories.map((category, num) =>
                                        <button
                                            key={num}
                                            className={`${styles.category} ${viewFilters.activeCategory && viewFilters.activeCategory.name === category.name ? styles.category_active : ''}`}
                                            onClick={() => categoryClickHandler(category)}
                                        >
                                            {category.caption}
                                        </button>
                                    )}
                                </div>
                                <div className={styles.filtersList}>
                                    {viewFilters.filters ? viewFilters.filters.map((filter, num) =>
                                        <div
                                            className={styles.filter}
                                            key={num}
                                            onClick={() => changeCurrentFilters(filter)}
                                        >
                                            <span className={styles.caption}>{filter.caption}</span>
                                            <div className={`${styles.checkIcon} ${isFilterFound(filter.name, currentFilters) ? styles.checkIcon_active : ''}`}>
                                                {isFilterFound(filter.name, currentFilters) ?
                                                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M1.40039 6.30039L4.57922 10.009C5.1234 10.6439 6.09912 10.6633 6.6681 10.0506L14.7004 1.40039"
                                                            stroke="#FAFAFA" strokeWidth="2.8" strokeLinecap="round"/>
                                                    </svg>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </div>
                                        )
                                        :
                                        ''
                                    }
                                </div>
                                <div className={styles.applyBtnBlock}>
                                    <GreenButton
                                        classNames={`${styles.applyBtn} ${isFiltersEquals ? styles.applyBtn_inactive : ''}`}
                                        onClick={() => applyFilters()}
                                    >Применить</GreenButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div
                    className={`${styles.popupContent} ${!isOpen ? styles.popupContent_hidden : ''}`}
                    ref={popupContentRef}
                    style={{
                        transform: `translateY(${popupPosition}px)`,
                        // bottom: `${popupPosition}px`,
                        transition: '0.1s',
                        // bottom: '-100%'
                        top: '100%'
                    }}
                >
                    <div
                        className={styles.mobileDragBlock}
                        onTouchStart={touchPopupStartDragHandler}
                        onTouchMove={touchMoveHandle}
                        onTouchEnd={touchEndHandle}
                    ></div>
                    <div className={styles.filtersBlock}>
                        <div className={styles.header}>
                            <span className={styles.title}>Фильтр</span>
                            <button
                                className={styles.clearBtn}
                                onClick={clearFilters}
                            >
                                Сбросить
                            </button>
                        </div>
                        <div className={styles.filters}>
                            <div className={styles.categories}>
                                {categories.map((category, num) =>
                                    <button
                                        key={num}
                                        className={`${styles.category} ${viewFilters.activeCategory && viewFilters.activeCategory.name === category.name ? styles.category_active : ''}`}
                                        onClick={() => categoryClickHandler(category)}
                                    >
                                        {category.caption}
                                    </button>
                                )}
                            </div>
                            <div className={styles.filtersList}>
                                {viewFilters.filters ? viewFilters.filters.map((filter, num) =>
                                        <div
                                            className={styles.filter}
                                            key={num}
                                            onClick={() => changeCurrentFilters(filter)}
                                        >
                                            <span className={styles.caption}>{filter.caption}</span>
                                            <div
                                                className={`${styles.checkIcon} ${isFilterFound(filter.name, currentFilters) ? styles.checkIcon_active : ''}`}>
                                                {isFilterFound(filter.name, currentFilters) ?
                                                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M1.40039 6.30039L4.57922 10.009C5.1234 10.6439 6.09912 10.6633 6.6681 10.0506L14.7004 1.40039"
                                                            stroke="#FAFAFA" strokeWidth="2.8" strokeLinecap="round"/>
                                                    </svg>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </div>
                                    )
                                    :
                                    ''
                                }
                            </div>
                            <div className={styles.applyBtnBlock}>
                                <GreenButton
                                    classNames={`${styles.applyBtn} ${isFiltersEquals ? styles.applyBtn_inactive : ''}`}
                                    onClick={() => applyFilters()}
                                >Применить</GreenButton>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PopupFilters;