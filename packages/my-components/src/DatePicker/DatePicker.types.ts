import { ComponentProps, ReactNode } from 'react';
import NoBody from '../NoBody';

export type Locale = 'ko' | 'ja' | 'en';
export type Mode = 'single' | 'range';

export type DateValue = Date | [Date, Date] | null;

export type InitializeRangeProps = {
    minDate: Date | undefined;
    maxDate: Date | undefined;
};

export type DatePickerContextType = {
    date: DateValue;
    defaultDate: DateValue;
    handleChange: (date: DateValue) => void;
    initializeRange: (range: InitializeRangeProps) => void;
    mode?: Mode;
    locale: Locale;
} & InitializeRangeProps;

export type DatePickerProviderProps = {
    mode?: Mode;
    locale?: Locale;
    date: DateValue;
    onChangeDate: (date: DateValue) => void;
    children: ReactNode;
};

export type DatePickerProps = DatePickerProviderProps &
    ComponentProps<typeof NoBody>;
