import { Factory, factory, useProps } from '@mantine/core';
import clsx from 'clsx';
import Actions from './Actions';
import Content from './Content';
import Icon from './Icon';
import Message from './Message';
import Subtitle from './Subtitle';

export interface EmptyStateProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export type EmptyStateFactory = Factory<{
    props: EmptyStateProps;
    ref: HTMLDivElement | null;
    staticComponents: {
        Icon: typeof Icon;
        Subtitle: typeof Subtitle;
        Content: typeof Content;
        Message: typeof Message;
        Actions: typeof Actions;
    };
}>;

const defaultProps: Partial<EmptyStateProps> = {};

const EmptyState = factory<EmptyStateFactory>((_props, ref) => {
    const props = useProps('EmptyState', defaultProps, _props);

    const { className, children, ...others } = props;

    return (
        <div
            ref={ref}
            className={clsx(
                'flex flex-col items-center justify-center w-full h-full',
                'rounded-lg border p-10 overflow-hidden]',
                className,
            )}
        >
            {children}
        </div>
    );
});

EmptyState.Icon = Icon;
EmptyState.Subtitle = Subtitle;
EmptyState.Content = Content;
EmptyState.Message = Message;
EmptyState.Actions = Actions;

export default EmptyState;
