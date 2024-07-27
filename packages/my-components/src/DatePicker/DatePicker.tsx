import React from 'react';

import NoBody from '../NoBody';
import DatePickerProvider from './DatePicker.context';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerReset from './DatePickerReset';
import DatePickerTrigger from './DatePickerTrigger';
import DatePickerInputs from './DatePickerInputs';
import DatePickerContent from './DatePickerContent';

import { DatePickerProps, DateValue, RangeDateValue } from './DatePicker.types';

const DatePicker = <T extends DateValue | RangeDateValue>({
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
            <DatePickerProvider<typeof date> date={date} {...props}>
                {children}
            </DatePickerProvider>
        </NoBody>
    );
};

DatePicker.Trigger = DatePickerTrigger;
DatePicker.Calendar = DatePickerCalendar;
DatePicker.Content = DatePickerContent;
DatePicker.Reset = DatePickerReset;
DatePicker.Inputs = DatePickerInputs;

export default DatePicker;
