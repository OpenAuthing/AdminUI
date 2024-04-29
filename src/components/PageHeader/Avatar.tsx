import { Avatar, AvatarProps, Box, Factory, factory, rem } from '@mantine/core';

export interface PageHeaderAvatarProps extends AvatarProps {}

export type PageHeaderAvatarFactory = Factory<{
    props: PageHeaderAvatarProps;
}>;

const PageHeaderAvatar = factory<PageHeaderAvatarFactory>((props, _) => {
    return (
        <Box>
            <Avatar size={rem(64)} {...props} />
        </Box>
    );
});

export default PageHeaderAvatar;
