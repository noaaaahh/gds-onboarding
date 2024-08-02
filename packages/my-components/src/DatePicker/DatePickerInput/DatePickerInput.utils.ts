import {
    DateType,
    DateValue,
    Locale,
    RangeDateValue,
} from '../DatePicker.types';
import { isDateValue } from '../DatePicker.utils';
import {
    ConstrainDateToRangeProps,
    InputType,
    IsDateFormatProps,
    UpdateInputDate,
} from './DatePickerInput.types';

export const getUpdatedDate = (
    date: DateType,
    target: InputType,
): DateValue => {
    if (!date || target === 'single') return date as DateValue;
    else if ('from' in date && 'to' in date) return date[target];

    return date;
};

export const updateInputDate = ({
    date: currentDate,
    nextDate,
    target,
}: UpdateInputDate) => {
    if (isDateValue(currentDate) || target === 'single') {
        return nextDate;
    } else {
        const copiedDate = { ...currentDate } satisfies RangeDateValue;
        copiedDate[target] = nextDate;

        return copiedDate;
    }
};

export const constrainDateToRange = ({
    value,
    minDate,
    maxDate,
}: ConstrainDateToRangeProps) => {
    const date = new Date(value);

    if (minDate && date < minDate) return minDate;
    if (maxDate && date > maxDate) return maxDate;

    return date;
};

export const isDateFormat = ({ y, m, d }: IsDateFormatProps) => {
    const date = new Date(`${y}-${m}-${d}`);

    if (!date.getTime()) return false;
    else return true;
};

export const getYMD = (value: string, locale: Locale) => {
    const dates = value.replace(/[./]/g, ' ').split(' ');
    let y, m, d;

    if (locale === 'ko') {
        [y, m, d] = dates;
    } else {
        [m, d, y] = dates;
    }

    return { y, m, d };
};

export const isValidDate = (value: string, locale: Locale) => {
    return isDateFormat(getYMD(value, locale));
};
