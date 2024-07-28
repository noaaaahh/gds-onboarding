import { useCss } from 'react-use';
import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Stack.module.scss';
import { StackProps } from './Stack.types';

const Stack = forwardRef<HTMLDivElement, StackProps>(
    (
        {
            align = 'start',
            spacing = 'md',
            justify = 'start',
            className,
            ...props
        },
        ref,
    ) => {
        const gap =
            typeof spacing === 'number' ? `${spacing}px` : `var(--${spacing})`;

        const css = useCss({
            justifyContent: justify,
            alignItems: align,
            gap,
        });

        return (
            <div
                ref={ref}
                className={clsx(styles.stack, css, className)}
                {...props}
            />
        );
    },
);
Stack.displayName = 'Stack';

export default Stack;
