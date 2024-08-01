/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import React, { ReactNode, useState } from 'react';

import DatePicker, { DateType } from '../../my-components/src/DatePicker';
import Button from '../../my-components/src/Button';
import Stack from '../../my-components/src/Stack';

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
        // const [date, setDate] = useState<DateType>();

        return (
            <div style={{ width: '500px', height: '100dvh' }}>
                <DatePicker locale="ko">
                    <DatePicker.Trigger />
                    <DatePicker.Content>
                        <div
                            style={{
                                padding: '12px 16px 16px',
                                borderBottom:
                                    '0.0625rem solid var(--border-color, rgb(225, 225, 232))',
                            }}
                        >
                            <DatePicker.Input placeholder="날짜를 선택해주세요." />
                        </div>
                        <DatePicker.Calendar
                            minDate={new Date('2024-07.05')}
                            maxDate={new Date('2024-07.24')}
                        />
                        <div
                            style={{
                                display: 'flex',
                                padding: '12px 16px 16px',
                                borderTop:
                                    '0.0625rem solid var(--border-color, rgb(225, 225, 232))',
                            }}
                        >
                            <DatePicker.Reset />

                            <Button variant="link">A</Button>
                            <Button variant="primary">B</Button>
                        </div>
                    </DatePicker.Content>
                </DatePicker>
            </div>
        );
    },
};

export const WithSidebar: Story = {
    render: () => {
        const [date, setDate] = useState<DateType>();
        const handleRangeDate = (range: 'month' | 'week' | 'today') => {
            const date = new Date();

            if (range === 'month') date.setMonth(date.getMonth() - 1);
            else if (range === 'week') date.setDate(date.getDate() - 7);

            setDate([date, new Date()]);
        };

        return (
            <div style={{ width: '500px', height: '100dvh' }}>
                <DatePicker
                    date={date}
                    onChangeDate={(date) => setDate(date)}
                    locale="ko"
                    mode="range"
                >
                    <DatePicker.Trigger />
                    <DatePicker.Content>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '12px 16px 16px',
                                borderBottom:
                                    '0.0625rem solid var(--border-color, rgb(225, 225, 232))',
                            }}
                        >
                            <DatePicker.Input target="start" />
                            <DatePicker.Input target="end" />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Stack
                                spacing="sm"
                                style={{
                                    width: '150px',
                                    padding: '12px 4px',
                                    borderRight:
                                        '0.0625rem solid var(--border-color, rgb(225, 225, 232))',
                                }}
                            >
                                <RangeButton
                                    onClick={() => handleRangeDate('month')}
                                >
                                    최근 한달
                                </RangeButton>
                                <RangeButton
                                    onClick={() => handleRangeDate('week')}
                                >
                                    최근 일주일
                                </RangeButton>
                                <RangeButton
                                    onClick={() => handleRangeDate('today')}
                                >
                                    오늘
                                </RangeButton>
                            </Stack>
                            <DatePicker.Calendar />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                padding: '16px',
                                borderTop:
                                    '0.0625rem solid var(--border-color, rgb(225, 225, 232))',
                            }}
                        >
                            <DatePicker.Reset />

                            <Button variant="link">A</Button>
                            <Button variant="primary">B</Button>
                        </div>
                    </DatePicker.Content>
                </DatePicker>

                <div style={{ marginTop: 10 }}>
                    <span>date 상태: </span>
                    <br />
                    <br />
                    {Array.isArray(date)
                        ? `${date[0]?.toLocaleDateString()} ~ ${date[1]?.toLocaleDateString()}`
                        : date?.toString()}
                </div>
            </div>
        );
    },
};

const RangeButton = ({
    onClick,
    children,
}: {
    onClick: (date: Date) => void;
    children: ReactNode;
}) => {
    const date = new Date();

    return (
        <button
            onClick={() => onClick(date)}
            style={{
                cursor: 'pointer',
                padding: 'var(--space-050, 0.25rem) var(--space-150,0.75rem)',
                width: '7.3125rem',
                boxSizing: 'content-box',
                border: 'none',
                outline: 'none',
                borderRadius: '.5rem',
                color: 'var(--text-normal, rgb(43, 45, 54))',
                backgroundColor: 'transparent',
                fontSize: ' 0.875rem',
                fontWeight: 500,
                lineHeight: ' 1.375rem',
                letterSpacing: '-0.006rem',
                textAlign: 'left',
            }}
        >
            {children}
        </button>
    );
};

// range button, reset button 통일
// 아예 사용자가 관리하거나, 아니면 형태 없이 기능만 관리하거나
