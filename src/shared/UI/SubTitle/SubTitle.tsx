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
    htmlContent?: string;
}

const SubTitle = ({children, htmlContent, color = TitleColors.BLACK, classNames}: TitleProps) => {
    return (
        <>
            {htmlContent ?
                <h2
                    style={{color: color}}
                    className={`${styles.subTitle} ${classNames ?? ''}`}
                    dangerouslySetInnerHTML={{__html: htmlContent ?? ''}}
                >
                </h2>
                :
                <h2
                    style={{color: color}}
                    className={`${styles.subTitle} ${classNames ?? ''}`}
                >
                    {children}
                </h2>
            }
        </>
    );
};

export default SubTitle;