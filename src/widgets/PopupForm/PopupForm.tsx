import React, {RefObject, useEffect, useRef, useState} from 'react';
import styles from './PopupForm.module.scss';
import TextInput from "@/shared/UI/TextInput/TextInput";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import TextArea from "@/shared/UI/TextArea/TextArea";
import Link from "next/link";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";
import CheckInput from "@/shared/UI/CheckInput/CheckInput";
import {ClaimDto} from "@/types/dtos/Claim.dto";
import {useForm} from "react-hook-form";
import {TFormInputs} from "@/types/TFormInputs";
import ClaimService from "@/services/ClaimService";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isPopup?: boolean;
}

const PopupForm = (
    {
        isOpen,
        setIsOpen,
    }: PopupProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField
    } = useForm<TFormInputs>({mode: "onChange", reValidateMode: "onChange"});
    const [customDesignCheck, setCustomDesignCheck] = useState(false);
    const [customProjectCheck, setCustomProjectCheck] = useState(false);
    const checkDesignerRef = useRef<HTMLLabelElement | null>(null);
    const checkProjectRef = useRef<HTMLLabelElement | null>(null);

    const popupBgRef = useRef<HTMLDivElement | null>(null);
    const popupFormRef = useRef<HTMLFormElement | null>(null);

    const isMobile = useMediaQuery('(max-width: 1000px)');
    const [popupPosition, setPopupPosition] = useState(0);
    const [popupStartPos, setPopupStartPos] = useState(0);

    const submitHandler = async (data: ClaimDto) => {
        const timeout = setTimeout(async () => {
            const claimDto: ClaimDto = new ClaimDto({
                ...data,
                date: new Date().toISOString()
            });

            const newClaim = await ClaimService.addClaim(claimDto);

            console.log(newClaim);

            resetField('firstName');
            resetField('mobilePhone');
            resetField('note');

            setIsOpen(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }

    const checkChangeHandle = (labelRef: RefObject<HTMLLabelElement | null> | null) => {
        if (!labelRef)
            return;

        if (labelRef === checkProjectRef) {
            if (customDesignCheck && !customProjectCheck) {
                setCustomProjectCheck(true);
                setCustomDesignCheck(false);
            } else if (!customDesignCheck && !customProjectCheck) {
                setCustomProjectCheck(true);
            } else {
                setCustomProjectCheck(false);
            }
        }

        if (labelRef === checkDesignerRef) {
            if (customProjectCheck && !customDesignCheck) {
                setCustomProjectCheck(false);
                setCustomDesignCheck(true);
            } else if (!customDesignCheck && !customProjectCheck) {
                setCustomDesignCheck(true);
            } else {
                setCustomDesignCheck(false);
            }
        }
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
                        <div className={styles.chooseBlock}>
                            <CheckInput
                                firstIsChecked={false}
                                caption='Вызвать дизайнера'
                                {...register("callDesign")}
                                labelRef={checkDesignerRef}
                                changeHandle={checkChangeHandle}
                                customIsChecked={customDesignCheck}
                                setCustomIsChecked={setCustomDesignCheck}
                                classNames={styles.checkInputLabel}
                            />
                            <CheckInput
                                firstIsChecked={false}
                                caption='Обсудить проект'
                                {...register("discussProject")}
                                labelRef={checkProjectRef}
                                changeHandle={checkChangeHandle}
                                customIsChecked={customProjectCheck}
                                setCustomIsChecked={setCustomProjectCheck}
                                classNames={styles.checkInputLabel}
                            />
                        </div>
                        <div className={styles.inputsBlock}>
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
                                replacement={{_: /[1-9]/}}
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
                                    // minLength: {
                                    //     value: 5,
                                    //     message: "Введите пожелания"
                                    // },
                                    // onChange: () =>
                                })}
                                error={errors.note}
                            ></TextArea>
                        </div>
                        <div className={styles.submitBlock}>
                    <span className={styles.politicsSpan}>Я согласен(на) на <Link className={`${styles.link}`} href={'#'}>обработку персональных данных</Link></span>
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
                        bottom: `${errors.firstName || errors.mobilePhone || errors.note ? '-665px' : '-630px'}`
                    }}
                >
                    <div
                        className={styles.mobileDragBlock}
                        onTouchStart={touchPopupStartDragHandler}
                        onTouchMove={touchMoveHandle}
                        onTouchEnd={touchEndHandle}
                    ></div>
                    <div className={styles.chooseBlock}>
                        <CheckInput
                            firstIsChecked={false}
                            caption='Вызвать дизайнера'
                            {...register("callDesign")}
                            labelRef={checkDesignerRef}
                            changeHandle={checkChangeHandle}
                            customIsChecked={customDesignCheck}
                            setCustomIsChecked={setCustomDesignCheck}
                            classNames={styles.checkInputLabel}
                        />
                        <CheckInput
                            firstIsChecked={false}
                            caption='Обсудить проект'
                            {...register("discussProject")}
                            labelRef={checkProjectRef}
                            changeHandle={checkChangeHandle}
                            customIsChecked={customProjectCheck}
                            setCustomIsChecked={setCustomProjectCheck}
                            classNames={styles.checkInputLabel}
                        />
                    </div>
                    <div className={styles.inputsBlock}>
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
                            replacement={{_: /[1-9]/}}
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
                                // minLength: {
                                //     value: 5,
                                //     message: "Введите пожелания"
                                // },
                                // onChange: () =>
                            })}
                            error={errors.note}
                        ></TextArea>
                    </div>
                    <div className={styles.submitBlock}>
                    <span className={styles.politicsSpan}>Я согласен(на) на <Link className={`${styles.link}`} href={'#'}>обработку персональных данных</Link></span>
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