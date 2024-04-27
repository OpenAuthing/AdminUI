import { Box } from '@mantine/core';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = {
    className?: string;
} & PropsWithChildren;

export default ({ children, className }: Props) => {
    return (
        <div
            className={clsx(
                'xl:max-w-content mx-auto px-6 pt-10 pb-12',
                className,
            )}
        >
            <Box h="calc(100% - 88px)" className="overflow-hidden">
                {children}
            </Box>
        </div>
    );
};
