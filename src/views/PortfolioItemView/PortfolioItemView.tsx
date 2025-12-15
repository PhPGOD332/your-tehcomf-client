import React from 'react';
import styles from './PortfolioItemView.module.scss';
import SubTitle from "@/shared/UI/SubTitle/SubTitle";
import {IWork} from "@/types/IWork";
import Link from "next/link";
import {pagesLinks} from "@/shared/constants";
interface PortfolioItemProps {
    title?: string;
    subTitle?: string;
    work: IWork;
}

const PortfolioItemView = (
    {
        work
    }: PortfolioItemProps
) => {
    return (
        <div className={styles.portfolioItemView}>
            <div className="container">
                <div className={styles.navPanel}>
                    <div className={styles.navBar}>
                        <Link
                            href={'/' + pagesLinks.portfolio}
                            className={styles.prevLink}
                        >
                            Портфолио
                        </Link>
                        <span className={styles.prevLink}>
                            <svg width="5" height="10" viewBox="0 0 5 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.545898 0.545472L4.28877 4.28834C4.43078 4.43035 4.43078 4.66059 4.28877 4.8026L0.545899 8.54547"
                                stroke="#58595B" strokeWidth="1.09091" strokeLinecap="round"/>
                            </svg>
                        </span>
                        <span className={styles.navSpan}>
                            {work.title}
                        </span>
                    </div>
                    <div className={styles.navBar}>
                        <Link href={'#'} className={styles.shareLink}>
                            <span className={styles.navSpan}>Поделиться</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.3343 2C14.6271 2 13.9488 2.28095 13.4487 2.78105C12.9486 3.28115 12.6676 3.95942 12.6676 4.66667C12.6688 4.85411 12.6898 5.04091 12.7301 5.22396L6.67546 8.2513C6.42574 7.9638 6.11734 7.73312 5.77101 7.57478C5.42468 7.41644 5.04845 7.33411 4.66764 7.33333C3.9604 7.33333 3.28212 7.61428 2.78203 8.11438C2.28193 8.61448 2.00098 9.29276 2.00098 10C2.00098 10.7072 2.28193 11.3855 2.78203 11.8856C3.28212 12.3857 3.9604 12.6667 4.66764 12.6667C5.04857 12.6662 5.42499 12.5842 5.77155 12.4261C6.11811 12.268 6.42677 12.0374 6.67676 11.75L12.7275 14.776C12.6881 14.9592 12.668 15.146 12.6676 15.3333C12.6676 16.0406 12.9486 16.7189 13.4487 17.219C13.9488 17.719 14.6271 18 15.3343 18C16.0416 18 16.7198 17.719 17.2199 17.219C17.72 16.7189 18.001 16.0406 18.001 15.3333C18.001 14.6261 17.72 13.9478 17.2199 13.4477C16.7198 12.9476 16.0416 12.6667 15.3343 12.6667C14.9534 12.6671 14.577 12.7491 14.2304 12.9073C13.8838 13.0654 13.5752 13.2959 13.3252 13.5833L7.27441 10.5573C7.3139 10.3741 7.33398 10.1874 7.33431 10C7.33303 9.81299 7.31208 9.62664 7.27181 9.44401L13.3265 6.41667C13.5763 6.70393 13.8848 6.93437 14.2311 7.09248C14.5774 7.25059 14.9536 7.33272 15.3343 7.33333C16.0416 7.33333 16.7198 7.05238 17.2199 6.55229C17.72 6.05219 18.001 5.37391 18.001 4.66667C18.001 3.95942 17.72 3.28115 17.2199 2.78105C16.7198 2.28095 16.0416 2 15.3343 2Z"
                                    fill="#0A0A0A"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className={styles.titleBlock}>
                    <SubTitle classNames={styles.title}>{work.title}</SubTitle>

                </div>
                <div className={styles.propertiesBlock}>

                </div>
            </div>
        </div>
    );
};

export default PortfolioItemView;