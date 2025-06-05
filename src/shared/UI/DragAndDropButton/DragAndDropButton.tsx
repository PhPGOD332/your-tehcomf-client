'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './DragAndDropButton.module.scss';

interface DraggableButtonProps {
    id?: string;
    formSubmit?: () => void;
}

const DragAndDropButton = (
    {
        id,
        formSubmit
    }: DraggableButtonProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragProgress, setDragProgress] = useState(0);
    const [, setMaxX] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dragContainerRef = useRef<HTMLDivElement | null>(null);
    const dragButtonRef = useRef<HTMLDivElement | null>(null);
    const checkRef = useRef<SVGSVGElement | null>(null);
    const arrowRef = useRef<SVGSVGElement | null>(null);

    const handleMouseDown = () => {
        if (!isSubmitted)
            setIsDragging(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !dragContainerRef.current || !dragButtonRef.current) return;

        const containerRect = dragContainerRef.current?.getBoundingClientRect();
        const buttonRect = dragButtonRef.current?.getBoundingClientRect();

        const maxX = containerRect.width - buttonRect.width;
        const newX = Math.min(Math.max(e.clientX - containerRect.left - buttonRect.width, 0), maxX);
        setMaxX(maxX);
        setDragProgress((newX / maxX) * 150);
    }

    const handleMouseUp = () => {
        if (dragProgress >= 50) {
            setIsSubmitted(true);
            setIsDragging(false);
            setDragProgress(100);

            dragContainerRef.current?.classList.add(styles.draggableButton_success);

            arrowRef.current?.classList.add(styles.hidden);
            arrowRef.current?.classList.remove(styles.visible);

            checkRef.current?.classList.add(styles.visible);
            checkRef.current?.classList.remove(styles.hidden);

            if (formSubmit) {
                formSubmit();
            }
        } else {
            setDragProgress(0);
            setIsDragging(false);
        }
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return  () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging, dragProgress]);

    return (
        <div className={styles.draggableButton} ref={dragContainerRef} id={id || ''}>
            <div
                className={styles.draggableWrapper}
                onMouseDown={() => handleMouseDown()}
                style={{transform: `translateX(${dragProgress * 1.40}px)`}}
            >
                <span className={styles.firstCaption}>{isSubmitted ? 'Заявка отправлена!' : 'Отпустите'}</span>
                <div className={styles.iconButton} ref={dragButtonRef}>
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.visible} ref={arrowRef}>
                        <path d="M2 8H19.5" stroke="#58595B" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M20 8L14 2" stroke="#58595B" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M20 8L14 14" stroke="#58595B" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.hidden} ref={checkRef}>
                        <path d="M8 18L18 8" stroke="#00A651" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M8 18L2 12" stroke="#00A651" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </div>
                <span className={styles.secondCaption}>Потяните для отправки</span>
            </div>
        </div>
    );
};

export default DragAndDropButton;