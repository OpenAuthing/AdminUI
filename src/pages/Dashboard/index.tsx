import PageHeader from "@/components/PageHeader"
import { Paper, Tooltip } from "@mantine/core"
import { FormattedMessage } from "umi"
import StatsGrid from "./components/StatsGrid"
import DateRangePicker from "./components/DateRangePicker"
import { LineChart } from '@mantine/charts';
import { CircleHelpIcon } from "lucide-react"
import Content from "@/components/Content"

const data = [
    {
        date: 'Mar 22',
        Apples: 2890,
        Oranges: 2338,
        Tomatoes: 2452,
    },
    {
        date: 'Mar 23',
        Apples: 2756,
        Oranges: 2103,
        Tomatoes: 2402,
    },
    {
        date: 'Mar 24',
        Apples: 3322,
        Oranges: 986,
        Tomatoes: 1821,
    },
    {
        date: 'Mar 25',
        Apples: 3470,
        Oranges: 2108,
        Tomatoes: 2809,
    },
    {
        date: 'Mar 26',
        Apples: 3129,
        Oranges: 1726,
        Tomatoes: 2290,
    },
];

export default () => {
    return (
        <Content>
            <div className="h-[8000px]">
                <div className="grid grid-cols-1 gap-y-6">
                    <PageHeader title={<FormattedMessage id="pages.dashboard.header" />} />
                    <StatsGrid />

                    <div className="flex items-center justify-end">
                        <DateRangePicker />
                    </div>
                    <Paper withBorder p="md" radius="md">
                        <div className="grid grid-cols-1 gap-y-6">
                            <div className="flex gap-x-2 items-center">
                                <h2 className="text-lg text-gray-500 font-medium">Daily Active Users</h2>
                                <Tooltip label="Unique users with a successful authentication or authorization activity.">
                                    <CircleHelpIcon className="size-4 stroke-gray-400" />
                                </Tooltip>
                            </div>
                            <div>
                                <LineChart
                                    h={300}
                                    data={data}
                                    dataKey="date"
                                    series={[
                                        { name: 'Apples', color: 'indigo.6' },
                                        { name: 'Oranges', color: 'blue.6' },
                                        { name: 'Tomatoes', color: 'teal.6' },
                                    ]}
                                    curveType="linear"
                                    tickLine="none"
                                />
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </Content>
    )
}