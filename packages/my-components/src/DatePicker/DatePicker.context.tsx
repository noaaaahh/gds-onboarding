import React, { useContext, useState, createContext, useEffect } from 'react';

import {
    DatePickerContextType,
    DatePickerProviderProps,
    DateType,
    InitializeRangeProps,
} from './DatePicker.types';
import once from 'lodash.once';

const createDatePickerContext = once(<T extends DateType>() =>
    createContext<DatePickerContextType<T>>({} as DatePickerContextType<T>),
);

const DatePickerProvider = <T extends DateType>({
    date,
    onChangeDate,
    mode,
    locale = 'ko',
    children,
}: DatePickerProviderProps<T>) => {
    const DatePickerContext = createDatePickerContext<T>();
    const [innerDate, setInnerDate] = useState<T>(date as T);
    const [defaultDate, setDefaultDate] = useState<T>(date as T);
    const [range, setRange] = useState<InitializeRangeProps>({
        minDate: new Date('1970.01.01'),
        maxDate: new Date('2999.12.31'),
    });

    const handleChange = (nextDate: T) => {
        setInnerDate(nextDate);
        onChangeDate?.(nextDate);
    };

    const initializeRange = ({ minDate, maxDate }: InitializeRangeProps) => {
        if (minDate) setRange((p) => ({ ...p, minDate }));
        if (maxDate) setRange((p) => ({ ...p, maxDate }));
    };

    useEffect(() => {
        if (mode === 'range' && date === undefined) {
            const initialDate = { from: null, to: null };
            handleChange(initialDate as T);
            setDefaultDate(initialDate as T);

            return;
        }

        setInnerDate(date as T);
        setDefaultDate(date as T);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DatePickerContext.Provider
            value={{
                ...range,
                date: innerDate,
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
