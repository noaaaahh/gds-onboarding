import {
    Dialog as RadixDialog,
    Portal as RadixPortal,
    Content as RadixContent,
    Overlay as RadixScrim,
} from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import React from 'react';

import DialogContent from './DialogContent';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';

import { DialogProps } from './Dialog.types';
import styles from './Dialog.module.scss';

const Dialog = ({
    size = 'md',
    preventScrimBehavior = false,
    open,
    onOpenChange,
    children,
    ...props
}: DialogProps) => {
    const dialogSizeStyle = styles[`wrapper_${size}`];
    const handleScrimBehavior = (e: Event) => {
        if (preventScrimBehavior) e.preventDefault();
    };

    return (
        <RadixDialog open={open} onOpenChange={onOpenChange} {...props}>
            <RadixPortal>
                <RadixScrim className={styles.scrim} />
                <RadixContent
                    className={clsx(styles.wrapper, dialogSizeStyle)}
                    onPointerDownOutside={handleScrimBehavior}
                    aria-describedby="hi"
                >
                    {children}
                </RadixContent>
            </RadixPortal>
        </RadixDialog>
    );
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export default Dialog;
