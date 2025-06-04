'use client'
import React from 'react';
import styles from './GreenButton.module.scss';

interface ButtonProps {
    classNames?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

const GreenButton = ({children, classNames, onClick}: ButtonProps) => {
    return (
        <button
            className={`${styles.greenButton} ${classNames}`}
            onClick={(e) => onClick ? onClick(e) : ''}
        >
            {children}
        </button>
    );
};

export default GreenButton;