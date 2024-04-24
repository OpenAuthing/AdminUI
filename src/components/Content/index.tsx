import { ScrollArea } from '@mantine/core';
import { PropsWithChildren } from 'react';

type Props = {} & PropsWithChildren;

export default ({ children }: Props) => {
    return (
        <div className="xl:max-w-content mx-auto px-6 pt-10 pb-12">
            <ScrollArea h="calc(100% - 88px)" scrollbars="y">
                {children}
            </ScrollArea>
        </div>
    );
};
