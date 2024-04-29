import {
    Badge,
    Box,
    Flex,
    Group,
    LoadingOverlay,
    SimpleGrid,
    Text,
    UnstyledButton,
    rem,
} from '@mantine/core';
import React from 'react';
import { FormattedDate, useIntl } from 'umi';
import { PropsWithUserId } from '.';

type DetailsFieldProps = React.PropsWithChildren<{
    label: React.ReactNode;
}>;
const DetailsField: React.FC<DetailsFieldProps> = ({ label, children }) => {
    return (
        <Flex direction="column" gap={rem(4)}>
            <Text size="xs" fw={500} c="gray.7">
                {label}
            </Text>
            <Box>{children}</Box>
        </Flex>
    );
};

type UserDetailsProps = PropsWithUserId<{}>;

export default ({ userId }: UserDetailsProps) => {
    const intl = useIntl();
    return (
        <Box pos="relative" mih={500}>
            <LoadingOverlay visible={false} />
            <Flex className="border rounded-md" p={rem(24)} direction="column" gap={rem(24)}>
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing={rem(24)}>
                    <DetailsField label="Nickname">
                        <Flex direction="column" gap={rem(4)}>
                            <Text size="sm">插卡机</Text>
                            <UnstyledButton className="flex items-center text-primary-500">
                                <Text size="xs">Edit</Text>
                            </UnstyledButton>
                        </Flex>
                    </DetailsField>
                    <DetailsField label="Email">
                        <Flex direction="column" gap={rem(4)}>
                            <Group>
                                <Text size="sm">5212345642132@outlook.com</Text>
                                <Badge color="green.8" size="xs">
                                    Verified
                                </Badge>
                            </Group>
                            <UnstyledButton className="flex items-center text-primary-500">
                                <Text size="xs">Edit</Text>
                            </UnstyledButton>
                        </Flex>
                    </DetailsField>
                    <DetailsField label="Phone">
                        <Flex direction="column" gap={rem(4)}>
                            <Group>
                                <Text size="sm">13000000000</Text>
                                <Badge color="green.8" size="xs">
                                    Verified
                                </Badge>
                            </Group>
                            <UnstyledButton className="flex items-center text-primary-500">
                                <Text size="xs">Edit</Text>
                            </UnstyledButton>
                        </Flex>
                    </DetailsField>
                    <DetailsField label="Creation Time">
                        <Text size="sm">
                            <FormattedDate
                                value="2024-03-01 15:56:12"
                                year="numeric"
                                month="long"
                                day="numeric"
                                hour="2-digit"
                                minute="2-digit"
                                second="2-digit"
                                hour12
                            />
                        </Text>
                    </DetailsField>
                </SimpleGrid>
            </Flex>
        </Box>
    );
};
