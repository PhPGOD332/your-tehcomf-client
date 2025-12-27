'use client'
import React, {useEffect, useState} from 'react';
import styles from './MiniMenuPanel.module.scss';
import GreenButton from "@/shared/UI/GreenButton/GreenButton";
import { usePathname } from "next/navigation";
import { pagesLinks } from "@/shared/constants";
import Link from "next/link";

export interface MiniMenuPanelProps {
    isPopup?: boolean;
    setIsOpenPopup: (val: boolean) => void;
}

const MiniMenuPanel = (
    {
        setIsOpenPopup
    }: MiniMenuPanelProps) => {
    const pathname = usePathname();

    console.log(pathname.startsWith(pagesLinks.portfolio))

    const [currentPathname, setCurrentPathname] = useState(pathname);

    useEffect(() => {
        if (pathname.startsWith(pagesLinks.portfolio)) {
            setCurrentPathname(pagesLinks.portfolio);
        } else {
            setCurrentPathname(pathname);
        }
    }, [pathname]);

    return (
        <div className={styles.panelBlock}>
            <div className={styles.panelWrapper}>
                <div className={styles.navBlock}>
                    <Link
                        href={'#'}
                        className={styles.navItem}
                    >
                        <span className={styles.navItemSpan}>Каталог</span>
                        <div className={styles.navItemIconBlock}>
                            <svg className={styles.navItemIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5.29927" cy="5.29927" r="2.29927" fill="#29292B"/>
                                <circle cx="12.0001" cy="5.29927" r="2.29927" fill="#29292B"/>
                                <circle cx="18.7008" cy="5.29927" r="2.29927" fill="#29292B"/>
                                <circle cx="5.29927" cy="12" r="2.29927" fill="#29292B"/>
                                <circle cx="12.0001" cy="12" r="2.29927" fill="#29292B"/>
                                <circle cx="18.7008" cy="12" r="2.29927" fill="#29292B"/>
                                <circle cx="5.29927" cy="18.7006" r="2.29927" fill="#29292B"/>
                                <circle cx="12.0001" cy="18.7006" r="2.29927" fill="#29292B"/>
                                <circle cx="18.7008" cy="18.7006" r="2.29927" fill="#29292B"/>
                            </svg>
                        </div>
                    </Link>
                    <Link
                        href={pagesLinks.portfolio}
                        className={`${styles.navItem} ${currentPathname === pagesLinks.portfolio ? styles.navItem_active : ''}`}
                    >
                        <span className={styles.navItemSpan}>Портфолио</span>
                        <div className={styles.navItemIconBlock}>
                            <svg className={styles.navItemIcon} width="25" height="24" viewBox="0 0 25 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.9615 5.53809H4.03846C3.18846 5.53809 2.5 6.22655 2.5 7.07655V13.9996C2.5 14.8496 3.18846 15.5381 4.03846 15.5381H20.9615C21.8115 15.5381 22.5 14.8496 22.5 13.9996V7.07655C22.5 6.22655 21.8115 5.53809 20.9615 5.53809ZM12.5 13.9996C12.0754 13.9996 11.7308 13.655 11.7308 13.2304C11.7308 12.8058 12.0754 12.4612 12.5 12.4612C12.9246 12.4612 13.2692 12.8058 13.2692 13.2304C13.2692 13.655 12.9246 13.9996 12.5 13.9996Z"
                                    fill="#58595B"/>
                                <path
                                    d="M20.9615 17.0771H4.03846C3.47538 17.0771 2.95462 16.914 2.5 16.6494V19.3848C2.5 20.2348 3.18846 20.9233 4.03846 20.9233H20.9615C21.8115 20.9233 22.5 20.2348 22.5 19.3848V16.6494C22.0454 16.914 21.5246 17.0771 20.9615 17.0771Z"
                                    fill="#58595B"/>
                                <path
                                    d="M14.8078 6.30769H10.1924V5.53846C10.1924 4.68846 10.8808 4 11.7308 4H13.2693C14.1193 4 14.8078 4.68846 14.8078 5.53846V6.30769Z"
                                    fill="#58595B"/>
                            </svg>
                        </div>
                    </Link>
                    <Link
                        href={pagesLinks.contacts}
                        className={`${styles.navItem} ${currentPathname === pagesLinks.contacts ? styles.navItem_active : ''}`}
                    >
                        <span className={styles.navItemSpan}>Контакты</span>
                        <div className={styles.navItemIconBlock}>
                            <svg className={styles.navItemIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.1 3H6.6C6.12261 3 5.66477 3.18964 5.32721 3.52721C4.98964 3.86477 4.8 4.32261 4.8 4.8V7.5H3V9.3H4.8V11.1H3V12.9H4.8V14.7H3V16.5H4.8V19.2C4.8 19.6774 4.98964 20.1352 5.32721 20.4728C5.66477 20.8104 6.12261 21 6.6 21H20.1C20.3387 21 20.5676 20.9052 20.7364 20.7364C20.9052 20.5676 21 20.3387 21 20.1V3.9C21 3.66131 20.9052 3.43239 20.7364 3.2636C20.5676 3.09482 20.3387 3 20.1 3ZM12.9 5.6991C14.3832 5.6991 15.6 6.915 15.6 8.3991C15.5974 9.11447 15.3121 9.7998 14.8064 10.3057C14.3006 10.8117 13.6154 11.0972 12.9 11.1C11.4177 11.1 10.2 9.8823 10.2 8.3991C10.2 6.915 11.4177 5.6991 12.9 5.6991ZM18.3 17.4H7.5V16.725C7.5 14.7279 9.9345 12.675 12.9 12.675C15.8655 12.675 18.3 14.7279 18.3 16.725V17.4Z"
                                    fill="#58595B"/>
                            </svg>
                        </div>
                    </Link>
                </div>
                <GreenButton
                    isMobileSmall={true}
                    classNames={styles.orderButton}
                    onClick={() => setIsOpenPopup(true)}
                >Заказать</GreenButton>
            </div>
        </div>
    );
};

export default MiniMenuPanel;