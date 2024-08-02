import { LooseValue } from 'react-calendar/dist/cjs/shared/types';
import { DateType } from '../DatePicker.types';
import { getSortedDates, isDateValue } from '../DatePicker.utils';

export const updateCalendarDate = (date: DateType, currentDate: Date) => {
    if (isDateValue(date)) return currentDate;

    const { from, to } = date;

    if (from && !to) return getSortedDates({ from, to: currentDate });
    else if (!from && to) return getSortedDates({ from: currentDate, to });
    else return getSortedDates({ from: currentDate, to: null });
};

export const getCalendarValue = (date: DateType): LooseValue => {
    if (isDateValue(date)) return date;

    const { from, to } = date;

    if (from && !to) return from;
    if (!from && to) return to;

    return [date.from, date.to];
};
