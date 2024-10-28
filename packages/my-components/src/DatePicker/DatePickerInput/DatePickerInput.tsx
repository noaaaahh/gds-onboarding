import React from 'react';
import { clsx } from 'clsx';

import IconBase from '../../Icon/IconBase';

import styles from './DatePickerInput.module.scss';
import useDateInput from './DatePickerInput.hooks';
import { DatePickerInputProps } from './DatePickerInput.types';

const DatePickerInput = ({
    target,
    className,
    ...props
}: DatePickerInputProps) => {
    const { dateInput, handleClose, onChange, ...dateInputHandlers } =
        useDateInput(target);

    return (
        <div className={clsx(styles.datePickerField)}>
            {dateInput.state === 'valid' ? (
                <ErrorCircleIcon handleClose={handleClose} />
            ) : (
                <CalendarIcon />
            )}
            <input
                className={clsx(
                    styles.input,
                    styles[`input_${dateInput.state}`],
                    className,
                )}
                value={dateInput.value || ''}
                type="text"
                onChange={onChange}
                {...dateInputHandlers}
                {...props}
            />
        </div>
    );
};

export default DatePickerInput;

const ErrorCircleIcon = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <IconBase
            width="16"
            height="16"
            viewBox="0 0 16 16"
            color="#858899"
            className={styles.cancelIcon}
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClose}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.46 10.54L10.54 11.46L8 8.92L5.46 11.46L4.54 10.54L7.08 8L4.54 5.46L5.46 4.54L8 7.08L10.54 4.54L11.46 5.46L8.92 8L11.46 10.54ZM8 1.5C4.412 1.5 1.5 4.412 1.5 8C1.5 11.588 4.412 14.5 8 14.5C11.588 14.5 14.5 11.588 14.5 8C14.5 4.412 11.588 1.5 8 1.5Z"
            />
        </IconBase>
    );
};

const CalendarIcon = () => {
    return (
        <IconBase
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={styles.calendarIcon}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2 9.25001H11.5V7.95001H10.2V9.25001ZM4.5 9.25001H5.8V7.95001H4.5V9.25001ZM7.35 9.25001H8.65V7.95001H7.35V9.25001ZM3.3 13.2H12.7V6.50001H3.3V13.2ZM12.15 2.50001V1.20001H10.85V2.50001H5.15V1.20001H3.85V2.50001H2V3.50001V6.50001V14.5H14V6.50001V3.50001V2.50001H12.15Z"
            />
        </IconBase>
    );
};
