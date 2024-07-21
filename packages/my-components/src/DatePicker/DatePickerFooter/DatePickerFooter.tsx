import React, { ComponentProps } from 'react';

import styles from './DatePickerFooter.module.scss';
import { clsx } from 'clsx';

const DatePickerFooter = ({ className, ...props }: ComponentProps<'div'>) => {
    return <div className={clsx(styles.footer, className)} {...props} />;
};

export default DatePickerFooter;
