import { ComponentProps } from 'react';
import { DateValue, Optional } from '../DatePicker.types';

export type InputState = 'default' | 'invalid' | 'valid';
export type DatePickerInputProps = ComponentProps<'input'> & {
    target?: 'start' | 'end';
};

type DefaultInputsProps = {
    placeholder: string;
    startPlaceholder: string;
    endPlaceholder: string;
};
type SingleInputsProps = Optional<
    DefaultInputsProps,
    'endPlaceholder' | 'startPlaceholder'
>;
type RangeInputsProps = Optional<DefaultInputsProps, 'placeholder'>;

export type DatePickerInputsProps<T> = T extends DateValue
    ? SingleInputsProps
    : RangeInputsProps;
