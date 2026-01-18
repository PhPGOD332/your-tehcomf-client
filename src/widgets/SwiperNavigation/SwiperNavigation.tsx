import React from 'react';
import {useSwiper} from "swiper/react";
import styles from "./SwiperNavigation.module.scss";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";

interface SwiperNavigationProps {
    isMobilePanel?: boolean;
    mobilePanelHandler?: () => void;
    desktopClassNames?: string;
    mobileClassNames?: string;
}

const SwiperNavigation = (
    {
        isMobilePanel = false,
        mobilePanelHandler = () => null,
        desktopClassNames,
        mobileClassNames
    }: SwiperNavigationProps) => {
    const swiper = useSwiper();
    const isMobile = useMediaQuery('(max-width: 1000px)');

    return (
        <>
            {isMobile && isMobilePanel
                ?
                    <div className={`${styles.navigationMobileBlock} ${mobileClassNames ?? ''}`}>
                        <button
                            className={styles.navigationPrevEl}
                            onClick={() => swiper.slidePrev()}
                        >
                            <svg width="26" height="19" viewBox="0 0 26 19" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 9.49982H2.61086" stroke="#FAFAFA" strokeWidth="3"
                                      strokeLinecap="round"/>
                                <path d="M2.00008 9.50009L9.3335 2" stroke="#FAFAFA" strokeWidth="3"
                                      strokeLinecap="round"/>
                                <path d="M2.00008 9.49978L9.3335 16.9999" stroke="#FAFAFA" strokeWidth="3"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <DragAndDropButton
                            isResetButton={true}
                            resetTimeout={1000}
                            buttonStyle={'LIGHT'}
                            formSubmit={mobilePanelHandler}
                            beforeDragCaption={'Узнать больше'}
                            afterDragCaption={'Отпустите'}
                            afterDropCaption={'Вперёд!'}
                        />
                    </div>
                :
                <div className={`${styles.navigationBlock} ${desktopClassNames ?? ''}`}>
                    <div className={styles.navigationPrevEl} onClick={() => swiper.slidePrev()}>
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2L7.70711 12.2929C7.31658 12.6834 7.31658 13.3166 7.70711 13.7071L18 24"
                                  stroke="#EFEFEF" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <div className={styles.navigationNextEl} onClick={() => swiper.slideNext()}>
                        <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 2L17.2929 12.2929C17.6834 12.6834 17.6834 13.3166 17.2929 13.7071L7 24"
                                  stroke="#EFEFEF" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            }
        </>
    )
        ;
};

export default SwiperNavigation;