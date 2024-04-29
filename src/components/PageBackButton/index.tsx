import { Group, Text, rem } from '@mantine/core';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'umi';

interface PageBackButtonProps {
    text: string;
    backTo: string;
}

const PageBackButton: React.FC<PageBackButtonProps> = ({ text, backTo }) => {
    return (
        <Link to={backTo}>
            <Group
                gap={rem(8)}
                className="inline-flex text-gray-400 hover:text-gray-600 transition-colors"
            >
                <ArrowLeftIcon className="size-4" />
                <Text size="sm" fw={500}>
                    {text}
                </Text>
            </Group>
        </Link>
    );
};

export default PageBackButton;
