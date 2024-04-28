import { Factory, factory } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

export interface IconProps
    extends React.PropsWithChildren,
        React.HtmlHTMLAttributes<HTMLDivElement> {}

export type IconFactory = Factory<{
    props: IconProps;
}>;

const Icon = factory<IconFactory>(({ className, children, ...others }, ref) => {
    return (
        <div
            className={clsx('mb-4 flex items-center flex-col text-center', className)}
            {...others}
        >
            {children}
        </div>
    );
});

export default Icon;
