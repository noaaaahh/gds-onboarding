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
    isDateValue,
    isValidDate,
} from '../DatePicker.utils';
import { RangeDateValue } from '../DatePicker.types';
import { useDatePicker } from '../DatePicker.context';
import { DATE_REGEX } from './DatePickerInput.constants';
import { DateInput, InputType } from './DatePickerInput.types';
import { getTargetDate, getNextDate } from './DatePickerInput.utils';

export const useDateInput = (target: InputType) => {
    const { date, handleChange, minDate, maxDate, locale, mode } =
        useDatePicker();
    const [dateInput, setDateInput] = useState<DateInput>(() => {
        const targetDate = getTargetDate(date, target);

        return {
            state: 'default',
            value: dateFormat(targetDate, locale) || '',
        };
    });

    const handleClose = () => {
        if (isDateValue(date) || target === 'single') return handleChange(null);

        const nextDate = { ...date } satisfies RangeDateValue;
        nextDate[target] = null;
        handleChange(nextDate);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!DATE_REGEX.test(value)) return;
        if (value === '') setDateInput((p) => ({ ...p, state: 'default' }));

        setDateInput((p) => ({ ...p, value }));
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

        const contrainedDate = constrainDateToRange({
            value,
            minDate,
            maxDate,
        });
        const targetDate = getTargetDate(date, target);
        const nextDate = getNextDate(date, contrainedDate, target);
        handleChange(nextDate);

        setDateInput((p) => ({
            state: 'valid',
            value:
                targetDate === contrainedDate
                    ? dateFormat(contrainedDate, locale)
                    : p.value,
        }));
    };

    useEffect(() => {
        const targetDate = getTargetDate(date, target);
        const nextValue = dateFormat(targetDate, locale);

        setDateInput({
            value: nextValue,
            state: nextValue ? 'valid' : 'default',
        });
    }, [date, locale, target]);

    return {
        dateInput,
        mode,
        handleClose,
        onChange,
        onBlur,
        onKeyDown: onPressEnter,
    };
};
