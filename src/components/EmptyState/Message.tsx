import { Factory, Text, factory, rem } from '@mantine/core';
import React from 'react';

export interface MessageProps extends React.PropsWithChildren {}

export type MessageFactory = Factory<{
    props: MessageProps;
}>;

const Message = factory<MessageFactory>(({ children, ...others }, ref) => {
    return (
        <Text
            mb={rem(8)}
            size="sm"
            c="gray.6"
            ta="center"
            lh="1.5rem"
            {...others}
        >
            {children}
        </Text>
    );
});

export default Message;
