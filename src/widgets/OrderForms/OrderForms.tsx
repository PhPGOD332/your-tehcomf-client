'use client'
import React from 'react';
import styles from './OrderForms.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import OrderSwapForm from "@/widgets/OrderSwapForm/OrderSwapForm";

const OrderForms = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.formsWrapper}>
                <SubTitle color={TitleColors.WHITE}>От слов — к делу</SubTitle>
                <div className={styles.formsBlock}>
                    <OrderSwapForm
                        isReset={true}
                    />
                    <OrderSwapForm
                        isReset={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderForms;