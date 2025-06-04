import React from 'react';
import styles from './SubTitle.module.scss';

export enum TitleColors {
    BLACK = 'black',
    WHITE = 'white'
}

export interface TitleProps {
    color?: TitleColors;
    classNames?: string;
    children: React.ReactNode;
}

const SubTitle = ({children, color = TitleColors.BLACK, classNames}: TitleProps) => {
    return (
        <h2
            style={{color: color}}
            className={`${classNames ? styles.subTitle + ' ' + classNames : styles.subTitle}`}
        >
            {children}
        </h2>
    );
};

export default SubTitle;