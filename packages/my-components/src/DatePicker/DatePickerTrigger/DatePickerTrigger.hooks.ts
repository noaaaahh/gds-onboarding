import { useEffect, useState } from 'react';
import { DateValue, Locale, RangeDateValue } from '../DatePicker.types';
import { getInputText } from './DatePickerTrigger.utils';

export const useTriggerInput = (
    date: DateValue | RangeDateValue,
    locale: Locale,
) => {
    const [inputValue, setInputValue] = useState(getInputText(date, locale));

    useEffect(() => {
        const nextInputText = getInputText(date, locale);

        setInputValue(nextInputText);
    }, [date, locale]);

    return inputValue;
};
