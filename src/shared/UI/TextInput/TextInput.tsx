import React, {FormEvent, forwardRef} from 'react';
import styles from './TextInput.module.scss';
import {FieldError} from "react-hook-form";

export enum InputType {
    TEXT = 'text',
    DATE = 'date',
    IMAGE = 'image',
    DATELOCAL = 'datetime-local',
    NUMBER = 'number',
    CHECKBOX = 'checkbox',
    EMAIL = 'email',
    RADIO = 'radio'
}

interface TextInputProps {
    type?: InputType;
    placeholder?: string;
    label?: string;
    classNames?: string;
    id?: string;
    name?: string;
    error?: FieldError;
    isPlaceholderError?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((
    {
        type = InputType.TEXT,
        classNames,
        label,
        placeholder,
        id,
        name,
        error,
        isPlaceholderError,
        ...props
    }: TextInputProps, ref) => {

    const inputHandler = (e: FormEvent<HTMLInputElement>) => {
        const label = e.currentTarget?.parentElement;
        if (!label) return;

        if (e.currentTarget.value.length > 0)
            label.classList.add(styles.inputLabel_active);
        else
            label.classList.remove(styles.inputLabel_active);
    }

    return (
        <label htmlFor="" className={`${styles.inputLabel} ${error && isPlaceholderError ? styles.inputLabel_placeholderError : error ? styles.inputLabel_error : ''}`}>
            {label}
            <input
                type={type}
                placeholder={isPlaceholderError && error ? error.message : placeholder}
                className={`${classNames ? styles.textInput + ' ' + classNames : styles.textInput}`}
                id={id}
                name={name}
                onInput={(e) => inputHandler(e)}
                // onChange={(e) => inputHandler(e)}
                ref={ref}
                {...props}
            />
            {!isPlaceholderError ?
                <span className={styles.errorSpan}>{error ? error.message : ''}</span>
                :
                ''
            }
        </label>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;