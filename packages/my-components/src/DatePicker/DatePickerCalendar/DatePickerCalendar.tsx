import React, { ComponentProps, useEffect } from 'react';
import { LooseValue } from 'react-calendar/dist/cjs/shared/types';

import Calendar from '../../Calendar';
import { useDatePicker } from '../DatePicker.context';
import styles from './DatePickerCalendar.module.scss';
import { ModeDate } from './DatePickerCalendar.types';

const DatePickerCalendar = ({
    maxDate,
    minDate,
    ...props
}: ComponentProps<typeof Calendar>) => {
    const { date, handleChange, mode, locale, initializeRange } =
        useDatePicker();

    useEffect(() => {
        initializeRange({ maxDate, minDate });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Calendar
            value={date as LooseValue} // 라이브러리 타입을 변형해서 쓰는 게 위험할 수 있다.
            allowPartialRange
            onChange={(date) => handleChange(date as ModeDate<typeof mode>)}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            selectRange={mode === 'range'}
            className={styles.calendar}
            {...props}
        />
    );
};

export default DatePickerCalendar;
