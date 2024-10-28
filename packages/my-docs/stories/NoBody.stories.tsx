import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import NoBody from '@noahnoahchoi/my-components/src/NoBody';

const meta: Meta<typeof NoBody> = {
    title: 'NoBody',
    component: NoBody,
    parameters: {
        layout: 'centered',
    },
    args: {
        modal: false,
    },
    argTypes: {
        modal: { control: 'boolean' },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NoBody>;

export const Modal: Story = {
    render: (args) => {
        return (
            <div style={{ height: '1000vh' }}>
                <NoBody modal={args.modal}>
                    <NoBody.Trigger>d</NoBody.Trigger>
                    <NoBody.Content
                        side="bottom"
                        align="start"
                        sideOffset={5}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'lightgrey',
                        }}
                    >
                        <div>{args.modal ? '스크롤 안됨' : '스크롤 됨'}</div>
                    </NoBody.Content>
                </NoBody>

                <div id="bcbcbc"></div>
            </div>
        );
    },
};
