'use client'
import React, {useState} from 'react';
import styles from './PortfolioFilter.module.scss';
import Select from "@/shared/UI/Select/Select";
import {IFilters} from "@/types/IFilters";
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterStyle} from "@/types/PortfolioFilters/IFilterStyle";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import PopupFilters from "@/widgets/PopupFilters/PopupFilters";

interface FilterProps {
    countItems: number;
    types: IFilterType[];
    colors: IFilterColor[];
    stylingItems: IFilterStyle[];
    budgets: IFilterBudget[];
    currentFilters: IFilters;
    filtersApplyHandler: (
        filters: IFilters
    ) => void;
}

const PortfolioFilter = (
    {
        countItems,
        types,
        colors,
        stylingItems,
        budgets,
        currentFilters,
        filtersApplyHandler
    }: FilterProps
) => {
    const [filtersPopupIsOpen, setFiltersPopupIsOpen] = useState(false);

    const colorsChangeHandler = (colorName: string) => {
        filtersApplyHandler({
            ...currentFilters,
            color: colors ? colors.find(color => color.name === colorName) ?? null : null
        });
    }

    const stylesChangeHandler = (styleName: string) => {
        filtersApplyHandler({
            ...currentFilters,
            style: stylingItems ? stylingItems.find(style => style.name === styleName) ?? null : null
        });
    }

    const typesChangeHandler = (typeName: string) => {
        filtersApplyHandler({
            ...currentFilters,
            type: types ? types.find(type => type.name === typeName) ?? null : null
        });
    }

    const budgetsChangeHandler = (budgetName: string) => {
        filtersApplyHandler({
            ...currentFilters,
            budget: budgets ? budgets.find(budget => budget.name === budgetName) ?? null : null
        });
    }

    const clearFiltersHandle = () => {
        filtersApplyHandler({
            style: null,
            type: null,
            color: null,
            budget: null
        })
    }

    return (
        <div className={styles.filterBlock}>
            <div className={styles.filterMobile}>
                <div className={styles.typesFilterBlock}>
                {types ?
                    types.map(type =>
                        <button
                            key={type.id}
                            className={`${styles.filterTypeBtn} ${currentFilters.type && currentFilters.type.name === type.name ? styles.filterTypeBtn_active : ''}`}
                            onClick={currentFilters.type && currentFilters.type.name === type.name ? () => clearFiltersHandle() : () => typesChangeHandler(type.name)}
                        >
                            {type.caption}
                        </button>
                    )
                    :
                    ''
                }
                </div>
                <div className={styles.filterPopupBlock}>
                    <button className={styles.filterPopupBtn}>
                        <svg className={styles.filterBtnIcon} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1630_4626)">
                                <path d="M10.8 10.8L18 3.6V0H0V3.6L7.2 10.8V18L10.8 14.4V10.8Z" fill="#29292B"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1630_4626">
                                    <rect width="18" height="18" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span
                            className={styles.btnSpan}
                            onClick={() => setFiltersPopupIsOpen(true)}
                        >Фильтр</span>

                    </button>
                </div>
            </div>
            <div className={styles.filterDesktop}>
                <Select
                    width={208}
                    caption={'Тип'}
                    options={types}
                    changeHandle={typesChangeHandler}
                />
                <Select
                    width={208}
                    caption={'Бюджет'}
                    options={budgets}
                    changeHandle={budgetsChangeHandler}
                />
                <div className={styles.countBlock}>
                <span className={styles.countSpan}>{countItems} проектов</span>
                </div>
                <Select
                    width={208}
                    caption={'Стиль'}
                    options={stylingItems}
                    changeHandle={stylesChangeHandler}
                />
                <Select
                    width={208}
                    caption={'Цвет'}
                    options={colors}
                    changeHandle={colorsChangeHandler}
                />
            </div>
            <PopupFilters
                isOpen={filtersPopupIsOpen}
                setIsOpen={setFiltersPopupIsOpen}
                filters={currentFilters}
                filtersApplyHandler={filtersApplyHandler}
                types={types}
                colors={colors}
                stylingItems={stylingItems}
                budgets={budgets}
                clearFiltersHandle={clearFiltersHandle}
            />
        </div>
    );
};

export default PortfolioFilter;