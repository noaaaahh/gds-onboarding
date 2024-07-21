import React, { ComponentProps } from 'react';

import styles from './DatePickerHeader.module.scss';
import { clsx } from 'clsx';

const DatePickerHeader = ({ className, ...props }: ComponentProps<'div'>) => {
    return <div className={clsx(styles.header, className)} {...props} />;
};

export default DatePickerHeader;
