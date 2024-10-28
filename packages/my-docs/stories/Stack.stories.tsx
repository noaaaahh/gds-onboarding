import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Stack from '../../my-components/src/Stack';

const meta: Meta<typeof Stack> = {
    title: 'Stack',
    component: Stack,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: { type: 'inline-radio' },
            options: ['start', 'center', 'end', 'stretch'],
        },
        justify: {
            control: { type: 'inline-radio' },
            options: ['start', 'center', 'end'],
        },
        spacing: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
        },
    },
    args: {
        align: 'center',
        spacing: 'md',
    },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
    render: (args) => {
        return (
            <div>
                <Stack {...args}>
                    <StackItem
                        bgColor="red"
                        label="1"
                        minWidth={100}
                        height={50}
                    />

                    <StackItem
                        bgColor="blue"
                        label="2"
                        minWidth={50}
                        height={200}
                    />

                    <StackItem
                        bgColor="green"
                        label="3"
                        minWidth={150}
                        height={150}
                    />

                    <StackItem
                        bgColor="yellow"
                        label="4"
                        minWidth={200}
                        height={100}
                    />
                </Stack>
            </div>
        );
    },
};

export const NumberSpacing: Story = {
    argTypes: {
        spacing: {
            control: 'number',
        },
    },
    render: (args) => {
        return (
            <div>
                <Stack {...args}>
                    <StackItem
                        bgColor="red"
                        label="1"
                        minWidth={100}
                        height={50}
                    />

                    <StackItem
                        bgColor="blue"
                        label="2"
                        minWidth={50}
                        height={200}
                    />

                    <StackItem
                        bgColor="green"
                        label="3"
                        minWidth={150}
                        height={150}
                    />

                    <StackItem
                        bgColor="yellow"
                        label="4"
                        minWidth={200}
                        height={100}
                    />
                </Stack>
            </div>
        );
    },
};

const StackItem = (props: {
    bgColor: string;
    label: string;
    minWidth: number;
    height: number;
}) => {
    return (
        <div
            style={{
                backgroundColor: props.bgColor,
                ...props,
            }}
        ></div>
    );
};
