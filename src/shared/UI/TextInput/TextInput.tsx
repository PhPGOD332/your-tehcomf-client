import React, {FormEvent} from 'react';
import styles from './TextInput.module.scss';

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
}

const TextInput = (
    {
        type = InputType.TEXT,
        classNames,
        label,
        placeholder,
        id,
        name,
    }: TextInputProps) => {

    const inputHandler = (e: FormEvent<HTMLInputElement>) => {
        const label = e.currentTarget?.parentElement;

        if (!label) return;

        if (e.currentTarget.value.length > 0)
            label.classList.add(styles.inputLabel_active);
        else
            label.classList.remove(styles.inputLabel_active);
    }

    return (
        <label htmlFor="" className={styles.inputLabel}>
            {label}
            <input
                type={type}
                placeholder={placeholder}
                className={`${classNames ? styles.textInput + ' ' + classNames : styles.textInput}`}
                id={id}
                name={name}
                onInput={(e) => inputHandler(e)}
            />
        </label>
    );
};

export default TextInput;