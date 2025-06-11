'use client'
import React from 'react';
import styles from './GreenButton.module.scss';

interface ButtonProps {
    classNames?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    ref?: React.RefObject<HTMLButtonElement | null>;
}

const GreenButton = ({children, classNames, onClick, ref}: ButtonProps) => {
    return (
        <button
            className={`${classNames ? styles.greenButton + ' ' + classNames : styles.greenButton}`}
            onClick={(e) => onClick ? onClick(e) : ''}
            ref={ref || null}
        >
            {children}
        </button>
    );
};

export default GreenButton;