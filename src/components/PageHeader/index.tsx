import { Factory, factory, useProps } from '@mantine/core';
import { useId } from '@mantine/hooks';
import React from 'react';
import PageHeaderActions from './Actions';
import PageHeaderContent from './Content';
import PageHeaderDescription from './Description';
import PageHeaderTitle from './Title';

export interface PageHeaderProps {
    children?: React.ReactNode;
    id?: string;
}

export type PageHeaderFactory = Factory<{
    props: PageHeaderProps;
    ref: HTMLDivElement | null;
    staticComponents: {
        Title: typeof PageHeaderTitle;
        Description: typeof PageHeaderDescription;
        Content: typeof PageHeaderContent;
        Actions: typeof PageHeaderActions;
    };
}>;

const defaultProps: Partial<PageHeaderProps> = {};

const PageHeader = factory<PageHeaderFactory>((_props, ref) => {
    const props = useProps('PageHeader', defaultProps, _props);
    const { children, id, ...others } = props;

    const uid = useId(id);

    return (
        <div ref={ref} id={uid} className="flex justify-between items-center gap-x-4" {...others}>
            {children}
        </div>
    );
});

PageHeader.Title = PageHeaderTitle;
PageHeader.Description = PageHeaderDescription;
PageHeader.Content = PageHeaderContent;
PageHeader.Actions = PageHeaderActions;

export default PageHeader;
