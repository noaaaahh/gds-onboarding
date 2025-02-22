import {
    DateType,
    DateValue,
    Locale,
    RangeDateValue,
} from './DatePicker.types';

// *** 한자리수 월/일 -> 0 채워주기
const datePads = (value: number) => {
    return `${value}`.padStart(2, '0');
};

// *** 날짜 formating
export const dateFormat = (date: DateValue, locale: Locale) => {
    if (!date) {
        return '';
    }

    const formatDate = date;

    const y = formatDate.getFullYear();
    const m = datePads(formatDate.getMonth() + 1);
    const d = datePads(formatDate.getDate());

    if (locale === 'ko') return `${y}.${m}.${d}`;
    return `${m}.${d}.${y}`;
};

export const isDateValue = (
    // !다른 방법을 고민해보기
    date: DateType,
): date is DateValue => {
    if (!date) return true;
    if ('from' in date && 'to' in date) return false;
    else return true;
};

export const getSortedDates = (dates: RangeDateValue): RangeDateValue => {
    const { from, to } = dates;

    if (!from) return { from: null, to };
    else if (!to) return { from, to: null };

    return {
        from: new Date(Math.min(from.getTime(), to.getTime())),
        to: new Date(Math.max(from.getTime(), to.getTime())),
    };
};
