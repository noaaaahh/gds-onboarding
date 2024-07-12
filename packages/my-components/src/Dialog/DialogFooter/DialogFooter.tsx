import React, { forwardRef } from 'react';
import cn from 'classnames';

import styles from './DialogFooter.module.scss';
import { DialogFooterProps } from './DialogFooter.types';

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
    ({ type = 'default', children }, ref) => {
        const footerTypeStyle = styles[`footer_${type}`];

        return (
            <div ref={ref} className={cn(styles.footer, footerTypeStyle)}>
                {children}
            </div>
        );
    },
);
DialogFooter.displayName = 'DialogFooter';

export default DialogFooter;
