'use client'
import React, {useState} from 'react';
import styles from './TwoStepsOrderForm.module.scss';
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import TextInput from "@/shared/UI/TextInput/TextInput";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import {useForm} from "react-hook-form";
import {TLimitedFormInputs} from "@/types/TFormInputs";
import {ClaimDto} from "@/types/dtos/Claim.dto";
import ClaimService from "@/services/ClaimService";
import Link from "next/link";
import {pagesLinks} from "@/shared/constants";
import Image from "next/image";
import {TImage} from "@/types/IImage";
import image from '@/data/images/portfolio/form.png';
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";

const formImage: TImage = image;

type TMobileType = 'green' | 'black-white';

interface FormProps {
    firstStepCaption: string;
    secondStepCaption: string;
    mobileType: TMobileType;
}

const TwoStepsOrderForm = (
    {
        firstStepCaption,
        secondStepCaption,
        mobileType
    }: FormProps
) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm<TLimitedFormInputs>({mode: "onChange", reValidateMode: "onChange"});

    const isMobile = useMediaQuery('(max-width: 800px)');
    const [step, setStep] = useState<'first' | 'second'>('first');

    const submitHandler = async (data: ClaimDto) => {
        if (step === 'second') {
            const timeout = setTimeout(async () => {
                const claimDto: ClaimDto = new ClaimDto({
                    ...data,
                    date: new Date()
                });

                await ClaimService.addClaim(claimDto);

                // console.log(newClaim);

                resetField('mobilePhone');
                resetField('firstName');

                setStep('first');
            }, 2000);

            return () => clearTimeout(timeout);
        } else {
            if (!errors.firstName && !errors.mobilePhone) {
                setStep('second');
            }
        }
    }

    const getMobileStyle = (type: TMobileType): string => {
        let checkType: never;

        switch (type) {
            case 'green':
                return styles.mobileFormWrapper_green;
            case 'black-white':
                return styles.mobileFormWrapper_blackWhite;
            default:
                checkType = type;
                return checkType;
        }
    }

    return (
        isMobile ?
            <div className={`${styles.mobileFormWrapper} ${getMobileStyle(mobileType)}`}>
                <div className={styles.titleBlock}>
                    <SubTitle
                        classNames={styles.title}
                        color={TitleColors.WHITE}
                    >Понравился проект?</SubTitle>
                    <span className={styles.titleCaption}>Рассчитаем такой же по вашим размерам. Бесплатно!</span>
                </div>
                <form className={styles.form}>
                    <div className={styles.inputs}>
                        <TextInput
                            classNames={styles.input}
                            placeholder={'Имя'}
                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "Введите ваше имя"
                                },
                            })}
                            error={errors.firstName}
                            isPlaceholderError={true}
                        />
                        <MaskedInput
                            classNames={styles.input}
                            mask='+7 (___) ___-__-__'
                            replacement={{_: /[0-9]/}}
                            placeholder='Ваш телефон'
                            {...register("mobilePhone", {
                                required: "Введите ваш телефон",
                                minLength: {
                                    value: 18,
                                    message: "Введите телефон полностью"
                                }
                            })}
                            error={errors.mobilePhone}
                            isPlaceholderError={true}
                        />
                    </div>
                    <div className={styles.submitBlock}>
                        <span className={styles.privacyCaption}>Я согласен(на) на <Link href={pagesLinks.privacyPolicy} className={styles.privacyLink}>обработку персональных данных</Link></span>
                        <div className={styles.submitBtn}>
                            <DragAndDropButton
                                isResetButton={true}
                                resetTimeout={2000}
                                buttonStyle={'FORM'}
                                beforeDragCaption={'Потяните для отправки'}
                                afterDropCaption={'Заявка отправлена!'}
                                formSubmit={handleSubmit(submitHandler)}
                            />
                        </div>
                    </div>
                </form>
            </div>
            :
            <div className={styles.formWrapper}>
                <div
                    className={`${styles.firstStepBlock} ${step === 'first' ? styles.firstStepBlock_active : styles.firstStepBlock_inactive}`}>
                    <MiniTitle classNames={styles.caption}>{firstStepCaption}</MiniTitle>
                    <form className={styles.form}>
                        <div className={styles.inputs}>
                        <TextInput
                                classNames={styles.input}
                                placeholder={'Имя'}
                                {...register("firstName", {
                                    required: {
                                        value: true,
                                        message: "Введите ваше имя"
                                    },
                                })}
                                error={errors.firstName}
                                isPlaceholderError={true}
                            />
                            <MaskedInput
                                classNames={styles.input}
                                mask='+7 (___) ___-__-__'
                                replacement={{_: /[0-9]/}}
                                placeholder='Ваш телефон'
                                {...register("mobilePhone", {
                                    required: "Введите ваш телефон",
                                    minLength: {
                                        value: 18,
                                        message: "Введите телефон полностью"
                                    }
                                })}
                                error={errors.mobilePhone}
                                isPlaceholderError={true}
                            />
                        </div>
                        <button type={'button'}
                                className={`${styles.formSwitchBtn} ${!errors.firstName && !errors.mobilePhone ? styles.formSwitchBtn_active : ''}`}
                                onClick={handleSubmit(submitHandler)}>
                            <svg width="27" height="20" viewBox="0 0 27 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.75 9.75H24.75" stroke="#58595B" strokeWidth="3.5"
                                      strokeLinecap="round"/>
                                <path d="M24.75 9.75L16.75 1.75" stroke="#58595B" strokeWidth="3.5"
                                      strokeLinecap="round"/>
                                <path d="M24.75 9.75L16.75 17.75" stroke="#58595B" strokeWidth="3.5"
                                      strokeLinecap="round"/>
                            </svg>
                        </button>
                    </form>
                </div>
                <div
                    className={`${styles.secondStepBlock} ${step === 'second' ? styles.secondStepBlock_active : styles.secondStepBlock_inactive}`}>
                    <div className={styles.captionBlock}>
                        <MiniTitle classNames={styles.caption}>{secondStepCaption}</MiniTitle>
                        <span className={styles.privacyCaption}>Я согласен(на) на <Link href={pagesLinks.privacyPolicy} className={styles.privacyLink}>обработку персональных данных</Link></span>
                    </div>
                    <div className={styles.submitBtn}>
                        <DragAndDropButton
                            isResetButton={true}
                            resetTimeout={2000}
                            buttonStyle={'FORM'}
                            beforeDragCaption={'Потяните для отправки'}
                            afterDropCaption={'Заявка отправлена!'}
                            formSubmit={handleSubmit(submitHandler)}
                        />
                    </div>
                    <Image
                        className={styles.secondStepImage}
                        src={formImage.src}
                        alt={'Бизнесмен'}
                        width={269}
                        height={269}
                    />
                </div>
            </div>
    );
};

export default TwoStepsOrderForm;