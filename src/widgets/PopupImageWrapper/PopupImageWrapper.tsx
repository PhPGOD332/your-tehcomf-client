import React, {useEffect, useRef} from 'react';
import styles from './PopupImageWrapper.module.scss';
import Image from "next/image";

interface IPopupImageProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    imgSrc: string;
}

const PopupImageWrapper = (
    {
        isOpen,
        setIsOpen,
        imgSrc
    }: IPopupImageProps
) => {
    const popupWrapperRef = useRef<HTMLDivElement | null>(null);
    const popupContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const wrapper = popupWrapperRef.current;
        if (!wrapper) return;

        const container = popupContainerRef.current;
        if (!container) return;

        const wrapperClickHandler = (e: MouseEvent) => {
            const target = e.target;

            if (target === wrapper && target !== container)
                setIsOpen(false);
        }

        document.addEventListener('click', wrapperClickHandler);

        return () => {
            document.removeEventListener('click', wrapperClickHandler);
        }
    }, []);

    return (
        <div className={`${styles.wrapper} ${isOpen ? styles.wrapper_visible : styles.wrapper_hidden}`} ref={popupWrapperRef}>
            <div className={styles.popupContainer} ref={popupContainerRef}>
                <div className={styles.closeBlock} onClick={() => setIsOpen(false)}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L12.2929 12.2929C12.6834 12.6834 12.6834 13.3166 12.2929 13.7071L2 24"
                              stroke="#29292B"
                              strokeWidth="3" strokeLinecap="round"/>
                        <path d="M24 2L13.7071 12.2929C13.3166 12.6834 13.3166 13.3166 13.7071 13.7071L24 24"
                              stroke="#29292B" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </div>
                {imgSrc &&
			        <Image
				        src={imgSrc}
				        alt={''}
				        fill={true}
			        />
                }
            </div>
        </div>
    );
};

export default PopupImageWrapper;