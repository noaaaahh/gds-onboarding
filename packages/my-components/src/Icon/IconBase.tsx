import React from 'react';
import type { IconBaseProps } from './IconBase.types';

function IconBase({
    children,
    width,
    height,
    size,
    className,
    color = 'currentColor',
    ...props
}: IconBaseProps) {
    return (
        <svg
            fill={color}
            width={size || width}
            height={size || height}
            className={className}
            {...props}
        >
            {children}
        </svg>
    );
}

export default IconBase;
