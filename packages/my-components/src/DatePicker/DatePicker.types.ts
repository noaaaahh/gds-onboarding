import { ComponentProps, ReactNode } from 'react';
import NoBody from '../NoBody';

export type Locale = 'ko' | 'ja' | 'en';
export type Mode = 'single' | 'range';

export type DateValue = Date | null;
export type RangeDateValue = {
    from: DateValue;
    to: DateValue;
};
export type DateType = DateValue | RangeDateValue;

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type InitializeRangeProps = {
    minDate: DateValue;
    maxDate: DateValue;
};

export type DatePickerContextType<T extends DateType> = {
    date: T;
    defaultDate: T;
    handleChange: (date: T) => void;
    initializeRange: (range: InitializeRangeProps) => void;
    mode?: Mode;
    locale: Locale;
} & InitializeRangeProps;

export type DatePickerProviderProps<T> = {
    mode?: Mode;
    locale?: Locale;
    date?: T;
    onChangeDate?: (date: T) => void;
    children: ReactNode;
};

export type DatePickerProps<T> = DatePickerProviderProps<T> &
    ComponentProps<typeof NoBody>;
