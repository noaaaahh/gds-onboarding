import React from 'react';
import { useDatePicker } from '../DatePicker.context';
import Button from '../../Button';

const DatePickerReset = () => {
    const { handleChange, defaultDate } = useDatePicker();
    const reset = () => {
        handleChange(defaultDate);
    };

    return (
        <Button variant="link" type="reset" onClick={reset}>
            리셋
        </Button>
    );
};

export default DatePickerReset;
