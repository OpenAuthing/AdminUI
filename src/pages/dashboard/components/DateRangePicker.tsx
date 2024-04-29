import { Button, Popover, Text, UnstyledButton } from '@mantine/core';
import { DatePicker, DatesRangeValue } from '@mantine/dates';
import { CalendarDaysIcon, ChevronDownIcon } from 'lucide-react';

type DateRangeType = 'last-30-days' | 'last-7-days' | 'last-14-days' | 'custom';

const DateRangeOptions = [
    { type: 'custom', label: 'Custom Range', disabled: true },
    { type: 'last-7-days', label: 'Last 7 Days' },
    { type: 'last-14-days', label: 'Last 14 Days' },
    { type: 'last-30-days', label: 'Last 30 Days' },
];

const DateRangeList = ({ value }: { value: DateRangeType }) => {
    return (
        <div className="w-full">
            {DateRangeOptions.map((option) => {
                const checked = value === option.type;
                return (
                    <UnstyledButton
                        key={option.type}
                        disabled={option.disabled}
                        aria-checked={checked}
                        className="px-4 py-2.5 w-full hover:bg-gray-100/80 disabled:pointer-events-none disabled:opacity-50  aria-checked:bg-primary-50 aria-checked:text-primary-500"
                    >
                        <Text size="sm">{option.label}</Text>
                    </UnstyledButton>
                );
            })}
        </div>
    );
};

type DateRangePickerProps = {};

const DateRangePicker = (props: DateRangePickerProps) => {
    const handleDateRangeChanged = (value: DatesRangeValue) => {
        console.log(value);
    };

    return (
        <Popover position="bottom-end" offset={0} shadow="lg" withinPortal={false}>
            <Popover.Target>
                <UnstyledButton className="flex items-center gap-x-2 px-3 py-2 rounded-md border border-solid text-gray-600 border-gray-300">
                    <CalendarDaysIcon className="size-4" />
                    <Text size="sm">Last 30 Days</Text>
                    <ChevronDownIcon className="size-4" />
                </UnstyledButton>
            </Popover.Target>
            <Popover.Dropdown className="border border-gray-200 px-0 py-2">
                <div>
                    <div className="grid grid-cols-[175px_minmax(0px,2fr)] gap-x-8">
                        <div className="py-2">
                            <DateRangeList value="custom" />
                        </div>
                        <div className="pt-2 pb-4 px-4 grid grid-cols-1 gap-y-6">
                            <DatePicker
                                withCellSpacing={false}
                                type="range"
                                size="md"
                                maxLevel="month"
                                onChange={handleDateRangeChanged}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4">
                        <Button size="sm" variant="link">
                            Apply
                        </Button>
                    </div>
                </div>
            </Popover.Dropdown>
        </Popover>
    );
};

export default DateRangePicker;
