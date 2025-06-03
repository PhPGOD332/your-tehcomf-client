import React from 'react';
import styles from './SubTitle.module.scss';

export interface TitleProps {
    color?: 'black' | 'white';
    classNames?: string;
    children: React.ReactNode;
}

const SubTitle = ({children, color = 'black', classNames}: TitleProps) => {
    return (
        <h2
            style={{color: color}}
            className={`${classNames ? classNames + ' ' + styles.subTitle : styles.subTitle}`}
        >
            {children}
        </h2>
    );
};

export default SubTitle;