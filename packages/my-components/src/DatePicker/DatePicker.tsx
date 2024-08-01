import React from 'react';

import NoBody from '../NoBody';
import DatePickerProvider from './DatePicker.context';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerReset from './DatePickerReset';
import DatePickerTrigger from './DatePickerTrigger';
import DatePickerContent from './DatePickerContent';
import DatePickerInput from './DatePickerInput';

import { DatePickerProps, DateType } from './DatePicker.types';

const DatePicker = <T extends DateType>({
    // NoBody props
    open,
    onOpenChange,
    defaultOpen,
    modal,

    // DatePickerProvider Props
    children,
    date,
    ...props
}: DatePickerProps<T>) => {
    return (
        <NoBody
            open={open}
            onOpenChange={onOpenChange}
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <DatePickerProvider<T> date={date as T} {...props}>
                {children}
            </DatePickerProvider>
        </NoBody>
    );
};

DatePicker.Trigger = DatePickerTrigger;
DatePicker.Calendar = DatePickerCalendar;
DatePicker.Content = DatePickerContent;
DatePicker.Reset = DatePickerReset;
DatePicker.Input = DatePickerInput;

export default DatePicker;
