import { Factory, factory } from '@mantine/core';

export interface PageHeaderDescriptionProps extends React.PropsWithChildren {}

export type PageHeaderDescription = Factory<{
    props: PageHeaderDescriptionProps;
}>;

export default factory<PageHeaderDescription>(({ children }, _) => {
    return <div className="text-sm text-gray-500">{children}</div>;
});
