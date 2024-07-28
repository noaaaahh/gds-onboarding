import { ComponentPropsWithoutRef, CSSProperties } from 'react';

type Spacing = 'sm' | 'md' | 'lg' | number;

export type StackProps = {
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    spacing?: Spacing;
} & ComponentPropsWithoutRef<'div'>;
