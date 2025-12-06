'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './Select.module.scss';
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";

interface SelectProps {
    width: number;
    caption: string;
    options: IFilterColor[] | IFilterType[] | IFilterLayout[] | IFilterBudget[];
    changeHandle: (optionName: string) => void;
}

const Select = (
    {
        width = 208,
        caption,
        options,
        changeHandle
    }: SelectProps
) => {
    const [value, setValue] = useState<string>(caption ?? options[0].name);
    const selectRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        if (changeHandle)
            changeHandle(value);
    }, [value]);

    return (
        <label className={styles.selectWrapper} style={{width: width}}>
            <select
                className={styles.select}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                ref={selectRef}
            >
                <option value={caption} disabled>{caption}</option>
                {options && options.length > 0 ? options.map((option, key) =>
                    <option
                        key={key}
                        value={option.name}
                        onClick={() => setValue(option.name)}
                        className={styles.option}
                    >{option.caption}</option>
                )
                    :
                    ''
                }
            </select>
            <span className={styles.arrow}>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7998 0.800049L7.1855 6.41435C6.97249 6.62737 6.62712 6.62737 6.41411 6.41435L0.799804 0.800049"
                          stroke="#58595B" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
            </span>
        </label>
    );
};

export default Select;