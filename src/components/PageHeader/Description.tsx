import { Factory, factory } from '@mantine/core';
import clsx from 'clsx';

export interface PageHeaderDescriptionProps {
    children?: React.ReactNode;
    className?: string;
}

export type PageHeaderDescription = Factory<{
    props: PageHeaderDescriptionProps;
}>;

const Description = factory<PageHeaderDescription>(({ children, className }, _) => {
    return <div className={clsx('text-sm text-gray-500 max-w-4xl', className)}>{children}</div>;
});

export default Description;
