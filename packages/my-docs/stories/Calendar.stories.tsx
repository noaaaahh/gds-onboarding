import { Meta, StoryObj } from '@storybook/react';
import Calendar from '../../my-components/src/Calendar';

const meta: Meta<typeof Calendar> = {
    title: 'Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {};
