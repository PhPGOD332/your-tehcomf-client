import React from 'react';
import styles from './ProductionInfo.module.scss';
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import SubTitle from "@/shared/UI/SubTitle/SubTitle";
import Image, {StaticImageData} from "next/image";
import ProductionImage1 from '@/data/images/production/production1.png';
import ProductionImage2 from '@/data/images/production/production2.png';
import {IFillImage} from "@/types/IImage";

const productionImage1: StaticImageData = ProductionImage1;
const productionImage2: StaticImageData = ProductionImage2;

interface IProduction {
    image: IFillImage;
    title: string;
    text: string;
}

const productionItems: IProduction[] = [
    {
        image: {
          src: productionImage1.src,
          fill: true
        },
        title: 'С 1988 года',
        text: 'Мы производим и поставляем кухни и мебель на заказ на собственном производстве в Ульяновской области'
    },
    {
        image: {
            src: productionImage2.src,
            fill: true
        },
        title: 'Лучше один раз сделать хорошо',
        text: 'Поэтому мы изготавливаем продукцию исключительно из проверенных и сертифицированных материалов'
    }
]

const ProductionInfo = () => {
    return (
        <div className={styles.productionInfo}>
            <div className={'container'}>
                <div className={styles.wrapper}>
                    <SubTitle classNames={styles.title}>Наше производство</SubTitle>
                    <div className={styles.productionItems}>
                    {
                        productionItems.map((production, num) =>
                            <div className={styles.productionItem} key={num}>
                                <div className={styles.bgImage}>
                                    <Image src={production.image.src} alt={''} fill={true}/>
                                </div>
                                <MiniTitle classNames={styles.itemTitle}>{production.title}</MiniTitle>
                                <span className={styles.itemText}>{production.text}</span>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductionInfo;