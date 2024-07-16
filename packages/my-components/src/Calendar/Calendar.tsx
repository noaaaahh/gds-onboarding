import React from 'react';
import ReactCalendar from 'react-calendar';

import { formatDay, formatMonth, formatYear } from './Calendar.utils';
import { CalendarProps } from './Calendar.types';
import styles from './Calendar.module.scss';
import IconBase from '../Icon/IconBase';

const ChevronLeftIcon = () => (
    <IconBase
        width="20px"
        height="20px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.33838 12.7021L4.63538 8.0001L9.33838 3.2981L10.2574 4.2171L6.47438 8.0001L10.2574 11.7821L9.33838 12.7021Z"
        />
    </IconBase>
);

const ChevronRightIcon = () => (
    <IconBase
        width="20px"
        height="20px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.65228 12.7021L5.73328 11.7821L9.51628 8.0001L5.73328 4.2171L6.65228 3.2981L11.3553 8.0001L6.65228 12.7021Z"
        />
    </IconBase>
);

const Calendar = ({
    calendarType = 'gregory',
    minDate = new Date('1970.01.01'),
    maxDate = new Date('2999.12.31'),
    prevLabel = <ChevronLeftIcon />,
    nextLabel = <ChevronRightIcon />,
    ...props
}: CalendarProps) => {
    return (
        <ReactCalendar
            className={styles.container}
            calendarType={calendarType}
            minDate={minDate}
            maxDate={maxDate}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            formatDay={(lang, d) => formatDay(d)}
            formatMonth={(lang, d) => formatMonth(d, lang)}
            formatYear={(lang, d) => formatYear(d)}
            {...props}
        />
    );
};

export default Calendar;

/**
 * const selectedLevel = {
 *      month: ''
 *      year: '',
 *      decade: ''
 * }
 * let level: "month" | "year" | "decade";
 *
 * <Calendar defaultDate={} locale={} showNeighboringMonth minDate={} maxDate={}>
 *   <div>
 *      <CalendarPrev>Prev</CalendarPrev>
 *      <CalendarLevel>{}</CalendarLevel>
 *      <CalendarNext>Next</CalendarNext>
 *   </div>
 *
 *   <CalendarWeeks />
 *
 *   <CalendarContent  />
 * </Calendar>
 */
