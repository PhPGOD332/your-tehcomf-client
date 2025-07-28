'use client'
import React from 'react';
import styles from './OrderForms.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import OrderSwapForm from "@/widgets/OrderSwapForm/OrderSwapForm";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/modules/effect-coverflow.min.css';

interface IFormInfo {
    isReset: boolean;
    bgImageSrc?: string;
}

const formsInfo: IFormInfo[] = [
    {
        isReset: true,
        bgImageSrc: '/icons/track-icon.svg'
    },
    {
        isReset: true,
        bgImageSrc: '/icons/3dmodeling-icon.svg'
    }
];

const OrderForms = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.formsWrapper}>
                <SubTitle classNames={styles.title} color={TitleColors.WHITE}>От слов — к делу</SubTitle>
                <div className={styles.formsBlock}>
                    {formsInfo.map((form, num) =>
                        <OrderSwapForm
                            key={num}
                            isReset={form.isReset}
                            bgImageSrc={form.bgImageSrc}
                        />
                    )}
                </div>
                <Swiper
                    className={styles.formsSwiper}
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    effect={"slide"}
                    preventInteractionOnTransition={true}
                >
                {formsInfo.map((form, num) =>
                    <SwiperSlide
                        key={num}
                        className={styles.formSlide}
                    >
                        <OrderSwapForm
                            isReset={form.isReset}
                            bgImageSrc={form.bgImageSrc}
                        />
                    </SwiperSlide>
                )}
                </Swiper>
            </div>
        </div>
    );
};

export default OrderForms;