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
    formTitle: string;
    formText: string;
    formChecks?: string[];
}

const formsInfo: IFormInfo[] = [
    {
        isReset: true,
        bgImageSrc: '/icons/track-icon.svg',
        formTitle: 'Я хочу замерить помещение<br> и проконсультироваться<br> с дизайнером',
        formText: 'Наш специалист приедет к вам с рулеткой, блокнотом и кучей идей. Обсудим, что вам нравится, померяем пространство и вместе придумаем, как реализовать вашу мечту',
        formChecks: ['Бесплатный выезд', 'Экспертная консультация', 'Образцы материалов и цветов'],

    },
    {
        isReset: true,
        bgImageSrc: '/icons/3dmodeling-icon.svg',
        formTitle: 'У меня уже есть все замеры,<br> и я хочу визуализировать<br> и создать красивый 3D-проект',
        formText: 'Превратим ваши "хочу" в 3D-проект с продуманными деталями. Вы увидите, как всё будет выглядеть, прежде чем мы начнём работу. Возможны правки и консультация',
        formChecks: ['Бесплатно онлайн', 'Бесплатные правки', 'Помощь с выбором материалов']
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
                            formTitle={form.formTitle}
                            formText={form.formText}
                            formCheckItems={form.formChecks}
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
                    noSwiping={true}
                    noSwipingClass={'no-swiping'}
                >
                {formsInfo.map((form, num) =>
                    <SwiperSlide
                        key={num}
                        className={styles.formSlide}
                    >
                        <OrderSwapForm
                            isReset={form.isReset}
                            bgImageSrc={form.bgImageSrc}
                            formTitle={form.formTitle}
                            formText={form.formText}
                            formCheckItems={form.formChecks}
                        />
                    </SwiperSlide>
                )}
                </Swiper>
            </div>
        </div>
    );
};

export default OrderForms;