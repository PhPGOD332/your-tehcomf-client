import React from 'react';
import styles from './PortfolioCard.module.scss';
import {IWork} from "@/types/IWork";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import Link from "next/link";
import {pagesLinks} from "@/shared/constants";
import Image from "next/image";

interface ICardProps {
    work: IWork;
}

const PortfolioCard = React.memo((
    {
        work
    }: ICardProps
) => {

    return (
        <Link href={`${pagesLinks.portfolio}/${work.name}`} className={styles.card}>
            <div className={styles.imageBlock}>
                {work && work.images && work.images.length > 0 ?
                    <Image
                        loader={() => work.images[0].src}
                        src={work.images[0].src}
                        alt={work.images[0].imageAlt ?? ''}
                        fill={true}
                        className={styles.image}
                    />
                    :
                    ''
                }
            </div>
            <div className={styles.description}>
                <div className={styles.tags}>
                    {[work.tableTopColor, work.bodyColor, ...work.facadeColors]
                        .filter((color, num, self) => num === self.findIndex((c) => c.hexCode === color.hexCode))
                        .filter((color, num) => num < 3)
                            .map((color, num) =>
                        <div
                            key={num}
                            className={`${styles.tag}`}
                            style={color.name === 'white' ? {backgroundColor: color.hexCode, border: '1.5px solid #58595B'} : {backgroundColor: color.hexCode}}></div>
                    )}
                </div>
                <div className={styles.type}>
                    <span className={styles.typeSpan}>{work.type.caption ?? ''}</span>
                </div>
                <div className={styles.titleBlock}>
                    <MiniTitle classNames={styles.cardTitle}>{work.title ?? ''}</MiniTitle>
                </div>
                <div className={styles.categories}>
                    <span className={`${styles.category} ${styles.firstCategory}`}>{work.style.caption}</span>
                    <span className={`${styles.category}`}>{work.layout.caption ?? ''}</span>
                </div>
            </div>
        </Link>
    );
});

PortfolioCard.displayName = 'PortfolioCard';

export default PortfolioCard;