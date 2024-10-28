import { DialogProps as RadixDialogProps } from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';

type SizeToken = 'md' | 'lg' | 'xl';

export type DialogContextType = {
    size: SizeToken;
    preventScrimBehavior?: boolean;
};

export type DialogProps = MakeRequired<
    DialogContextType & RadixDialogProps,
    'children'
>;

export type MakeRequired<T, U extends keyof T> = T & { [P in U]-?: T[P] };
export type WithChildren = MakeRequired<PropsWithChildren, 'children'>;
