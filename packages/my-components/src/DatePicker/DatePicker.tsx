import React from 'react';

import NoBody from '../NoBody';
import DatePickerProvider from './DatePicker.context';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerFooter from './DatePickerFooter';
import DatePickerHeader from './DatePickerHeader';
import DatePickerReset from './DatePickerReset';
import DatePickerTrigger from './DatePickerTrigger';
import DatePickerInput from './DatePickerInput';
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
DatePicker.Header = DatePickerHeader;
DatePicker.Content = DatePickerContent;
DatePicker.Footer = DatePickerFooter;
DatePicker.Reset = DatePickerReset;
DatePicker.Input = DatePickerInput;

export default DatePicker;
