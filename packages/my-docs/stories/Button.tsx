import React, { ComponentProps, CSSProperties } from 'react';
import './button.css';

type ButtonProps = {
    primary?: boolean;
    backgroundColor: CSSProperties['backgroundColor'];
    size: 'small' | 'medium' | 'large';
    label: string;
} & ComponentProps<'button'>;

export const Button = ({
    primary,
    backgroundColor,
    size,
    label,
    ...props
}: ButtonProps) => {
    const mode = primary
        ? 'storybook-button--primary'
        : 'storybook-button--secondary';
    return (
        <button
            type="button"
            className={[
                'storybook-button',
                `storybook-button--${size}`,
                mode,
            ].join(' ')}
            style={backgroundColor && { backgroundColor }}
            {...props}
        >
            {label}
        </button>
    );
};
