import React from 'react';
import styles from './MiniTitle.module.scss';
import {TitleColors, TitleProps} from "@/shared/UI/SubTitle/SubTitle";

const MiniTitle = ({children, htmlContent, color = TitleColors.BLACK, classNames}: TitleProps) => {
    return (
        <>
            {htmlContent ?
                <h3
                    style={{color: color}}
                    className={`${classNames ? styles.miniTitle + ' ' + classNames : styles.miniTitle}`}
                    dangerouslySetInnerHTML={{__html: htmlContent ?? ''}}
                >
                </h3>
                :
                <h3
                    style={{color: color}}
                    className={`${classNames ? styles.miniTitle + ' ' + classNames : styles.miniTitle}`}
                >
                    {children}
                </h3>
            }
        </>
    );
};

export default MiniTitle;