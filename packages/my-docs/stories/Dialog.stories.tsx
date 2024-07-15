import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button, Dialog } from '@noahnoahchoi/my-components';

const meta: Meta<typeof Dialog> = {
    title: 'Dialog',
    component: Dialog,
    parameters: {
        docs: {
            description: {
                component: 'this is `Dialog description`',
            },
        },
    },
    argTypes: {
        size: {
            control: 'select',
            options: ['md', 'lg', 'xl'],
        },
        preventScrimBehavior: {
            control: 'boolean',
        },
    },
    args: {
        size: 'md',
        preventScrimBehavior: false,
    },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        const handleOpen = () => {
            setIsOpen((p) => !p);
        };

        return (
            <>
                <Button onClick={handleOpen}>다이얼로그 오픈</Button>

                <Dialog
                    size={args.size}
                    open={isOpen}
                    onOpenChange={handleOpen}
                    preventScrimBehavior={args.preventScrimBehavior}
                >
                    <Dialog.Header showClose>헤더입니다.</Dialog.Header>
                    <Dialog.Content>
                        <div>첫번째 슬롯</div>
                        <div>두번째 슬롯</div>
                        <div>세번째 슬롯</div>
                        <div>네번째 슬롯</div>
                        <div>다섯번째 슬롯</div>
                    </Dialog.Content>
                    <Dialog.Footer type="default">
                        <Button onClick={handleOpen} variant="link">
                            취소
                        </Button>
                        <Button onClick={handleOpen} variant="primary">
                            확인
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </>
        );
    },
};

export const StackedFooter: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        const handleOpen = () => {
            setIsOpen((p) => !p);
        };

        return (
            <>
                <Button onClick={handleOpen}>다이얼로그 오픈</Button>

                <Dialog
                    size={args.size}
                    open={isOpen}
                    onOpenChange={handleOpen}
                    preventScrimBehavior={args.preventScrimBehavior}
                >
                    <Dialog.Header showClose>헤더입니다.</Dialog.Header>
                    <Dialog.Content>
                        <div>첫번째 슬롯</div>
                        <div>두번째 슬롯</div>
                        <div>세번째 슬롯</div>
                        <div>네번째 슬롯</div>
                        <div>다섯번째 슬롯</div>
                    </Dialog.Content>
                    <Dialog.Footer type="stacked">
                        <Button onClick={handleOpen} variant="primary">
                            확인
                        </Button>
                        <Button onClick={handleOpen} variant="link">
                            취소
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </>
        );
    },
};
