import { ComponentProps } from 'react';
import { DateType, DateValue, InitializeRangeProps } from '../DatePicker.types';

export type InputState = 'default' | 'invalid' | 'valid';
export type InputType = 'from' | 'to' | 'single';

export type SingleProps = ComponentProps<'input'> & { target: never };
export type RangeProps = ComponentProps<'input'> & {
    target: InputType;
};

export type DatePickerInputProps = SingleProps | RangeProps;

export type DateInput = {
    value: string;
    state: InputState;
};

export type ConstrainDateToRangeProps = {
    value: string;
} & InitializeRangeProps;

export type IsDateFormatProps = { y: string; m: string; d: string };

export type UpdateInputDate = {
    date: DateType;
    nextDate: DateValue;
    target: InputType;
};
