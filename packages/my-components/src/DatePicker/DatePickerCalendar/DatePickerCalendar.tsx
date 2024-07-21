import React, { ComponentProps, useEffect } from 'react';

import Calendar from '../../Calendar';
import { useDatePicker } from '../DatePicker.context';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';

const DatePickerCalendar = ({
    maxDate,
    minDate,
    ...props
}: ComponentProps<typeof Calendar>) => {
    const { date, handleChange, locale, initializeRange } = useDatePicker();

    useEffect(() => {
        initializeRange({ maxDate, minDate });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Calendar
            value={date as LooseValue}
            onChange={(date) => handleChange(date as Date)}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            {...props}
        />
    );
};

export default DatePickerCalendar;
