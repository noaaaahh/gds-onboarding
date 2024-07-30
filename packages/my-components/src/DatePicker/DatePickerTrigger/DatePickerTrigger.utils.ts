import { Locale, RangeDateValue } from '../DatePicker.types';
import { dateFormat } from '../DatePicker.utils';

export const getInputText = (date: RangeDateValue, locale: Locale) => {
    const [start, end] = date;
    const startValue = dateFormat(start, locale);
    const endValue = dateFormat(end, locale);

    if (startValue && endValue) return `${startValue} - ${endValue}`;
    else return `${startValue || endValue}`;
};
