import { DateValue, RangeDateValue } from '../DatePicker.types';

export type ModeDate<T> = T extends 'single' ? DateValue : RangeDateValue;
