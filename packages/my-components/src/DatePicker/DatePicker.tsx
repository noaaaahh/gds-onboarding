import React from 'react';

import NoBody from '../NoBody';
import DatePickerProvider from './DatePicker.context';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerFooter from './DatePickerFooter';
import DatePickerHeader from './DatePickerHeader';
import DatePickerReset from './DatePickerReset/DatePickerReset';
import DatePickerTrigger from './DatePickerTrigger';
import DatePickerInput from './DatePickerInput';

import { DatePickerProps } from './DatePicker.types';
import DatePickerContent from './DatePickerContent';

const DatePicker = ({
    // NoBody props
    open,
    onOpenChange,
    defaultOpen,
    modal,

    // DatePickerProvider Props
    children,
    ...props
}: DatePickerProps) => {
    return (
        <NoBody
            open={open}
            onOpenChange={onOpenChange}
            defaultOpen={defaultOpen}
            modal={modal}
        >
            <DatePickerProvider {...props}>{children}</DatePickerProvider>
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
