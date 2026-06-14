import React, {useEffect, useRef, useState} from 'react';
import styles from './PopupForm.module.scss';
import TextInput from "@/shared/UI/TextInput/TextInput";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import TextArea from "@/shared/UI/TextArea/TextArea";
import Link from "next/link";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";
import {ClaimDto} from "@/types/dtos/Claim.dto";
import {useForm} from "react-hook-form";
import {TFormInputs} from "@/types/TFormInputs";
import ClaimService from "@/services/ClaimService";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import {pagesLinks} from "@/shared/constants";

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    noteText?: string;
    isPopup?: boolean;
    claimTypeOptions?: readonly [string, string];
}

const defaultClaimTypeOptions = ['Вызвать дизайнера', 'Обсудить проект'] as const;
const repairBureauClaimType = 'Ремонтное бюро';

const PopupForm = (
    {
        isOpen,
        setIsOpen,
        noteText,
        claimTypeOptions = defaultClaimTypeOptions
    }: PopupProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField,
        watch
    } = useForm<TFormInputs>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            claimType: ''
        }
    });
    const selectedClaimType = watch('claimType');
    const isRepairBureau = selectedClaimType === repairBureauClaimType;

    const popupBgRef = useRef<HTMLDivElement | null>(null);
    const popupFormRef = useRef<HTMLFormElement | null>(null);

    const isMobile = useMediaQuery('(max-width: 1000px)');
    const [popupPosition, setPopupPosition] = useState(0);
    const [popupStartPos, setPopupStartPos] = useState(0);

    const submitHandler = async (data: ClaimDto) => {
        const timeout = setTimeout(async () => {
            const claimDto: ClaimDto = new ClaimDto({
                ...data,
                date: new Date()
            });

            console.log(data);

            await ClaimService.addClaim(claimDto);

            // console.log(newClaim);

            resetField('firstName');
            resetField('mobilePhone');
            resetField('note');
            resetField('claimType');
            resetField('company');

            setIsOpen(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }

    const bgPopupHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === popupBgRef.current)
            setIsOpen(false);
    }

    const touchPopupStartDragHandler = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!popupFormRef.current) return;

        const touch = e.touches[0];
        setPopupStartPos(touch.clientY);
    }

    const touchMoveHandle = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!popupFormRef.current) return;

        const touch = e.touches[0];
        const currY = touch.clientY - popupStartPos;

        if (currY > 0) {
            setPopupPosition(-popupFormRef.current?.offsetHeight + currY);
        }
    }

    const touchEndHandle = () => {
        if (!popupFormRef.current) return;

        if (popupPosition > -(popupFormRef.current?.offsetHeight / 2)) {
            setIsOpen(false);
        } else {
            setPopupPosition(-popupFormRef.current?.offsetHeight || 0);
        }
    }

    useEffect(() => {
        if (!popupFormRef.current) return;

        if (isOpen) {
            document.body.classList.add('overflowYHidden');
            setPopupPosition(-popupFormRef.current?.offsetHeight || 0);
        } else {
            document.body.classList.remove('overflowYHidden');
            setPopupPosition(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isRepairBureau) {
            resetField('company');
        }

        if (!isMobile || !isOpen) return;

        const animationFrame = requestAnimationFrame(() => {
            if (popupFormRef.current) {
                setPopupPosition(-popupFormRef.current.offsetHeight);
            }
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [isMobile, isOpen, isRepairBureau, resetField]);

    const claimTypeChooseBlock = (
        <div className={styles.chooseWrapper}>
            <div className={styles.chooseBlock}>
                {claimTypeOptions.map((option) => (
                    <label
                        className={`${styles.claimTypeOption} ${selectedClaimType === option ? styles.claimTypeOption_checked : ''}`}
                        key={option}
                    >
                        <span className={styles.claimTypeCaption}>{option}</span>
                        <input
                            type='radio'
                            value={option}
                            className={styles.claimTypeInput}
                            {...register('claimType', {
                                required: 'Выберите тип заявки'
                            })}
                        />
                        <span className={styles.claimTypeIcon}>
                            {selectedClaimType === option && (
                                <svg width='12.5' height='7' viewBox='0 0 12 9' fill='none'>
                                    <path
                                        d='M1 4.5L3.2706 7.14903C3.65929 7.60251 4.35624 7.61636 4.76265 7.17869L10.5 1'
                                        stroke='#FAFAFA'
                                        strokeWidth='3'
                                        strokeLinecap='round'
                                    />
                                </svg>
                            )}
                        </span>
                    </label>
                ))}
            </div>
            {errors.claimType && (
                <span className={styles.claimTypeError}>{errors.claimType.message}</span>
            )}
        </div>
    );

    const companyInput = isRepairBureau ? (
        <div className={styles.companyInput}>
            <TextInput
                label='Компания'
                placeholder='Название'
                {...register('company', {
                    required: 'Введите название компании'
                })}
                error={errors.company}
            />
        </div>
    ) : null;

    return (
        <>
            {!isMobile ?
                <div
                    className={`${styles.popupWrapper} ${!isOpen ? styles.popupWrapper_hidden : ''}`}
                    ref={popupBgRef}
                    onClick={(e) => bgPopupHandler(e)}
                >
                    <form
                        className={isOpen ? styles.popupContent : styles.popupWrapper_hidden}
                        ref={popupFormRef}
                    >
                        <div className={styles.mobileDragBlock}></div>
                        {claimTypeChooseBlock}
                        <div className={styles.inputsBlock}>
                            {companyInput}
                            <TextInput
                                label={'Имя'}
                                placeholder={'Иван'}
                                {...register("firstName", {
                                    required: {
                                        value: true,
                                        message: "Введите ваше имя"
                                    },
                                })}
                                error={errors.firstName}
                            />
                            <MaskedInput
                                label='Телефон'
                                mask='+7 (___) ___-__-__'
                                replacement={{_: /[0-9]/}}
                                placeholder='+7 (000) 000-00-00'
                                {...register("mobilePhone", {
                                    required: "Введите ваш телефон",
                                    minLength: {
                                        value: 18,
                                        message: "Введите телефон полностью"
                                    }
                                })}
                                error={errors.mobilePhone}
                            />
                            <TextArea
                                placeholder='Ваши пожелания или любая информация, которой хотите поделиться'
                                label='Примечание'
                                rows={3}
                                {...register("note", {
                                    required: {
                                        value: true,
                                        message: "Введите пожелания"
                                    },
                                    value: noteText ?? ''
                                })}
                                error={errors.note}
                            ></TextArea>
                        </div>
                        <div className={styles.submitBlock}>
                    <span className={styles.politicsSpan}>Я согласен(на) на <Link className={`${styles.link}`} href={pagesLinks.privacyPolicy}>обработку персональных данных</Link></span>
                            <DragAndDropButton
                                formSubmit={handleSubmit(submitHandler)}
                                isResetButton={true}
                                resetTimeout={2000}
                                buttonStyle={'FORM'}
                            />
                        </div>
                    </form>
                </div>
                :
                <form
                    className={`${styles.popupContent} ${!isOpen ? styles.popupContent_hidden : ''}`}
                    ref={popupFormRef}
                    style={{
                        transform: `translateY(${popupPosition}px)`,
                        transition: '0.1s',
                        bottom: `${errors.firstName || errors.mobilePhone || errors.note || errors.claimType || errors.company ? '-665px' : '-630px'}`
                    }}
                >
                    <div
                        className={styles.mobileDragBlock}
                        onTouchStart={touchPopupStartDragHandler}
                        onTouchMove={touchMoveHandle}
                        onTouchEnd={touchEndHandle}
                    ></div>
                    {claimTypeChooseBlock}
                    <div className={styles.inputsBlock}>
                        {companyInput}
                        <TextInput
                            label={'Имя'}
                            placeholder={'Иван'}
                            {...register("firstName", {
                                required: {
                                    value: true,
                                    message: "Введите ваше имя"
                                },
                            })}
                            error={errors.firstName}
                        />
                        <MaskedInput
                            label='Телефон'
                            mask='+7 (___) ___-__-__'
                            replacement={{_: /[0-9]/}}
                            placeholder='+7 (000) 000-00-00'
                            {...register("mobilePhone", {
                                required: "Введите ваш телефон",
                                minLength: {
                                    value: 18,
                                    message: "Введите телефон полностью"
                                }
                            })}
                            error={errors.mobilePhone}
                        />
                        <TextArea
                            placeholder='Ваши пожелания или любая информация, которой хотите поделиться'
                            label='Примечание'
                            rows={3}
                            {...register("note", {
                                required: {
                                    value: true,
                                    message: "Введите пожелания"
                                },
                                value: noteText ?? ''
                            })}
                            error={errors.note}
                        ></TextArea>
                    </div>
                    <div className={styles.submitBlock}>
                    <span className={styles.politicsSpan}>Я согласен(на) на <Link className={`${styles.link}`} href={pagesLinks.privacyPolicy}>обработку персональных данных</Link></span>
                        <DragAndDropButton
                            formSubmit={handleSubmit(submitHandler)}
                            isResetButton={true}
                            resetTimeout={2000}
                            buttonStyle={'FORM'}
                        />
                    </div>
                </form>
            }
        </>
    );
};

export default PopupForm;
