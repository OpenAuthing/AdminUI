import { Factory, factory } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

export interface ContentProps
    extends React.PropsWithChildren,
        React.HtmlHTMLAttributes<HTMLDivElement> {}

export type ContentFactory = Factory<{
    props: ContentProps;
    ref: HTMLDivElement | null;
    staticComponents: {};
}>;

const Content = factory<ContentFactory>((props, ref) => {
    const { children, className, ...others } = props;
    return (
        <div
            className={clsx('grid grid-cols-1 gap-4 max-w-[500px] mx-auto my-0', className)}
            ref={ref}
            {...others}
        >
            {children}
        </div>
    );
});

export default Content;
