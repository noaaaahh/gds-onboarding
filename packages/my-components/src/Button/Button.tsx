import React, { ComponentProps } from 'react';

import styles from './Button.module.scss';
import { clsx } from 'clsx';

type ButtonProps = {
    variant?: 'primary' | 'link';
} & ComponentProps<'button'>;

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
    const buttonVariantStyle = styles[`button_${variant}`];
    return (
        <button
            className={clsx(styles.button, buttonVariantStyle)}
            {...props}
        />
    );
};

export default Button;
