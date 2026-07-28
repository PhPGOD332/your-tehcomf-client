'use client'
import React from 'react';
import styles from './Contacts.module.scss';
import SubTitle from "@/shared/UI/SubTitle/SubTitle";
import Image, {StaticImageData} from "next/image";
import TeamImage from '@/data/images/contacts/team.png';
import WomanImage from '@/data/images/contacts/woman.png';
import {IBooleanOptions} from "@/widgets/Footer/Footer";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import Link from "next/link";
import { MAX_MANAGER_URL } from '@/shared/constants';

type TImage = StaticImageData;

const ContactTeamImage: TImage = TeamImage;
const ContactWomanImage: TImage = WomanImage;

interface ContactsProps {
    isOnlyContacts?: IBooleanOptions,
    classNames?: string;
}

const Contacts = (
    {
        isOnlyContacts,
        classNames
    }: ContactsProps
) => {
    const isMobile = useMediaQuery('(max-width: 1000px)');

    return (
        <div className={`${styles.wrapper} ${classNames ?? ''}`}>
            <div className={`${styles.contactsBlock} ${isOnlyContacts?.desktop || isOnlyContacts?.mobile && styles.contactsBlock_withoutStyle}`}>
                {isOnlyContacts && (!isOnlyContacts?.desktop && !isMobile)
                || (!isOnlyContacts?.mobile && isMobile) ?
                    <div className={styles.captionSide}>
                        <span className={styles.questionSpan}>Остались вопросы?</span>
                        <SubTitle classNames={styles.title}>Свяжитесь с нами</SubTitle>
                    </div>
                    :
                    ''
                }
                <div className={`${styles.contactsSide} ${styles.contactsSide_onlyContacts}`}>
                    <div className={styles.contact}>
                        <Image
                            className={styles.contactImage}
                            src={ContactTeamImage}
                            alt={''}
                        />
                        <div className={styles.contactPreview}>
                            <span className={styles.caption}>Позвонить нам</span>
                            <div className={styles.contactIcon}>
                                <svg width="27" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.8101 16.6964C19.4311 16.4743 18.9654 16.479 18.5883 16.703L16.6787 17.8407C16.2513 18.0955 15.7174 18.0656 15.3254 17.7595C14.6478 17.2303 13.5567 16.3399 12.6075 15.3907C11.6583 14.4415 10.7679 13.3504 10.2387 12.6728C9.93261 12.2808 9.90274 11.747 10.1575 11.3195L11.2953 9.40991C11.5202 9.03284 11.5221 8.56338 11.2999 8.18444L8.49807 3.39831C8.22647 2.93538 7.68701 2.70764 7.16527 2.83551C6.65847 2.95871 6.00047 3.25924 5.31074 3.94991C3.15101 6.10964 2.00394 9.75244 10.1258 17.8743C18.2477 25.9962 21.8895 24.85 24.0502 22.6894C24.7418 21.9978 25.0414 21.3388 25.1655 20.8311C25.2915 20.3103 25.0675 19.7746 24.6055 19.5039C23.4519 18.8291 20.9637 17.3722 19.8101 16.6964Z"
                                        fill="#58595B"/>
                                </svg>
                            </div>
                        </div>
                        <div className={`${styles.contactPostview} ${styles.hidden}`}>
                            <span className={styles.caption}>+7 (495) 032-50-60</span>
                        </div>
                    </div>
                    <Link href={MAX_MANAGER_URL} className={styles.contact}>
                        <Image
                            className={styles.contactImage}
                            src={ContactWomanImage}
                            alt={''}
                        />
                        <div className={styles.contactPreview}>
                            <span className={styles.caption}>Написать менеджеру</span>
                            <div className={styles.contactIcon}>
                                <svg width="32" height="32" viewBox="0 0 701 698" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M337.99 0.492364C129.39 11.3924 -8.31024 174.992 0.38976 381.292C4.18976 471.592 40.4898 549.292 49.0898 634.992C51.2898 657.192 44.8898 684.592 70.4898 694.292C101.99 706.192 150.29 686.192 176.69 667.892C185.69 661.792 194.29 654.692 200.89 645.892C228.19 663.992 254.09 681.492 286.59 689.292C429.69 723.592 586.49 645.092 656.19 518.992C787.19 282.092 610.09 -13.7076 337.99 0.492364ZM256.99 494.892C245.69 503.692 234.79 515.692 222.29 522.592C204.19 532.292 198.59 522.192 191.79 506.192C170.39 455.292 167.79 368.592 180.29 315.292C197.09 242.792 253.19 178.992 330.29 172.192C408.29 165.292 480.69 204.892 513.39 276.392C585.79 435.492 400.49 592.592 256.99 494.992V494.892Z"
                                        fill="#58595B"/>
                                </svg>
                            </div>
                        </div>
                        <div className={`${styles.contactPostview} ${styles.hidden}`}>
                            <span className={styles.caption}>Написать менеджеру</span>
                            <div className={styles.contactIcon}>
                                <svg width="32" height="32" viewBox="0 0 701 698" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M337.99 0.492364C129.39 11.3924 -8.31024 174.992 0.38976 381.292C4.18976 471.592 40.4898 549.292 49.0898 634.992C51.2898 657.192 44.8898 684.592 70.4898 694.292C101.99 706.192 150.29 686.192 176.69 667.892C185.69 661.792 194.29 654.692 200.89 645.892C228.19 663.992 254.09 681.492 286.59 689.292C429.69 723.592 586.49 645.092 656.19 518.992C787.19 282.092 610.09 -13.7076 337.99 0.492364ZM256.99 494.892C245.69 503.692 234.79 515.692 222.29 522.592C204.19 532.292 198.59 522.192 191.79 506.192C170.39 455.292 167.79 368.592 180.29 315.292C197.09 242.792 253.19 178.992 330.29 172.192C408.29 165.292 480.69 204.892 513.39 276.392C585.79 435.492 400.49 592.592 256.99 494.992V494.892Z"
                                        fill="#EFEFEF"/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
