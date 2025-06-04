import React from 'react';
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
    return (
        <label htmlFor="" className={styles.inputLabel}>
            {label}
            <input
                type={type}
                placeholder={placeholder}
                className={`${classNames ? styles.textInput + ' ' + classNames : styles.textInput}`}
                id={id}
                name={name}
            />
        </label>
    );
};

export default TextInput;