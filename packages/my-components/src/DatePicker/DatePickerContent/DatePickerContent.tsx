import React, { ComponentProps } from 'react';
import NoBody from '../../NoBody';

import styles from './DatePicker.module.scss';
import { clsx } from 'clsx';

const DatePickerContent = ({
    children,
    side = 'bottom',
    sideOffset = 5,
    align = 'start',
    className,
    ...props
}: ComponentProps<typeof NoBody.Content>) => {
    return (
        <NoBody.Content
            side={side}
            sideOffset={sideOffset}
            align={align}
            className={clsx(styles.content, className)}
            {...props}
        >
            {children}
        </NoBody.Content>
    );
};

export default DatePickerContent;
