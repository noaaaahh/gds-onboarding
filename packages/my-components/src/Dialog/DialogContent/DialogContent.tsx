import React, { Children, forwardRef, isValidElement, ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './DialogContent.module.scss';
import { DialogContentProps } from './DialogContent.types';

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    ({ className, children, ...props }, ref) => {
        const slotCount = Children.count(children);
        let elements: ReactNode | null = children;

        if (slotCount > 5) {
            console.warn('Dialog can have 5 slots');

            elements = Children.toArray(children)
                .filter((child) => isValidElement(child))
                .slice(0, 5);
        }

        return (
            <div
                ref={ref}
                className={clsx(styles.content, className)}
                {...props}
            >
                {elements}
            </div>
        );
    },
);
DialogContent.displayName = 'DialogContent';

export default DialogContent;
