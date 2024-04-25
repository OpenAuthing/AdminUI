import { Factory, factory } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

export interface SubtitleProps
    extends React.PropsWithChildren,
        React.HtmlHTMLAttributes<HTMLHeadingElement> {}

export type SubtitleFactory = Factory<{
    props: SubtitleProps;
}>;

const Subtitle = factory<SubtitleFactory>(
    ({ className, children, ...others }, ref) => {
        return (
            <h4
                className={clsx('mb-2 font-medium text-2xl', className)}
                {...others}
            >
                {children}
            </h4>
        );
    },
);

export default Subtitle;
