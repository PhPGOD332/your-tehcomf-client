import React, {ChangeEvent, useState} from 'react';
import styles from './CheckInput.module.scss';

interface CheckProps {
    caption: string;
    firstIsChecked?: boolean;
}

const CheckInput = (
    {
        caption,
        firstIsChecked = false,
    }: CheckProps) => {
    const [isChecked, setIsChecked] = useState(firstIsChecked);

    const checkHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsChecked(!isChecked);
    }

    return (
        <label className={`${isChecked ? styles.checkLabel_checked : styles.checkLabel}`}>
            <span className={styles.checkSpan}>{caption}</span>
            <input
                type="checkbox"
                className={styles.checkInput}
                checked={isChecked}
                onChange={(e) => checkHandler(e)}
            />
            <div className={`${isChecked ? styles.checkIcon_checked : styles.checkIcon}`}>
                {isChecked
                    &&
                <svg width="9.5" height="7" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5L3.2706 7.14903C3.65929 7.60251 4.35624 7.61636 4.76265 7.17869L10.5 1"
                          stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                }
            </div>
        </label>
    );
};

export default CheckInput;