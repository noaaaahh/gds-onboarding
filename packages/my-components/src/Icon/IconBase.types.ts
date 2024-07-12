import React, { FunctionComponent, SVGProps } from 'react';

export type IconBaseProps = SVGProps<SVGSVGElement> & {
    width?: number | string;
    height?: number | string;
    size?: number | string;
    color?: string;
    className?: string;
    children: React.ReactNode;
};

export type IconType = FunctionComponent<Omit<IconBaseProps, 'children'>>;
