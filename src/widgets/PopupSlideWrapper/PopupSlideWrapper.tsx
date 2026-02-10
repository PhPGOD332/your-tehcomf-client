import React, {useEffect, useRef, useState} from 'react';
import styles from './PopupSlideWrapper.module.scss';

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    classNames?: string;
    children: React.ReactNode;
}

const PopupSlideWrapper = (
    {
        isOpen,
        setIsOpen,
        classNames,
        children
    }: PopupProps
) => {
    const popupContentRef = useRef<HTMLDivElement | null>(null);
    const [popupPosition, setPopupPosition] = useState(0);
    const [popupStartPos, setPopupStartPos] = useState(0);
    const [popupHeight, setPopupHeight] = useState(0);

    const touchPopupStartDragHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!popupContentRef.current) return;

        const touch = e.touches[0];
        setPopupStartPos(touch.clientY);
    }

    const touchMoveHandle = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!popupContentRef.current) return;

        const touch = e.touches[0];
        const currY = touch.clientY - popupStartPos;

        if (currY > 0) {
            setPopupPosition(-popupHeight + currY);
        }
    }

    const touchEndHandle = () => {
        if (!popupContentRef.current) return;

        if (popupPosition > -(popupHeight / 2)) {
            setIsOpen(false);
        } else {
            setPopupPosition(-popupHeight || 0);
        }
    }

    useEffect(() => {
        setPopupPosition(-popupHeight);
    }, [popupHeight]);

    useEffect(() => {
        if (popupPosition !== 0) {
            if (!popupContentRef.current)
                return;

            const resizeObserver = new ResizeObserver(() => {
                if (popupContentRef.current && popupContentRef.current?.offsetHeight !== popupHeight) {
                    if ("offsetHeight" in popupContentRef.current)
                        setPopupHeight(popupContentRef.current.offsetHeight);
                }
            });

            resizeObserver.observe(popupContentRef.current as Element);

            return function cleanup() {
                resizeObserver.disconnect();
            }
        }
    }, [popupPosition, popupHeight]);

    useEffect(() => {
        if (!popupContentRef.current) return;

        if (isOpen) {
            document.body.classList.add('overflowYHidden');
            setPopupPosition(-popupContentRef.current?.offsetHeight || 0);
        } else {
            document.body.classList.remove('overflowYHidden');
            setPopupPosition(0);
        }
    }, [isOpen]);

    return (
        <div
            className={`${styles.popupContent} ${!isOpen ? styles.popupContent_hidden : ''} ${classNames ?? ''}`}
            ref={popupContentRef}
            style={{
                transform: `translateY(${popupPosition}px)`,
                // bottom: `${popupPosition}px`,
                transition: '0.1s',
                // bottom: '-100%'
                top: '100%'
            }}
        >
            <div
                className={styles.mobileDragBlock}
                onTouchStart={touchPopupStartDragHandler}
                onTouchMove={touchMoveHandle}
                onTouchEnd={touchEndHandle}
            ></div>
            {children}
        </div>
    );
};

export default PopupSlideWrapper;