import React, {forwardRef, RefObject, useEffect, useState} from 'react';
import styles from './CheckInput.module.scss';

interface CheckProps {
    caption: string;
    firstIsChecked?: boolean;
    labelRef?: RefObject<HTMLLabelElement | null>;
    changeHandle?: (currentRef: RefObject<HTMLLabelElement | null> | null) => void;
    customIsChecked?: boolean;
    setCustomIsChecked?: (checked: boolean) => void;
    classNames?: string;
}

const CheckInput = forwardRef<HTMLInputElement, CheckProps>((
    {
        caption,
        firstIsChecked = false,
        labelRef,
        changeHandle,
        customIsChecked,
        setCustomIsChecked,
        classNames,
        ...props
    }: CheckProps, ref) => {
    const [isChecked, setIsChecked] = useState(customIsChecked ?? firstIsChecked);

    const checkHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (!customIsChecked || !setCustomIsChecked)
            setIsChecked(false);
        if (changeHandle) {
            changeHandle(labelRef || null);
        }
    }

    useEffect(() => {
        if (setCustomIsChecked) {
            setIsChecked(customIsChecked ?? false);
        }
    }, [customIsChecked]);

    return (
        <label
            className={`${isChecked ? styles.checkLabel_checked : styles.checkLabel} ${classNames ?? ''}`}
            ref={labelRef}
        >
            <span className={styles.checkSpan}>{caption}</span>
            <input
                type="checkbox"
                className={styles.checkInput}
                checked={isChecked}
                onClick={(e) => checkHandler(e)}
                ref={ref}
                {...props}
            />
            <div className={`${isChecked ? styles.checkIcon_checked : styles.checkIcon}`}>
                {isChecked
                    &&
                <svg width="12.5" height="7" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.5L3.2706 7.14903C3.65929 7.60251 4.35624 7.61636 4.76265 7.17869L10.5 1"
                          stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                }
            </div>
        </label>
    );
});

CheckInput.displayName = 'CheckInput';

export default CheckInput;