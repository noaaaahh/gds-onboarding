import {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    useEffect,
    useState,
} from 'react';
import {
    constrainDateToRange,
    dateFormat,
    getSortedDates,
    isDateValue,
    isValidDate,
} from '../DatePicker.utils';
import { RangeDateValue } from '../DatePicker.types';
import { useDatePicker } from '../DatePicker.context';
import { DATE_REGEX } from './DatePickerInput.constants';
import { DateInput, InputType } from './DatePickerInput.types';

const getInputIndex = (target: InputType | undefined) =>
    target === 'start' ? 0 : 1;

export const useDateInput = (target: InputType | undefined) => {
    const CURRENT_INPUT_INDEX = getInputIndex(target);
    const { date, handleChange, minDate, maxDate, locale, mode } =
        useDatePicker();
    const [dateInput, setDateInput] = useState<DateInput>(() => {
        const targetDate = isDateValue(date) ? date : date[CURRENT_INPUT_INDEX];

        return {
            state: 'default',
            value: dateFormat(targetDate, locale) || '',
        };
    });

    const handleClose = () => {
        if (isDateValue(date)) return handleChange(undefined);

        const nextDate = [...date] satisfies RangeDateValue;
        nextDate[CURRENT_INPUT_INDEX] = undefined;
        handleChange(nextDate);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;
        if (!DATE_REGEX.test(currentValue)) return;
        if (currentValue === '')
            setDateInput((p) => ({ ...p, state: 'default' }));

        setDateInput((p) => ({ ...p, value: currentValue }));
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

    // 주석
    // hooks로 빼내기
    const parseTextToDate = (value: string) => {
        if (value === '') return handleClose();

        const isValid = isValidDate(value, locale);
        if (!isValid) return setDateInput((p) => ({ ...p, state: 'invalid' }));

        const nextDate = constrainDateToRange({ value, minDate, maxDate });
        const targetDate = isDateValue(date) ? date : date[CURRENT_INPUT_INDEX];

        if (targetDate === nextDate) {
            const nextInputValue = dateFormat(nextDate, locale);
            setDateInput((p) => ({ ...p, value: nextInputValue }));
        }

        if (isDateValue(date)) {
            handleChange(nextDate);
        } else {
            const copiedDate = [...date] satisfies RangeDateValue;
            copiedDate[CURRENT_INPUT_INDEX] = nextDate;

            const sortedNextDate = getSortedDates(copiedDate);
            handleChange(sortedNextDate);
        }

        setDateInput((p) => ({ ...p, state: 'valid' }));
    };

    useEffect(() => {
        const targetDate = isDateValue(date) ? date : date[CURRENT_INPUT_INDEX];
        const nextValue = dateFormat(targetDate, locale);

        setDateInput({
            value: nextValue,
            state: nextValue ? 'valid' : 'default',
        });
    }, [CURRENT_INPUT_INDEX, date, locale]);

    return {
        dateInput,
        mode,
        handleClose,
        onChange,
        onBlur,
        onKeyDown: onPressEnter,
    };
};
