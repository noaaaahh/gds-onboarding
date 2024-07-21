import { ComponentProps, ReactNode } from 'react';
import NoBody from '../NoBody';

export type Locale = 'ko' | 'ja' | 'en';
export type Mode = 'single' | 'range';

export type DatePickerDate = Date | [Date, Date] | null;

export type InitializeRangeProps = {
    minDate: Date | undefined;
    maxDate: Date | undefined;
};

export type DatePickerContextType = {
    date: DatePickerDate;
    defaultDate: DatePickerDate;
    handleChange: (date: DatePickerDate) => void;
    initializeRange: (range: InitializeRangeProps) => void;
    mode?: Mode;
    locale: Locale;
} & InitializeRangeProps;

export type DatePickerProviderProps = {
    mode?: Mode;
    locale?: Locale;
    date: DatePickerDate;
    onChangeDate: (date: DatePickerDate) => void;
    children: ReactNode;
};

export type DatePickerProps = DatePickerProviderProps &
    ComponentProps<typeof NoBody>;
