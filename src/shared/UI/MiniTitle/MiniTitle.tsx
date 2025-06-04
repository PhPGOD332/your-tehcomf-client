import React from 'react';
import styles from './MiniTitle.module.scss';
import {TitleProps} from "@/shared/UI/SubTitle/SubTitle";

const MiniTitle = ({children, color = 'black', classNames}: TitleProps) => {
    return (
        <h3
            style={{color: color}}
            className={`${classNames ? styles.miniTitle + ' ' + classNames : styles.miniTitle}`}
        >
            {children}
        </h3>
    );
};

export default MiniTitle;