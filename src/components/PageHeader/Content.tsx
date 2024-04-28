import { Factory, factory } from '@mantine/core';
import PageHeaderTitle from './Title';

export interface PageHeaderContentProps {
    children?: React.ReactNode;
}

export type PageHeaderContentFactory = Factory<{
    props: PageHeaderContentProps;
    staticComponents: {
        Title: typeof PageHeaderTitle;
    };
}>;

const PageHeaderContent = factory<PageHeaderContentFactory>(({ children }, _) => {
    return <div className="flex-1 p-2 gap-2">{children}</div>;
});

export default PageHeaderContent;
