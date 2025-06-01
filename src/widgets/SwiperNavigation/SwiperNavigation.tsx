import React from 'react';
import {useSwiper} from "swiper/react";
import styles from "./SwiperNavigation.module.scss";

const SwiperNavigation = () => {
    const swiper = useSwiper();

    return (
        <div className={styles.navigationBlock}>
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
    );
};

export default SwiperNavigation;