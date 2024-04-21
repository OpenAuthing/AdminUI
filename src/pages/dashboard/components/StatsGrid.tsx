import { Group, Paper, SimpleGrid, ThemeIcon, Text } from "@mantine/core";
import { ArrowDownRightIcon, ArrowUpRightIcon, BoxesIcon, UserPlusIcon, UsersIcon } from "lucide-react";

const icons = {
    user: UserPlusIcon,
    users: UsersIcon,
    boxs: BoxesIcon
};

const data = [
    { title: 'Total User', icon: 'users', value: '13,456', diff: 34 },
    { title: 'Applications', icon: 'boxs', value: '4,145', diff: -13 },
    { title: 'New User', icon: 'user', value: '188', diff: -30 },
] as const;

function StatsGrid() {
    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? ArrowUpRightIcon : ArrowDownRightIcon;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group justify="space-between">
                    <Text size="xs" c="dimmed" className="font-bold uppercase">
                        {stat.title}
                    </Text>
                    <Icon className="size-6 stroke-gray-400" />
                </Group>

                <Group align="flex-end" gap="xs" mt={25}>
                    <Text className="text-2xl font-bold leading-none">{stat.value}</Text>
                </Group>

                <Text fz="xs" c="dimmed" mt={7}>
                    Compared to previous month
                </Text>
            </Paper>
        );
    });

    return (
        <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    );
}

export default StatsGrid