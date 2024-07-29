import React, { forwardRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';

import NoBody from '../../NoBody';
import { Locale, RangeDateValue } from '../DatePicker.types';
import IconBase from '../../Icon/IconBase';

import styles from './DatePickerTrigger.module.scss';
import { useDatePicker } from '../DatePicker.context';
import { dateFormat, isDateValue } from '../DatePicker.utils';
import {
    DatePickerTriggerProps,
    DatePickerTriggerRef,
} from './DatePickerTrigger.types';

const DatePickerTrigger = forwardRef<
    DatePickerTriggerRef,
    DatePickerTriggerProps
>(({ className, children, ...props }, ref) => {
    return (
        <NoBody.Trigger
            ref={ref}
            className={clsx(styles.trigger, className)}
            {...props}
        >
            {children || <TriggerInput />}
        </NoBody.Trigger>
    );
});
DatePickerTrigger.displayName = 'DatePickerTrigger';

export default DatePickerTrigger;

const getInputText = (date: RangeDateValue, locale: Locale) => {
    const [start, end] = date;
    const startValue = dateFormat(start, locale);
    const endValue = dateFormat(end, locale);

    if (startValue && endValue) return `${startValue} - ${endValue}`;
    else return `${startValue || endValue}`;
};

const TriggerInput = () => {
    const { date, locale } = useDatePicker();

    const [inputValue, setInputValue] = useState(() => {
        if (isDateValue(date)) return dateFormat(date, locale);

        return getInputText(date, locale);
    });

    useEffect(() => {
        if (isDateValue(date)) {
            const nextValue = dateFormat(date, locale);
            setInputValue(nextValue);
            return;
        }

        setInputValue(getInputText(date, locale));
    }, [date, locale]);

    return (
        <div className={clsx(styles[`dateField`])}>
            <div
                className={clsx(
                    styles['dateField__input'],
                    styles[`dateField__input--default`],
                )}
            >
                {inputValue}
            </div>
            <CalendarIcon />
        </div>
    );
};

const CalendarIcon = () => {
    return (
        <IconBase
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={styles['dateField__calendarIcon']}
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
