import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import styles from './DatePickerTrigger.module.scss';
import NoBody from '../../NoBody';
import { clsx } from 'clsx';

const DatePickerTrigger = forwardRef<
    ElementRef<typeof NoBody.Trigger>,
    ComponentPropsWithoutRef<typeof NoBody.Trigger>
>(({ className, children, ...props }, ref) => {
    return (
        <NoBody.Trigger
            ref={ref}
            className={clsx(styles.trigger, className)}
            {...props}
        >
            {children}
        </NoBody.Trigger>
    );
});
DatePickerTrigger.displayName = 'DatePickerTrigger';

export default DatePickerTrigger;
