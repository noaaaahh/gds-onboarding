import React, { ComponentProps } from 'react';

import styles from './Button.module.scss';
import cn from 'classnames';

type ButtonProps = {
    variant?: 'primary' | 'link';
} & ComponentProps<'button'>;

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
    const buttonVariantStyle = styles[`button_${variant}`];
    return (
        <button className={cn(styles.button, buttonVariantStyle)} {...props} />
    );
};

export default Button;
