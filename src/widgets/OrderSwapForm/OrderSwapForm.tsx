import React, {useRef} from 'react';
import styles from './OrderSwapForm.module.scss';
import Image from "next/image";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import GreenButton from "@/shared/UI/GreenButton/GreenButton";
import TextInput from "@/shared/UI/TextInput/TextInput";
import MaskedInput from "@/shared/UI/MaskedInput/MaskedInput";
import TextArea from "@/shared/UI/TextArea/TextArea";
import DragAndDropButton from "@/shared/UI/DragAndDropButton/DragAndDropButton";
import {ClaimDto} from "@/types/dtos/Claim.dto";
import ClaimService from "@/services/ClaimService";
import {SubmitHandler, useForm} from "react-hook-form";
import {TFormInputs} from "@/types/TFormInputs";

interface SwapFormProps {
    isReset: boolean;
}

const OrderSwapForm = (
    {
        isReset = false
    }: SwapFormProps) => {
    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors},
    } = useForm<TFormInputs>();

    const formRef = useRef<HTMLFormElement | null>(null);
    const previewRef = useRef<HTMLDivElement | null>(null);

    const showForm = () => {
        previewRef.current?.classList.toggle(styles.visible);
        previewRef.current?.classList.toggle(styles.hidden);

        formRef.current?.classList.toggle(styles.hidden);
        formRef.current?.classList.toggle(styles.visible);
    }

    const hideForm = () => {
        formRef.current?.classList.toggle(styles.visible);
        formRef.current?.classList.toggle(styles.hidden);

        previewRef.current?.classList.toggle(styles.hidden);
        previewRef.current?.classList.toggle(styles.visible);
    }

    const formSubmit: SubmitHandler<TFormInputs> = async (data: ClaimDto) => {
        const timeout = setTimeout(async () => {
            const claimDto: ClaimDto = new ClaimDto({
                ...data,
                date: new Date().toISOString()
            });

            if (isReset) {
                resetField('firstName');
                resetField('mobilePhone');
                resetField('note');

                hideForm();
            }

            await ClaimService.addClaim(claimDto);


        }, 2000);

        return () => clearTimeout(timeout);
    }

    return (
        <div className={styles.formItem}>
            <div className={`${styles.formPreview} ${styles.visible}`} ref={previewRef}>
                <Image
                    src={'/icons/track-icon.svg'}
                    alt={''}
                    className={styles.previewIcon}
                    width={256}
                    height={256}
                />
                {/*<img src="/icons/track-icon.svg" alt="" className={styles.previewIcon}/>*/}
                <MiniTitle classNames={styles.previewTitle}>Я хочу замерить помещение и проконсультироваться с
                    дизайнером</MiniTitle>
                <span className={styles.explanationText}>
                                Наш специалист приедет к вам с рулеткой,
                                блокнотом и кучей идей. Обсудим, что вам нравится, померяем пространство и вместе
                                придумаем, как реализовать вашу мечту
                            </span>
                <ul className={styles.previewList}>
                    <li>
                        <Image
                            src='/icons/check-green.svg'
                            alt={''}
                            className={styles.checkImage}
                            width={24}
                            height={24}
                        />
                        {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                        <span>Бесплатный выезд</span>
                    </li>
                    <li>
                        <Image
                            src='/icons/check-green.svg'
                            alt={''}
                            className={styles.checkImage}
                            width={24}
                            height={24}
                        />
                        {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                        <span>Экспертная консультация</span>
                    </li>
                    <li>
                        <Image
                            src='/icons/check-green.svg'
                            alt={''}
                            className={styles.checkImage}
                            width={24}
                            height={24}
                        />
                        {/*<img src="/icons/check-green.svg" alt="" className={styles.checkImage}/>*/}
                        <span>Образцы материалов и цветов</span>
                    </li>
                </ul>
                <GreenButton
                    classNames={`${styles.orderButton}`}
                    onClick={() => showForm()}
                >
                    Заказать проект
                </GreenButton>
            </div>
            <form
                className={`${styles.formMain} ${styles.hidden}`}
                ref={formRef}
            >
                <div className={styles.inputsBlock}>
                    <TextInput
                        label='Имя'
                        placeholder='Иван Петров'
                        {...register('firstName', {
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
                        {...register('mobilePhone', {
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
                    <span className={styles.personalText}>Я согласен(на) на <a href="#" className='underline'>обработку персональных данных</a></span>
                    <DragAndDropButton
                        isResetButton={true}
                        formSubmit={handleSubmit(formSubmit)}
                        resetTimeout={2000}
                    />
                </div>
            </form>
        </div>
    );
};

export default OrderSwapForm;