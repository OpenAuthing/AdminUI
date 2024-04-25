import { Factory, factory } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

export interface ActionsProps
    extends React.PropsWithChildren,
        React.HtmlHTMLAttributes<HTMLDivElement> {}

export type ActionsFactory = Factory<{
    props: ActionsProps;
}>;

const Actions = factory(({ children, className, ...others }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'flex items-center justify-center text-center gap-2',
                className,
            )}
            {...others}
        >
            {children}
        </div>
    );
});

export default Actions;
