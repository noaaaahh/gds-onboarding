import { InitializeRangeProps, Locale } from './DatePicker.types';

// *** 한자리수 월/일 -> 0 채워주기
const datePads = (value: number) => {
    return `${value}`.padStart(2, '0');
};

// *** 날짜 formating
export const dateFormat = (date: Date, locale: Locale) => {
    if (!date) {
        return null;
    }
    const formatDate = date;

    const y = formatDate.getFullYear();
    const m = datePads(formatDate.getMonth() + 1);
    const d = datePads(formatDate.getDate());

    if (locale === 'ko') return `${y}.${m}.${d}`;
    return `${m}.${d}.${y}`;
};

type IsDateFormatProps = { y: string; m: string; d: string };
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

type CheckRangeProps = {
    value: string;
} & InitializeRangeProps;
export const constrainDateToRange = ({
    value,
    minDate,
    maxDate,
}: CheckRangeProps) => {
    const date = new Date(value);

    if (minDate && date < minDate) return minDate;
    if (maxDate && date > maxDate) return maxDate;

    return date;
};
