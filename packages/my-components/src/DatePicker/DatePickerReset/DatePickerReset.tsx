import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';
import React from 'react';

import { useDatePicker } from '../DatePicker.context';
import IconBase from '../../Icon/IconBase';
import styles from './DatePickerReset.module.scss';
import { DatePickerResetProps } from './DatePickerReset.types';

const DatePickerReset = ({
    asChild = false,
    children,
    ...props
}: DatePickerResetProps) => {
    const { handleChange, defaultDate } = useDatePicker();
    const reset = () => handleChange(defaultDate);

    const Comp = asChild ? Slot : 'button';
    const customReset = (
        <>
            <RefreshIcon />
            {children || '초기화'}
        </>
    );

    return (
        <Comp
            onClick={reset}
            className={clsx(!asChild && styles.reset)}
            {...props}
        >
            {asChild ? children : customReset}
        </Comp>
    );
};

export default DatePickerReset;

const RefreshIcon = () => (
    <IconBase
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 2.24609V5.44309V6.74409H13.861H12.7H12.502H9.502V5.44309H11.902C11.066 4.16709 9.638 3.31809 8 3.31809C5.408 3.31809 3.3 5.42609 3.3 8.01709C3.3 10.6091 5.408 12.7181 8 12.7181C10.583 12.7181 12.683 10.6231 12.697 8.04309H13.999C13.984 11.3441 11.303 14.0171 8 14.0171C4.688 14.0171 2 11.3301 2 8.01709C2 4.70609 4.688 2.01709 8 2.01709C9.913 2.01709 11.602 2.92609 12.7 4.32209V2.24609H14Z"
        />
    </IconBase>
);
