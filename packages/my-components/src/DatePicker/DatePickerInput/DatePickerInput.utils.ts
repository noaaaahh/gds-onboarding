import { DateType, DateValue, RangeDateValue } from '../DatePicker.types';
import { getSortedDates, isDateValue } from '../DatePicker.utils';
import { InputType } from './DatePickerInput.types';

export const getTargetDate = (date: DateType, target: InputType): DateValue => {
    if (!date || target === 'single') return date as DateValue;
    else if ('from' in date && 'to' in date) return date[target];

    return date;
};

export const getNextDate = (
    currentDate: DateType,
    nextDate: Date,
    target: InputType,
) => {
    if (isDateValue(currentDate) || target === 'single') {
        return nextDate;
    } else {
        const copiedDate = { ...currentDate } satisfies RangeDateValue;
        copiedDate[target] = nextDate;

        const sortedNextDate = getSortedDates(copiedDate);
        return sortedNextDate;
    }
};
