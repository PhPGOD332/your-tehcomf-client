import React from 'react';
import styles from './Page404.module.scss';
import {pagesLinks} from "@/shared/constants";
import Link from "next/link";
import Image from "next/image";
import notFound from '@/data/images/404/bg.png';
import notFoundMob from '@/data/images/404/bg_mob.png';
import {TImage} from "@/types/IImage";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import {TitleColors} from "@/shared/UI/SubTitle/SubTitle";

const notFoundBg: TImage = notFound;
const notFoundMobBg: TImage = notFoundMob;

const Page404 = () => {
    return (
        <div className={`container ${styles.wrapper}`}>
            <div className={styles.bgBlock}>
                <Image
                    className={styles.image}
                    src={notFoundBg.src}
                    alt={''}
                    width={notFoundBg.width}
                    height={notFoundBg.height}
                />
            </div>
            <div className={styles.bgMobileBlock}>
                <Image
                    className={styles.image}
                    src={notFoundMobBg.src}
                    alt={''}
                    width={notFoundMobBg.width}
                    height={notFoundMobBg.height}
                />
            </div>
            <div className={`${styles.col} ${styles.emptyCol}`}></div>
            <div className={`${styles.col} ${styles.content}`}>
                <h1 className={styles.code}>404</h1>
                <MiniTitle classNames={styles.miniTitle} color={TitleColors.WHITE}>Чего-то не хватает.</MiniTitle>
                <span className={`${styles.caption} ${styles.caption_desktop}`}>Страница, которую вы ищете, не существует. <br
                    className={styles.transfer}/>
                Проверьте ссылку и попробуйте еще раз.</span>
                <span className={`${styles.caption} ${styles.caption_mobile}`}>Проверьте ссылку <br/> и попробуйте еще раз.</span>
                <Link href={pagesLinks.main} className={`${styles.link}`}>
                    На главную
                    <svg width="35" height="17" viewBox="0 0 35 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.09961 7.00059C0.492096 7.00059 -0.000390649 7.49307 -0.000390649 8.10059C-0.000390649 8.7081 0.492096 9.20059 1.09961 9.20059V8.10059V7.00059ZM33.8774 8.8784C34.307 8.44883 34.307 7.75235 33.8774 7.32277L26.8771 0.322411C26.4475 -0.107165 25.751 -0.107165 25.3214 0.322411C24.8919 0.751988 24.8919 1.44847 25.3214 1.87805L31.544 8.10059L25.3214 14.3231C24.8919 14.7527 24.8919 15.4492 25.3214 15.8788C25.751 16.3083 26.4475 16.3083 26.8771 15.8788L33.8774 8.8784ZM1.09961 8.10059V9.20059H33.0996V8.10059V7.00059H1.09961V8.10059Z"
                            fill="#FAFAFA"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Page404;