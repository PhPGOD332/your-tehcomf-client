'use client'
import React, {FormEvent} from 'react';
import styles from './TextArea.module.scss';

interface textareaProps {
    label?: string;
    children?: React.ReactNode;
    placeholder?: string;
    classNames?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    cols?: number;
    id?: string;
    name?: string;
    isResizable?: boolean;
}

const TextArea = (
    {
        label,
        children,
        placeholder,
        classNames,
        onChange,
        rows = 30,
        cols = 10,
        id,
        name,
        isResizable = false
    }:textareaProps) => {

    const inputHandler = (e: FormEvent<HTMLTextAreaElement>) => {
        const label = e.currentTarget?.parentElement;

        if (!label) return;

        if (e.currentTarget.value.length > 0)
            label.classList.add(styles.textareaLabel_active);
        else
            label.classList.remove(styles.textareaLabel_active);
    }

    return (
        <label className={styles.textareaLabel}>
            {label}
            <textarea
                name={name || ''}
                id={id || ''}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                className={`${classNames ? styles.textarea + ' ' + classNames : styles.textarea}`}
                onChange={(e) => onChange ? onChange(e) : null}
                onInput={(e) => inputHandler(e)}
                style={{resize: isResizable ? "both" : "none"}}
            >{children || undefined}</textarea>
        </label>
    );
};

export default TextArea;