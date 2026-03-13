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
                            <span className={styles.caption}>+7 (495) 988-55-28</span>
                        </div>
                    </div>
                    <Link href={'https://max.ru/u/f9LHodD0cOIRh5Lz_sziSBOk_tZHto4PxQIapM0Nl6NTm0Bs1Zd69OQCE7Q'} className={styles.contact}>
                        <Image
                            className={styles.contactImage}
                            src={ContactWomanImage}
                            alt={''}
                        />
                        <div className={styles.contactPreview}>
                            <span className={styles.caption}>Написать менеджеру</span>
                            <div className={styles.contactIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
                                    <path fill="#0a0b0b"
                                          d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/>
                                </svg>
                            </div>
                        </div>
                        <div className={`${styles.contactPostview} ${styles.hidden}`}>
                            <span className={styles.caption}>Написать менеджеру</span>
                            <div className={styles.contactIcon}>
                                <Image src="https://maxicons.ru/icons/Max_logo.svg" alt="MAX" width={32} height={32} />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contacts;