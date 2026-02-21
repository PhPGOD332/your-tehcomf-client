import React from 'react';
import styles from './InNumbers.module.scss';
import SubTitle from "@/shared/UI/SubTitle/SubTitle";
import Image from "next/image";
import girl from '@/data/images/digits/girl.jpg';
import man1 from '@/data/images/digits/man.jpg';
import man2 from '@/data/images/digits/man2.jpg';
import bgTown from '@/data/images/digits/bg_town.png';
import bgCircle from '@/data/images/digits/circle.svg';
import {TImage} from "@/types/IImage";

const girlImage: TImage = girl;
const man1Image: TImage = man1;
const man2Image: TImage = man2;
const bgTownImage: TImage = bgTown;
const bgCircleImage: TImage = bgCircle;

const InNumbers = () => {
    return (
        <div className={`${styles.wrapper} container`}>
            <SubTitle classNames={styles.title}>Мы в цифрах</SubTitle>
            <div className={styles.items}>
                <div className={`${styles.item} ${styles.item_kitchensBlock} ${styles.item_lightGreen}`}>
                    <span className={styles.categoryCaption}>Изготовленные кухни</span>
                    <div className={styles.digitsBlock}>
                        <span className={`${styles.digit} ${styles.digit_black}`}>&gt;1500</span>
                    </div>
                    <span className={`${styles.additCaption} ${styles.additCaption_green}`}>за 2024 год</span>
                </div>
                <div className={`${styles.item} ${styles.item_apartmentsBlock} ${styles.item_lightGreen}`}>
                    <span className={styles.categoryCaption}>Мебелированные квартиры</span>
                    <div className={styles.digitsBlock}>
                        <span className={`${styles.digit} ${styles.digit_black}`}>&gt;450</span>
                        <div className={styles.roundImages}>
                            <div className={styles.roundImage}>
                                <Image
                                    src={girlImage.src}
                                    alt={'Менеджер'}
                                    fill={true}
                                />
                            </div>
                            <div className={styles.roundImage}>
                                <Image
                                    src={man1Image.src}
                                    alt={'Менеджер'}
                                    fill={true}
                                />
                            </div>
                            <div className={styles.roundImage}>
                                <Image
                                    src={man2Image.src}
                                    alt={'Менеджер'}
                                    fill={true}
                                />
                            </div>
                        </div>
                    </div>
                    <span className={`${styles.additCaption} ${styles.additCaption_green}`}>в Москве под ключ</span>
                </div>
                <div className={`${styles.item} ${styles.item_designersBlock} ${styles.item_green}`}>
                    <span className={`${styles.captionWithBg} ${styles.captionWithBg_green}`}>+ 3Д-проекты</span>
                    <span className={styles.categoryCaption}>Выезды дизайнеров</span>
                    <div className={styles.digitsBlock}>
                        <span className={`${styles.digit} ${styles.digit_white}`}>&gt;3180</span>
                    </div>
                    <div className={styles.bg}>
                        <Image
                            src={bgCircleImage.src}
                            alt={''}
                            className={styles.bgImage}
                            width={bgCircleImage.width}
                            height={bgCircleImage.height}
                        />
                    </div>
                </div>
                <div className={`${styles.item} ${styles.item_headsetsBlock} ${styles.item_green}`}>
                    <span className={styles.categoryCaption}>Кухонные гарнитуры</span>
                    <div className={styles.digitsBlock}>
                        <span className={`${styles.captionWithBg} ${styles.captionWithBg_green}`}>в ЖК Измайлово</span>
                        <span className={`${styles.digit} ${styles.digit_white}`}>&gt;800</span>
                    </div>
                    <div className={styles.bg}>
                        <Image
                            src={bgTownImage.src}
                            alt={''}
                            className={styles.bgImage}
                            width={bgTownImage.width}
                            height={bgTownImage.height}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InNumbers;