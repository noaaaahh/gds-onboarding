import React, { ComponentProps, useEffect } from 'react';

import Calendar from '../../Calendar';
import { useDatePicker } from '../DatePicker.context';
import { getCalendarValue, getNextDate } from './DatePickerCalendar.utils';
import styles from './DatePickerCalendar.module.scss';

const DatePickerCalendar = ({
    maxDate,
    minDate,
    ...props
}: ComponentProps<typeof Calendar>) => {
    const { date, handleChange, locale, initializeRange } = useDatePicker();

    const handleClickDay = (selectedDate: Date) => {
        const nextDate = getNextDate(date, selectedDate);

        handleChange(nextDate);
    };

    useEffect(() => {
        initializeRange({ maxDate: maxDate || null, minDate: minDate || null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Calendar
            value={getCalendarValue(date)}
            allowPartialRange
            onClickDay={handleClickDay}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            className={styles.calendar}
            {...props}
        />
    );
};

export default DatePickerCalendar;
