'use client'
import React, {RefObject} from 'react';
import styles  from './ClaimForm.module.scss';
import TextInput from "@/shared/UI/TextInput/TextInput";
import {SubmitHandler, useForm} from "react-hook-form";
import {TFormInputs} from "@/types/TFormInputs";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import TextArea from "@/shared/UI/TextArea/TextArea";
import Link from "next/link";
import {pagesLinks} from "@/shared/constants";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";
import {ClaimDto} from "@/types/dtos/Claim.dto";
import ClaimService from "@/services/ClaimService";

interface FormProps {
    formRef?: RefObject<HTMLFormElement>
    isReset: boolean;
}

const ClaimForm = (
    {
        formRef,
        isReset
    }: FormProps) => {
    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<TFormInputs>();

    const formSubmit: SubmitHandler<TFormInputs> = async (data: ClaimDto) => {
        const timeout = setTimeout(async () => {
            const claimDto: ClaimDto = new ClaimDto({
                ...data,
                date: new Date()
            });

            if (isReset) {
                resetField('firstName');
                resetField('mobilePhone');
                resetField('note');
            }

            await ClaimService.addClaim(claimDto);
        }, 2000);

        return () => clearTimeout(timeout);
    }

    return (
        <form className={styles.form} ref={formRef ?? null}>
            <div className={styles.inputsBlock}>
                <TextInput
                    label='Имя'
                    placeholder='Иван Петров'
                    {...register('firstName', {
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
                    {...register('mobilePhone', {
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
                    })}
                    error={errors.note}
                ></TextArea>
            </div>
            <div className={styles.submitBlock}>
                <span className={styles.personalText}>Я согласен(на) на <Link href={pagesLinks.privacyPolicy} className='underline'>обработку персональных данных</Link></span>
                <DragAndDropButton
                    isResetButton={true}
                    formSubmit={handleSubmit(formSubmit)}
                    resetTimeout={2000}
                    buttonStyle={'FORM'}
                />
            </div>
        </form>
    );
};

export default ClaimForm;