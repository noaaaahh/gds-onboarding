import { ComponentProps } from 'react';

export type InputState = 'default' | 'invalid' | 'valid';
export type InputType = 'start' | 'end';

export type SingleProps = ComponentProps<'input'> & { target?: never };
export type RangeProps = ComponentProps<'input'> & {
    target: InputType;
};

export type DatePickerInputProps = SingleProps | RangeProps;

export type DateInput = {
    value: string;
    state: InputState;
};

type SingleInputsProps = {
    type: 'single';
    placeholder: string;
};
type RangeInputsProps = {
    type: 'range';
    startPlaceholder: string;
    endPlaceholder: string;
};

export type DatePickerInputsProps = SingleInputsProps | RangeInputsProps;
