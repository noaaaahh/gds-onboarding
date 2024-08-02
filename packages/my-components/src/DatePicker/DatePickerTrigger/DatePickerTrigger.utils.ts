import { DateValue, Locale, RangeDateValue } from '../DatePicker.types';
import { dateFormat, isDateValue } from '../DatePicker.utils';

export const getInputText = (
    date: DateValue | RangeDateValue,
    locale: Locale,
) => {
    if (isDateValue(date)) return getSingleInputText(date, locale);
    else return getRangeInputText(date, locale);
};

const getSingleInputText = (date: DateValue, locale: Locale) => {
    return dateFormat(date, locale);
};

const getRangeInputText = (date: RangeDateValue, locale: Locale) => {
    const { from, to } = date;
    const startValue = dateFormat(from, locale);
    const endValue = dateFormat(to, locale);

    if (startValue && endValue) return `${startValue} - ${endValue}`;
    else return `${startValue || endValue}`;
};
