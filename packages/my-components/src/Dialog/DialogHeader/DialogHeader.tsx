import React from 'react';

import { DialogHeaderProps } from './DialogHeader.types';
import styles from './DialogHeader.module.scss';
import IconBase from '../../Icon/IconBase';
import { DialogClose, DialogTitle } from '@radix-ui/react-dialog';

const CloseIcon = () => {
    return (
        <IconBase
            fill="#6C6E7E" // semantic color/theme/hint
            width="20"
            height="20"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.459 4.4595L8.91902 8.0005L12.459 11.5405L11.541 12.4595L8.00002 8.9185L4.45902 12.4595L3.54102 11.5405L7.08102 8.0005L3.54102 4.4595L4.45902 3.5405L8.00002 7.0815L11.541 3.5405L12.459 4.4595Z"
            />
        </IconBase>
    );
};

const DialogHeader = ({ showClose = true, children }: DialogHeaderProps) => {
    return (
        <div className={styles.header}>
            <DialogTitle className={styles[`header_title`]}>
                {children}
            </DialogTitle>
            {showClose && (
                <DialogClose className={styles[`header_close`]}>
                    <CloseIcon />
                </DialogClose>
            )}
        </div>
    );
};

export default DialogHeader;
