import React from 'react';
import styles from './MiniMenuPanel.module.scss';
import GreenButton from "@/shared/UI/GreenButton/GreenButton";

export interface MiniManuPanelProps {
    isPopup?: boolean;
    setIsOpenPopup: (val: boolean) => void;
}

const MiniMenuPanel = (
    {
        setIsOpenPopup
    }: MiniManuPanelProps) => {
    return (
        <div className={styles.panelBlock}>
            <div className={styles.panelWrapper}>
                <div className={styles.navBlock}>
                    <div className={styles.navItem}>
                        <span className={styles.navItemSpan}>Каталог</span>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.29927" cy="2.29927" r="2.29927" fill="#58595B"/>
                            <circle cx="8.99995" cy="2.29927" r="2.29927" fill="#58595B"/>
                            <circle cx="15.7006" cy="2.29927" r="2.29927" fill="#58595B"/>
                            <circle cx="2.29927" cy="9.00008" r="2.29927" fill="#58595B"/>
                            <circle cx="8.99995" cy="9.00008" r="2.29927" fill="#58595B"/>
                            <circle cx="15.7006" cy="9.00008" r="2.29927" fill="#58595B"/>
                            <circle cx="2.29927" cy="15.7008" r="2.29927" fill="#58595B"/>
                            <circle cx="8.99995" cy="15.7008" r="2.29927" fill="#58595B"/>
                            <circle cx="15.7006" cy="15.7008" r="2.29927" fill="#58595B"/>
                        </svg>
                    </div>
                    <div className={styles.navItem}>
                        <span className={styles.navItemSpan}>Портфолио</span>
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.9615 5.53845H4.03846C3.18846 5.53845 2.5 6.22691 2.5 7.07691V14C2.5 14.85 3.18846 15.5385 4.03846 15.5385H20.9615C21.8115 15.5385 22.5 14.85 22.5 14V7.07691C22.5 6.22691 21.8115 5.53845 20.9615 5.53845ZM12.5 14C12.0754 14 11.7308 13.6554 11.7308 13.2308C11.7308 12.8061 12.0754 12.4615 12.5 12.4615C12.9246 12.4615 13.2692 12.8061 13.2692 13.2308C13.2692 13.6554 12.9246 14 12.5 14Z"
                                fill="#58595B"/>
                            <path
                                d="M20.9615 17.0769H4.03846C3.47538 17.0769 2.95462 16.9138 2.5 16.6492V19.3846C2.5 20.2346 3.18846 20.923 4.03846 20.923H20.9615C21.8115 20.923 22.5 20.2346 22.5 19.3846V16.6492C22.0454 16.9138 21.5246 17.0769 20.9615 17.0769Z"
                                fill="#58595B"/>
                            <path
                                d="M14.8078 6.30769H10.1924V5.53846C10.1924 4.68846 10.8808 4 11.7308 4H13.2693C14.1193 4 14.8078 4.68846 14.8078 5.53846V6.30769Z"
                                fill="#58595B"/>
                        </svg>
                    </div>
                    <div className={styles.navItem}>
                        <span className={styles.navItemSpan}>Контакты</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.1 3H6.6C6.12261 3 5.66477 3.18964 5.32721 3.52721C4.98964 3.86477 4.8 4.32261 4.8 4.8V7.5H3V9.3H4.8V11.1H3V12.9H4.8V14.7H3V16.5H4.8V19.2C4.8 19.6774 4.98964 20.1352 5.32721 20.4728C5.66477 20.8104 6.12261 21 6.6 21H20.1C20.3387 21 20.5676 20.9052 20.7364 20.7364C20.9052 20.5676 21 20.3387 21 20.1V3.9C21 3.66131 20.9052 3.43239 20.7364 3.2636C20.5676 3.09482 20.3387 3 20.1 3ZM12.9 5.6991C14.3832 5.6991 15.6 6.915 15.6 8.3991C15.5974 9.11447 15.3121 9.7998 14.8064 10.3057C14.3006 10.8117 13.6154 11.0972 12.9 11.1C11.4177 11.1 10.2 9.8823 10.2 8.3991C10.2 6.915 11.4177 5.6991 12.9 5.6991ZM18.3 17.4H7.5V16.725C7.5 14.7279 9.9345 12.675 12.9 12.675C15.8655 12.675 18.3 14.7279 18.3 16.725V17.4Z"
                                fill="#58595B"/>
                        </svg>
                    </div>
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