import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import DatePicker, { RangeDateValue } from '../../my-components/src/DatePicker';
import Button from '../../my-components/src/Button';
import { type DateValue } from '../../my-components/src/DatePicker';

const meta: Meta<typeof DatePicker> = {
    title: 'DatePicker',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [date, setDate] = useState<DateValue>();

        return (
            <div style={{ width: '500px', height: '1000vh' }}>
                <DatePicker
                    date={date}
                    onChangeDate={(date) => setDate(date)}
                    locale="ko"
                >
                    <DatePicker.Trigger />
                    <DatePicker.Content>
                        <DatePicker.Header>
                            <DatePicker.Input placeholder="시작일" />
                        </DatePicker.Header>
                        <DatePicker.Calendar
                            minDate={new Date('2024-07.05')}
                            maxDate={new Date('2024-07.24')}
                        />
                        <DatePicker.Footer>
                            <DatePicker.Reset />

                            <Button variant="link">A</Button>
                            <Button variant="primary">B</Button>
                        </DatePicker.Footer>
                    </DatePicker.Content>
                </DatePicker>

                <div>바깥 상태: {date?.toString()}</div>
            </div>
        );
    },
};

export const WithSidebar: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [date, setDate] = useState<RangeDateValue>();

        return (
            <div style={{ width: '500px', height: '1000vh' }}>
                <DatePicker
                    date={date}
                    onChangeDate={(date) => setDate(date)}
                    locale="ko"
                    mode="range"
                >
                    <DatePicker.Trigger />
                    <DatePicker.Content>
                        <DatePicker.Header>
                            <DatePicker.Input
                                placeholder="시작일"
                                target="start"
                            />
                            <DatePicker.Input
                                placeholder="종료일"
                                target="end"
                            />
                        </DatePicker.Header>
                        <div style={{ display: 'flex' }}>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <button
                                    onClick={() => {
                                        const date = new Date();
                                        date.setMonth(date.getMonth() - 1);
                                        setDate([date, new Date()]);
                                    }}
                                >
                                    최근 한달
                                </button>
                                <button
                                    onClick={() => {
                                        const date = new Date();
                                        date.setDate(date.getDate() - 7);
                                        setDate([date, new Date()]);
                                    }}
                                >
                                    최근 일주일
                                </button>
                                <button
                                    onClick={() =>
                                        setDate([new Date(), new Date()])
                                    }
                                >
                                    오늘
                                </button>
                            </div>
                            <DatePicker.Calendar />
                        </div>
                        <DatePicker.Footer>
                            <DatePicker.Reset />

                            <Button variant="link">A</Button>
                            <Button variant="primary">B</Button>
                        </DatePicker.Footer>
                    </DatePicker.Content>
                </DatePicker>

                <div style={{ marginTop: 10 }}>
                    <span>date 상태: </span>
                    <br />
                    <br />
                    <span>{date?.[0]?.toLocaleDateString()}</span>
                    <span> ~ </span>
                    <span>{date?.[1]?.toLocaleDateString()}</span>
                </div>
            </div>
        );
    },
};
