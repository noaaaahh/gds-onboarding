export function formatDay(date: Date) {
    return date.getDate().toString();
}

export function formatMonth(date: Date, locale?: string) {
    const m = date.getMonth();

    if (locale === 'ko') {
        return `${m + 1}월`;
    }
    if (locale === 'en') {
        if (m === 0) return 'JAN';
        if (m === 1) return 'FEB';
        if (m === 2) return 'MAR';
        if (m === 3) return 'APR';
        if (m === 4) return 'MAY';
        if (m === 5) return 'JUN';
        if (m === 6) return 'JUL';
        if (m === 7) return 'AUG';
        if (m === 8) return 'SEP';
        if (m === 9) return 'OCT';
        if (m === 10) return 'NOV';
        if (m === 11) return 'DEC';
        return 'error';
    }
    return (m + 1).toString();
}

export function formatYear(date: Date) {
    return date.getFullYear().toString();
}
