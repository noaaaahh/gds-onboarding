import React, {
    ChangeEvent,
    ComponentProps,
    FocusEvent,
    KeyboardEvent,
    useEffect,
    useState,
} from 'react';
import { clsx } from 'clsx';

import { useDatePicker } from '../DatePicker.context';
import {
    constrainDateToRange,
    dateFormat,
    getSortedDates,
    isDateValue,
    isValidDate,
} from '../DatePicker.utils';

import styles from './DatePickerInputs.module.scss';
import IconBase from '../../Icon/IconBase';
import { DateValue, Optional, RangeDateValue } from '../DatePicker.types';

type InputState = 'default' | 'invalid' | 'valid';
type DatePickerInputProps = ComponentProps<'input'> & {
    target?: 'start' | 'end';
};

const DATE_REGEX = new RegExp(/^[0-9./]*$/);

const DatePickerInput = ({
    target,
    className,
    ...props
}: DatePickerInputProps) => {
    const CURRENT_INPUT_INDEX = target === 'start' ? 0 : 1;
    const { date, locale, minDate, maxDate, handleChange } = useDatePicker();
    const [inputState, setInputState] = useState<InputState>('default');
    const [inputValue, setInputValue] = useState(() => {
        const targetDate = isDateValue(date) ? date : date[CURRENT_INPUT_INDEX];
        return dateFormat(targetDate, locale);
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        if (!DATE_REGEX.test(currentValue)) return;

        setInputValue(currentValue);
    };

    const handleClose = () => {
        if (isDateValue(date)) return handleChange(undefined);

        const nextDate = [...date] satisfies RangeDateValue;
        nextDate[CURRENT_INPUT_INDEX] = undefined;
        handleChange(nextDate);
    };

    const parseTextToDate = (value: string) => {
        if (value === '') return handleClose();

        const isValid = isValidDate(value, locale);
        if (!isValid) return setInputState('invalid');

        const nextDate = constrainDateToRange({ value, minDate, maxDate });
        const targetDate = isDateValue(date) ? date : date[CURRENT_INPUT_INDEX];

        if (targetDate === nextDate) {
            const nextInputValue = dateFormat(nextDate, locale);
            setInputValue(nextInputValue);
        }

        if (isDateValue(date)) {
            handleChange(nextDate);
        } else {
            const copiedDate = [...date] satisfies RangeDateValue;
            copiedDate[CURRENT_INPUT_INDEX] = nextDate;

            const sortedNextDate = getSortedDates(copiedDate);
            handleChange(sortedNextDate);
        }

        setInputState('valid');
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        parseTextToDate(value);
    };

    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        const value = e.currentTarget.value;
        parseTextToDate(value);
    };

    useEffect(() => {
        const targetDate = isDateValue(date) ? date : date[CURRENT_INPUT_INDEX];
        const nextValue = dateFormat(targetDate, locale);

        setInputValue(nextValue);
        setInputState(nextValue ? 'valid' : 'default');
    }, [CURRENT_INPUT_INDEX, date, locale]);

    return (
        <div
            className={clsx(
                styles.DatePickerField,
                styles[`DatePickerField--${inputState}`],
            )}
        >
            {inputState === 'valid' ? (
                <ErrorCircleIcon handleClose={handleClose} />
            ) : (
                <CalendarIcon />
            )}
            <input
                className={clsx(
                    styles.DatePickerField__input,
                    styles[`DatePickerField__input--${inputState}`],
                    className,
                )}
                value={inputValue || ''}
                onChange={onChange}
                onKeyDown={onPressEnter}
                onBlur={onBlur}
                type="text"
                {...props}
            />
        </div>
    );
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
type InputsProps<T> = T extends DateValue
    ? SingleInputsProps
    : RangeInputsProps;

const DatePickerInputs = (props: InputsProps<typeof date>) => {
    const { date } = useDatePicker();

    if (isDateValue(date) && (props.startPlaceholder || props.endPlaceholder)) {
        console.warn(
            'single 모드일 때는 startPlaceholder 혹은 endPlaceholder를 이용할 수 없습니다.',
        );
    }

    if (!isDateValue(date) && props.placeholder) {
        console.warn('range 모드일 때는 placeholder를 이용할 수 없습니다.');
    }

    return (
        <div className={styles.inputs}>
            {isDateValue(date) ? (
                <DatePickerInput placeholder={props.placeholder} />
            ) : (
                <>
                    <DatePickerInput
                        target="start"
                        placeholder={props.startPlaceholder}
                    />
                    <DatePickerInput
                        target="end"
                        placeholder={props.endPlaceholder}
                    />
                </>
            )}
        </div>
    );
};

export default DatePickerInputs;

const ErrorCircleIcon = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <IconBase
            width="16"
            height="16"
            viewBox="0 0 16 16"
            color="#858899"
            className={styles.DatePickerField__cancelIcon}
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClose}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.46 10.54L10.54 11.46L8 8.92L5.46 11.46L4.54 10.54L7.08 8L4.54 5.46L5.46 4.54L8 7.08L10.54 4.54L11.46 5.46L8.92 8L11.46 10.54ZM8 1.5C4.412 1.5 1.5 4.412 1.5 8C1.5 11.588 4.412 14.5 8 14.5C11.588 14.5 14.5 11.588 14.5 8C14.5 4.412 11.588 1.5 8 1.5Z"
            />
        </IconBase>
    );
};

const CalendarIcon = () => {
    return (
        <IconBase
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={styles.DatePickerField__calendarIcon}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2 9.25001H11.5V7.95001H10.2V9.25001ZM4.5 9.25001H5.8V7.95001H4.5V9.25001ZM7.35 9.25001H8.65V7.95001H7.35V9.25001ZM3.3 13.2H12.7V6.50001H3.3V13.2ZM12.15 2.50001V1.20001H10.85V2.50001H5.15V1.20001H3.85V2.50001H2V3.50001V6.50001V14.5H14V6.50001V3.50001V2.50001H12.15Z"
            />
        </IconBase>
    );
};
