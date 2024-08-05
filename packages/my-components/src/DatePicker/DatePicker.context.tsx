import React, { useContext, useState, createContext, useEffect } from 'react';

import {
    DatePickerContextType,
    DatePickerProviderProps,
    DateType,
    InitializeRangeProps,
} from './DatePicker.types';
import once from 'lodash.once';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { isDateValue } from './DatePicker.utils';

const createDatePickerContext = once(<T extends DateType>() =>
    createContext<DatePickerContextType<T>>({} as DatePickerContextType<T>),
);

const DatePickerProvider = <T extends DateType>({
    date: propDate,
    defaultDate,
    onChangeDate,
    mode = 'single',
    locale = 'ko',
    children,
}: DatePickerProviderProps<T>) => {
    const DatePickerContext = createDatePickerContext<T>();
    const [date = null as T, setDate] = useControllableState<T>({
        prop: propDate,
        defaultProp: defaultDate,
        onChange: onChangeDate,
    });
    const [range, setRange] = useState<InitializeRangeProps>({
        minDate: new Date('1970.01.01'),
        maxDate: new Date('2999.12.31'),
    });

    const handleChange = (nextDate: T) => {
        setDate(nextDate);
    };

    const initializeRange = ({ minDate, maxDate }: InitializeRangeProps) => {
        if (minDate) setRange((p) => ({ ...p, minDate }));
        if (maxDate) setRange((p) => ({ ...p, maxDate }));
    };

    useEffect(() => {
        if (mode === 'single') return;

        const initDate = date || defaultDate || null;

        if (isDateValue(initDate)) {
            const initialRangeDate = {
                from: initDate,
                to: initDate,
            } as T;

            handleChange(initialRangeDate);
        }
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
