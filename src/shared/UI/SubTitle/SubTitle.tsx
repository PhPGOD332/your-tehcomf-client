import React from 'react';
import styles from './SubTitle.module.scss';

export enum TitleColors {
    BLACK = 'black',
    WHITE = 'white',
    GRAY = 'gray'
}

export interface TitleProps {
    color?: TitleColors;
    classNames?: string;
    children: React.ReactNode;
    htmlContent?: string;
    as?: 'h1' | 'h2';
}

const SubTitle = ({children, htmlContent, color, classNames, as: Component = 'h2'}: TitleProps) => {
    const getColorStyle = (color: TitleColors): string => {
        let checkColor: never;

        switch (color) {
            case TitleColors.WHITE:
                return styles.white;
            case TitleColors.BLACK:
                return styles.black;
            case TitleColors.GRAY:
                return styles.gray;
            default:
                checkColor = color;
                return checkColor;
        }
    }

    const className = `${styles.subTitle} ${color ? getColorStyle(color) : getColorStyle(TitleColors.BLACK)} ${classNames ?? ''}`;

    return (
        <>
            {htmlContent ?
                <Component
                    className={className}
                    dangerouslySetInnerHTML={{__html: htmlContent ?? ''}}
                >
                </Component>
                :
                <Component
                    className={className}
                >
                    {children}
                </Component>
            }
        </>
    );
};

export default SubTitle;
