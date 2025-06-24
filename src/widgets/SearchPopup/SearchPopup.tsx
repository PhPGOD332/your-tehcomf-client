import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './SearchPopup.module.scss';

export interface SearchPopupProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

const SearchPopup = (
    {
        isOpen,
        setIsOpen
    }: SearchPopupProps) => {
    const [isFilled, setIsFilled] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const closePopupHandler = () => {
        setIsOpen(false);
    }

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputEl = e.currentTarget as HTMLInputElement;

        setIsFilled(inputEl.value.length > 0);
    }

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflowYHidden');
            inputRef.current?.focus();
        } else if (!isOpen) {
            document.body.classList.remove('overflowYHidden');
        }

    }, [isOpen]);

    return (
        <div className={`${styles.searchWrapper} ${!isOpen ? styles.searchWrapper_hidden : ''}`}>
            <div className={`${styles.searchInnerWrapper} ${isOpen ? styles.searchInnerWrapper_animated : ''}`}>
                <div className={styles.closeBtn} onClick={() => closePopupHandler()}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L12.2929 12.2929C12.6834 12.6834 12.6834 13.3166 12.2929 13.7071L2 24"
                              stroke="#29292B"
                              strokeWidth="3" strokeLinecap="round"/>
                        <path d="M24 2L13.7071 12.2929C13.3166 12.6834 13.3166 13.3166 13.7071 13.7071L24 24"
                              stroke="#29292B" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className={`${styles.inputSide} ${isFilled ? styles.inputSide_filled : ''}`}>
                    <span
                        className={`${styles.labelSpan} ${isFilled ? styles.labelSpan_filled : ''}`}
                    >поиск</span>
                    <label className={styles.inputLabel}>
                        <input
                            className={styles.textInput}
                            placeholder={'Введите запрос'}
                            onChange={(e) => {changeInputHandler(e)}}
                            ref={inputRef}
                        />
                        <div className={styles.searchButton}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.6667 25.3333C20.5577 25.3333 25.3333 20.5577 25.3333 14.6667C25.3333 8.77563 20.5577 4 14.6667 4C8.77563 4 4 8.77563 4 14.6667C4 20.5577 8.77563 25.3333 14.6667 25.3333Z"
                                    stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M28 27.9996L22.2 22.1996" stroke="#FAFAFA" strokeWidth="3"
                                      strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </label>
                    <span className={styles.subSpan}>В поиске найдётся всё</span>
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;