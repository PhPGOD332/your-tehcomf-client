'use client'
import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./StockBanners.module.scss";
import {Autoplay} from "swiper/modules";
import StockBanner from "@/widgets/StockBanner/StockBanner";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import {IStock} from "@/types/IStock";
import SubTitle from "@/shared/UI/SubTitle/SubTitle";

interface StocksProps {
    title: string;
    stocks: IStock[];
}

const StockBanners = (
    {
        title,
        stocks
    }: StocksProps
) => {
    const isMobile = useMediaQuery('(max-width: 1150px)');

    return (
        <div className={styles.stocksWrapper}>
            <SubTitle classNames={styles.stocksTitle}>{title}</SubTitle>
            {isMobile ?
            <Swiper
                className={styles.stocksSwiper}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={'auto'}
                effect={"slide"}
                preventInteractionOnTransition={true}
                noSwiping={true}
                noSwipingClass={'no-swiping'}
            >
                {stocks.map((stock, num) =>
                    <SwiperSlide
                        className={styles.stockSlide}
                        key={num}
                    >
                        <StockBanner
                            caption={stock.caption}
                            mobileCaption={stock.mobileCaption}
                            buttonText={stock.buttonText}
                            clickAction={stock.clickAction}
                            color={stock.color}
                            image={stock.image}
                            imageAlt={stock.imageAlt}
                            imageWidth={stock.imageWidth}
                            imageHeight={stock.imageHeight}
                            imageStyles={stock.imageStyles}
                            mobileImage={stock.mobileImage}
                            mobileImageWidth={stock.mobileImageWidth}
                            mobileImageHeight={stock.mobileImageHeight}
                            mobileImageStyles={stock.mobileImageStyles}
                            mobileImageAlt={stock.mobileImageAlt}
                        />
                    </SwiperSlide>
                )}
            </Swiper>
            :
            <div className={styles.stocks}>
                {stocks.map((stock, num) =>
                    <StockBanner
                        key={num}
                        caption={stock.caption}
                        buttonText={stock.buttonText}
                        clickAction={stock.clickAction}
                        color={stock.color}
                        image={stock.image}
                        imageAlt={stock.imageAlt}
                        imageWidth={stock.imageWidth}
                        imageHeight={stock.imageHeight}
                        imageStyles={stock.imageStyles}
                        mobileImage={stock.mobileImage}
                        mobileImageWidth={stock.mobileImageWidth}
                        mobileImageHeight={stock.mobileImageHeight}
                    />
                )}
            </div>
            }
        </div>
    );
};

export default StockBanners;