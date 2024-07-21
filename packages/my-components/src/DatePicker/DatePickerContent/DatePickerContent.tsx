import React, { ComponentProps } from 'react';
import NoBody from '../../NoBody';

import styles from './DatePicker.module.scss';

const DatePickerContent = ({
    children,
    ...props
}: ComponentProps<typeof NoBody.Content>) => {
    return (
        <NoBody.Content {...props} className={styles.content}>
            {children}
        </NoBody.Content>
    );
};

export default DatePickerContent;
