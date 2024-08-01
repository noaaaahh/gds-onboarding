import { ComponentPropsWithoutRef, ElementRef } from 'react';
import NoBody from '../../NoBody';

export type DatePickerTriggerRef = ElementRef<typeof NoBody.Trigger>;
export type DatePickerTriggerProps = ComponentPropsWithoutRef<
    typeof NoBody.Trigger
>;
