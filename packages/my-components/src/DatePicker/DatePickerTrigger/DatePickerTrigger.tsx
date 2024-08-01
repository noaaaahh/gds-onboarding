import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

import NoBody from '../../NoBody';
import IconBase from '../../Icon/IconBase';

import { useDatePicker } from '../DatePicker.context';
import styles from './DatePickerTrigger.module.scss';
import { useTriggerInput } from './DatePickerTrigger.hooks';
import {
    DatePickerTriggerProps,
    DatePickerTriggerRef,
} from './DatePickerTrigger.types';

const DatePickerTrigger = forwardRef<
    DatePickerTriggerRef,
    DatePickerTriggerProps
>(({ className, children, ...props }, ref) => {
    const { date, locale } = useDatePicker();
    const inputValue = useTriggerInput(date, locale);

    const customTrigger = (
        <div className={clsx(styles.dateField)}>
            {inputValue || (
                <span className={styles['dateField_placeholder']}>
                    {/* NOTE: customTrigger는 asChild가 false일 때만 화면에 나타나므로 children은 항상 placeholder로 사용한다. */}
                    {children}
                </span>
            )}
            <CalendarIcon />
        </div>
    );

    return (
        <NoBody.Trigger
            ref={ref}
            className={clsx(
                styles.trigger,
                !props.asChild && styles['trigger_default'],
                className,
            )}
            {...props}
        >
            {props.asChild ? children : customTrigger}
        </NoBody.Trigger>
    );
});
DatePickerTrigger.displayName = 'DatePickerTrigger';

export default DatePickerTrigger;

const CalendarIcon = () => {
    return (
        <IconBase
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={styles.calendarIcon}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2 9.25001H11.5V7.95001H10.2V9.25001ZM4.5 9.25001H5.8V7.95001H4.5V9.25001ZM7.35 9.25001H8.65V7.95001H7.35V9.25001ZM3.3 13.2H12.7V6.50001H3.3V13.2ZM12.15 2.50001V1.20001H10.85V2.50001H5.15V1.20001H3.85V2.50001H2V3.50001V6.50001V14.5H14V6.50001V3.50001V2.50001H12.15Z"
            />
        </IconBase>
    );
};
