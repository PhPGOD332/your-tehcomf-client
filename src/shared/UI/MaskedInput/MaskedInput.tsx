import React, {FormEvent, forwardRef} from 'react';
import styles from './MaskedInput.module.scss';
import {InputMask} from "@react-input/mask";

interface MaskedInputProps {
    label?: string;
    value?: string;
    placeholder?: string;
    classNames?: string;
    mask: string;
    replacement: IReplacement;
    onChange?: (e: React.ChangeEvent) => void;
    showMask?: boolean;
    id?: string;
    name?: string;
    error?: string;
}

interface IReplacement {
    [item: string]: RegExp;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>((
    {
        mask,
        replacement,
        label,
        value,
        placeholder,
        classNames,
        showMask = false,
        id,
        name,
        onChange,
        ...props
    }: MaskedInputProps, ref) => {

    const inputHandler = (e: FormEvent<HTMLInputElement>) => {
        const label = e.currentTarget?.parentElement;

        if (!label) return;

        if (e.currentTarget.value.length > 0)
            label.classList.add(styles.maskedLabel_active);
        else
            label.classList.remove(styles.maskedLabel_active);
    }

    return (
        <label className={styles.maskedLabel}>
            {label}
            <InputMask
                mask={mask}
                replacement={replacement}
                showMask={showMask}
                onChange={(e) => onChange ? onChange(e) : null}
                onInput={(e) => inputHandler(e)}
                placeholder={placeholder || ''}
                className={`${classNames ? styles.maskedInput + ' ' + classNames : styles.maskedInput}`}
                id={id || ''}
                name={name || ''}
                value={value || undefined}
                ref={ref}
                {...props}
            />
        </label>
    );
});

MaskedInput.displayName = 'MaskedInput';

export default MaskedInput;