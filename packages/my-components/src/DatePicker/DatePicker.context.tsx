import React, { useContext, useState, createContext, useEffect } from 'react';

import {
    DatePickerContextType,
    DatePickerProviderProps,
    DateValue,
    InitializeRangeProps,
    RangeDateValue,
} from './DatePicker.types';
import once from 'lodash.once';

const createDatePickerContext = once(<T extends DateValue | RangeDateValue>() =>
    createContext<DatePickerContextType<T>>({} as DatePickerContextType<T>),
);
const DatePickerProvider = <T extends DateValue | RangeDateValue>({
    date,
    onChangeDate,
    mode,
    locale = 'ko',
    children,
}: DatePickerProviderProps<T>) => {
    const DatePickerContext = createDatePickerContext<T>();
    const [defaultDate, setDefaultDate] = useState<T>(date);
    const [range, setRange] = useState<InitializeRangeProps>({
        minDate: new Date('1970.01.01'),
        maxDate: new Date('2999.12.31'),
    });

    const handleChange = (nextDate: T) => {
        onChangeDate?.(nextDate);
    };

    const initializeRange = ({ minDate, maxDate }: InitializeRangeProps) => {
        if (minDate) setRange((p) => ({ ...p, minDate }));
        if (maxDate) setRange((p) => ({ ...p, maxDate }));
    };

    useEffect(() => {
        setDefaultDate(date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DatePickerContext.Provider
            value={{
                ...range,
                date,
                defaultDate,
                initializeRange,
                handleChange,
                mode,
                locale,
            }}
        >
            {children}
        </DatePickerContext.Provider>
    );
};

export default DatePickerProvider;

export const useDatePicker = () => {
    const context = useContext(createDatePickerContext());

    if (!context) throw new Error('can not find DatePickerContext');

    return context;
};
