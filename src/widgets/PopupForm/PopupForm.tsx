import React, {useEffect, useRef} from 'react';
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

export interface PopupProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isPopup?: boolean;
}

const PopupForm = (
    {
        isOpen,
        setIsOpen,
        // isPopup = false
    }: PopupProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        // resetField,
        // setValue
    } = useForm<TFormInputs>()

    const popupBgRef = useRef<HTMLDivElement | null>(null);
    const popupFormRef = useRef<HTMLFormElement | null>(null);

    const submitHandler = async (data: ClaimDto) => {
        const timeout = setTimeout(async () => {
            const claimDto: ClaimDto = new ClaimDto({
                ...data,
                date: new Date().toISOString()
            });

            await ClaimService.addClaim(claimDto);
            setIsOpen(false);

        }, 2000);

        return () => clearTimeout(timeout);
    }

    const bgPopupHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        // e.stopPropagation();
        if (e.target === popupBgRef.current)
            setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflowYHidden');
        } else if (!isOpen) {
            document.body.classList.remove('overflowYHidden');
        }
    }, [isOpen]);

    return (
        <div
            className={`${styles.popupWrapper} ${!isOpen ? styles.popupWrapper_hidden : ''}`}
            ref={popupBgRef}
            onClick={(e) => bgPopupHandler(e)}
        >
            <form
                className={styles.popupContent}
                ref={popupFormRef}
            >
                <div className={styles.chooseBlock}>
                    <CheckInput
                        firstIsChecked={false}
                        caption='Вызвать дизайнера'
                        {...register("callDesign")}
                    />
                    <CheckInput
                        firstIsChecked={false}
                        caption='Обсудить проект'
                        {...register("discussProject")}
                    />
                </div>
                <div className={styles.inputsBlock}>
                    <TextInput
                        label={'Имя'}
                        placeholder={'Иван'}
                        {...register("firstName", {
                            required: "Введите ваше имя",
                            minLength: 2,
                        })}
                        error={errors.firstName?.message}
                    />
                    <MaskedInput
                        label='Телефон'
                        mask='+7 (___) ___-__-__'
                        replacement={{_: /[1-9]/}}
                        placeholder='+7 (000) 000-00-00'
                        {...register("mobilePhone", {
                            required: "Введите ваш телефон",
                            minLength: 15,
                        })}
                    />
                    <TextArea
                        placeholder='Ваши пожелания или любая информация, которой хотите поделиться'
                        label='Примечание'
                        rows={3}
                        {...register("note", {
                            required: "Введите пожелания",
                            minLength: 5,

                        })}
                    ></TextArea>
                </div>
                <div className={styles.submitBlock}>
                    <span className={styles.politicsSpan}>Я согласен(на) на <Link className={`${styles.link}`} href={'#'} >обработку персональных данных</Link></span>
                    <DragAndDropButton
                        formSubmit={handleSubmit(submitHandler)}
                        isResetButton={true}
                        resetTimeout={2000}
                    />
                </div>
            </form>
        </div>
    );
};

export default PopupForm;