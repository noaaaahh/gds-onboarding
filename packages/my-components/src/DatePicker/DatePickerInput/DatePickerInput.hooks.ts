import {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    useEffect,
    useState,
} from 'react';
import { dateFormat, getSortedDates, isDateValue } from '../DatePicker.utils';
import { useDatePicker } from '../DatePicker.context';
import { DATE_REGEX } from './DatePickerInput.constants';
import { DateInput, InputType } from './DatePickerInput.types';
import {
    getUpdatedDate,
    updateInputDate,
    constrainDateToRange,
    isValidDate,
} from './DatePickerInput.utils';

const useDateInput = (target: InputType) => {
    const { date, handleChange, minDate, maxDate, locale } = useDatePicker();
    const [dateInput, setDateInput] = useState<DateInput>({
        state: 'default',
        value: dateFormat(getUpdatedDate(date, target), locale) || '',
    });

    const handleClose = () => {
        const nextDate = updateInputDate({ date, nextDate: null, target });

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

    // NOTE: input의 value를 Date 형식으로 변환합니다.
    const parseTextToDate = (value: string) => {
        if (value === '') return handleClose();

        const isValid = isValidDate(value, locale);
        if (!isValid) return setDateInput((p) => ({ ...p, state: 'invalid' }));

        // 1. 다음 날짜를 범위 내로 조정
        const contrainedDate = constrainDateToRange({
            value,
            minDate,
            maxDate,
        });
        // 2. 기존 날짜를 다음 날짜로 변경
        const nextDate = updateInputDate({
            date,
            nextDate: contrainedDate,
            target,
        });
        // Range 모드일 시 시작 날짜와 종료 날짜를 순서에 맞게 조정
        const sortedNextDate = isDateValue(nextDate)
            ? nextDate
            : getSortedDates(nextDate);

        handleChange(sortedNextDate);

        setDateInput({
            state: 'valid',
            value: dateFormat(contrainedDate, locale),
        });
    };

    useEffect(() => {
        const targetDate = getUpdatedDate(date, target);
        const nextValue = dateFormat(targetDate, locale);

        setDateInput({
            value: nextValue,
            state: nextValue ? 'valid' : 'default',
        });
    }, [date, locale, target]);

    return {
        dateInput,
        handleClose,
        onChange,
        onBlur,
        onKeyDown: onPressEnter,
    };
};

export default useDateInput;
