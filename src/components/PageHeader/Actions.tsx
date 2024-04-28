import { Box, Factory, factory } from '@mantine/core';

export interface PageHeaderActionsProps {
    children?: React.ReactNode;
}

export type PageHeaderActionsFactory = Factory<{
    props: PageHeaderActionsProps;
}>;

const PageHeaderActions = factory<PageHeaderActionsFactory>(({ children }, _) => {
    return <Box>{children}</Box>;
});

export default PageHeaderActions;
