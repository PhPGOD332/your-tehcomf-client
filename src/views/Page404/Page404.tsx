import React from 'react';
import styles from './Page404.module.scss';
import {pagesLinks} from "@/shared/constants";
import Link from "next/link";

const Page404 = () => {
    return (
        <div className={`container ${styles.wrapper}`}>
            <span className={styles.caption}>Извините, страницы <br className={styles.transfer}/> не существует</span>
            <h1 className={styles.title}>404</h1>
            <Link href={pagesLinks.main} className={`${styles.link}`}>Вернуться на главную</Link>
        </div>
    );
};

export default Page404;