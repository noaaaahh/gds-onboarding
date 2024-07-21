import React, { useContext, useState, createContext, useEffect } from 'react';

import {
    DatePickerContextType,
    DatePickerDate,
    DatePickerProviderProps,
    InitializeRangeProps,
} from './DatePicker.types';

// Context
const DatePickerContext = createContext<DatePickerContextType>({
    date: null,
    defaultDate: null,
    handleChange: () => {},
    mode: 'single',
    locale: 'ko',
    initializeRange: () => {},
    minDate: undefined,
    maxDate: undefined,
});

const DatePickerProvider = ({
    date,
    onChangeDate,
    mode = 'single',
    locale = 'ko',
    children,
}: DatePickerProviderProps) => {
    const [defaultDate, setDefaultDate] = useState<DatePickerDate | null>(null);
    const [range, setRange] = useState<InitializeRangeProps>({
        minDate: new Date('1970.01.01'),
        maxDate: new Date('2999.12.31'),
    });

    const handleChange = (date: DatePickerDate) => {
        //! mode range는 일단 무시
        onChangeDate?.(date);
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
    const context = useContext(DatePickerContext);

    if (!context) throw new Error('can not find DatePickerContext');

    return context;
};
