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
    isValidDate,
} from '../DatePicker.utils';

import styles from './DatePickerInput.module.scss';
import IconBase from '../../Icon/IconBase';

type DatePickerInputProps = ComponentProps<'input'> & {
    asTrigger?: boolean;
};

const DATE_REGEX = new RegExp(/^[0-9./]*$/);

const DatePickerInput = ({
    asTrigger,
    className,
    ...props
}: DatePickerInputProps) => {
    const { date, locale, minDate, maxDate, handleChange } = useDatePicker();
    const [inputState, setInputState] = useState<
        'default' | 'invalid' | 'valid'
    >('default');
    const [inputValue, setInputValue] = useState(
        dateFormat(date as Date, locale) || '',
    );

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        if (!DATE_REGEX.test(currentValue)) return;

        setInputValue(currentValue);
    };

    const handleClose = () => {
        handleChange(null);
    };

    const validate = (value: string) => {
        if (value === '') {
            handleChange(null);
            setInputState('default');
            return;
        }

        const isValid = isValidDate(value, locale);
        if (!isValid) {
            return setInputState('invalid');
        }

        const nextDate = constrainDateToRange({ value, minDate, maxDate });

        if (nextDate === date) {
            const nextInputValue = dateFormat(nextDate, locale);
            setInputValue(nextInputValue || '');
        }

        handleChange(nextDate);
        setInputState('valid');
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        validate(value);
    };

    const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        const value = e.currentTarget.value;
        validate(value);
    };

    useEffect(() => {
        const nextValue = dateFormat(date as Date, locale) || '';

        setInputValue(nextValue);
        setInputState(nextValue ? 'valid' : 'default');
    }, [date, locale]);

    if (asTrigger) {
        return (
            <DatePickerField
                value={inputValue || ''}
                inputState="default"
                className={clsx(styles.input_trigger, className)}
                icon={<CalendarIcon />}
                iconSide="left"
                readOnly
                placeholder={props.placeholder}
            />
        );
    }

    return (
        <DatePickerField
            className={clsx(
                styles[`DatePickerField--${inputState}`],
                className,
            )}
            value={inputValue || ''}
            inputState={inputState}
            onChange={onChange}
            onKeyDown={onPressEnter}
            onBlur={onBlur}
            icon={
                inputState === 'valid' ? (
                    <ErrorCircleIcon handleClose={handleClose} />
                ) : (
                    <CalendarIcon />
                )
            }
            iconSide={inputState === 'valid' ? 'right' : 'left'}
            {...props}
        />
    );
};

export default DatePickerInput;

type DatePickerFieldProps = ComponentProps<'input'> & {
    inputState: 'default' | 'invalid' | 'valid';
    icon: JSX.Element;
    iconSide: 'left' | 'right';
};

const DatePickerField = ({
    inputState,
    icon,
    iconSide,
    className,
    ...props
}: DatePickerFieldProps) => {
    return (
        <div className={clsx(styles.DatePickerField)}>
            {icon}
            <input
                className={clsx(
                    styles.DatePickerField__input,
                    styles[`DatePickerField__input--${inputState}`],
                    className,
                )}
                type="text"
                {...props}
            />
            {iconSide === 'right' && icon}
        </div>
    );
};

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
