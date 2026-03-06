'use client'
import React from 'react';
import styles from './ContactsForm.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import WomanImage from "@/data/images/contacts/woman.png";
import TeamImage from "@/data/images/contacts/team.png";
import ClaimForm from "@/widgets/ClaimForm/ClaimForm";
import {TImage} from "@/types/IImage";
import SwitchButton, {SwitchButtonColors} from "@/shared/UI/SwitchButton/SwitchButton";
import {IBooleanOptions} from "@/widgets/Footer/Footer";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import Image from "next/image";

const ContactWomanImage: TImage = WomanImage;
const ContactTeamImage: TImage = TeamImage;

interface FormProps {
    isOnlyContacts?: IBooleanOptions;
    isOnlyForm?: IBooleanOptions;
    classNames?: string;
}

const ContactsForm = (
    {
        isOnlyContacts,
        isOnlyForm,
        classNames
    }: FormProps
) => {
    const isMobile = useMediaQuery('(max-width: 1000px)');

    return (
        <div className={`${styles.wrapper} ${classNames}`}>
            <div className={styles.innerWrapper}>
                {(!isOnlyContacts?.desktop && !isMobile)
                    || (!isOnlyContacts?.mobile && isMobile) ?
	                <SubTitle classNames={styles.title} color={TitleColors.WHITE}>Мебель мечты – <br className={styles.transfer}/> на расстоянии
		                клика!</SubTitle>
                    :
                    ''
                }
                <div className={`${styles.contactsBlock} ${isOnlyContacts?.desktop && !isMobile && styles.contactsBlock_only_desktop} ${isOnlyContacts?.mobile && isMobile && styles.contactsBlock_only_mobile}`}>
                    {(!isOnlyForm?.desktop && !isMobile)
                    || (!isOnlyForm?.mobile && isMobile) ?
                        <div className={styles.contacts}>
                            <SwitchButton
                                color={SwitchButtonColors.GRAY}
                                isSwitch={false}
                                previewText={'+7 (495) 988-55-28'}
                                image={ContactTeamImage}
                                isOnlyMobileImage={true}
                                icon={
                                    <svg width="27" height="28" viewBox="0 0 28 28" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M19.8101 16.6964C19.4311 16.4743 18.9654 16.479 18.5883 16.703L16.6787 17.8407C16.2513 18.0955 15.7174 18.0656 15.3254 17.7595C14.6478 17.2303 13.5567 16.3399 12.6075 15.3907C11.6583 14.4415 10.7679 13.3504 10.2387 12.6728C9.93261 12.2808 9.90274 11.747 10.1575 11.3195L11.2953 9.40991C11.5202 9.03284 11.5221 8.56338 11.2999 8.18444L8.49807 3.39831C8.22647 2.93538 7.68701 2.70764 7.16527 2.83551C6.65847 2.95871 6.00047 3.25924 5.31074 3.94991C3.15101 6.10964 2.00394 9.75244 10.1258 17.8743C18.2477 25.9962 21.8895 24.85 24.0502 22.6894C24.7418 21.9978 25.0414 21.3388 25.1655 20.8311C25.2915 20.3103 25.0675 19.7746 24.6055 19.5039C23.4519 18.8291 20.9637 17.3722 19.8101 16.6964Z"
                                            fill="#58595B"/>
                                    </svg>
                                }
                            />
                            <SwitchButton
                                color={SwitchButtonColors.GREEN}
                                image={ContactWomanImage}
                                icon={
                                    <Image src="https://maxicons.ru/icons/Max_logo.svg" alt="MAX" width={32} height={32} />
                                }
                                isSwitch={false}
                                previewText={'Написать менеджеру'}
                                href={'https://max.ru/u/f9LHodD0cOIRh5Lz_sziSBOk_tZHto4PxQIapM0Nl6NTm0Bs1Zd69OQCE7Q'}
                            />
                        </div>
                        :
                        ''
                    }
                    {(!isOnlyContacts?.desktop && !isMobile)
                    || (!isOnlyContacts?.mobile && isMobile) ?
                        <div className={styles.formBlock}>
                            <ClaimForm isReset={true}/>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    );
};

export default ContactsForm;