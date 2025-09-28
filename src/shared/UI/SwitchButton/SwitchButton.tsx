import React, {JSX} from 'react';
import styles from './SwitchButton.module.scss';
import Image from "next/image";
import {TImage} from "@/types/IImage";

export enum SwitchButtonColors {
    GRAY, GREEN,
}

interface ButtonProps {
    color: SwitchButtonColors;
    image?: TImage;
    icon?: JSX.Element;
    isSwitch: boolean;
    previewText?: string;
    postViewText?: string;
    isOnlyMobileImage?: boolean;
}

const SwitchButton = (
    {
        color = SwitchButtonColors.GRAY,
        image,
        icon,
        isSwitch,
        previewText,
        postViewText,
        isOnlyMobileImage
    }: ButtonProps) => {

    const getStyle = (color: SwitchButtonColors) => {
        if (isSwitch) {
            switch (color) {
                case SwitchButtonColors.GRAY:
                    return styles.switchContact_gray;
                case SwitchButtonColors.GREEN:
                    return styles.switchContact_green;
                default:
                    return styles.contact;
            }
        } else {
            switch (color) {
                case SwitchButtonColors.GRAY:
                    return styles.notSwitchContact_gray;
                case SwitchButtonColors.GREEN:
                    return styles.notSwitchContact_green;
                default:
                    return styles.contact;
            }
        }
    }

    return (
        <div className={`${styles.contact} ${getStyle(color)}`}>
            <div className={styles.contactPreview}>
                <div className={styles.previewImage}>
                    {image
                        ?
                        <Image
                            className={`${styles.contactImage} ${isOnlyMobileImage && styles.contactImage_onlyMobile}`}
                            src={image.src}
                            alt={''}
                            width={44}
                            height={44}
                        />
                        :
                        ''
                    }
                    <span className={styles.caption} style={{fontSize: image ? '19px' : '22px'}}>{previewText}</span>
                </div>
                <div className={styles.contactIcon}>
                    {icon ?? ''}
                </div>
            </div>
            {isSwitch
                &&
		        <div className={`${styles.contactPostview} ${styles.hidden}`}>
			        <span className={styles.caption}>{postViewText}</span>
		        </div>
            }
        </div>
    );
};

export default SwitchButton;