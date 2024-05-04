export type PropsWithRoleId<P = unknown> = { roleId: string } & P;

export type SelectedItemType = {
    type: 'user' | 'group';
    id: string;
    name: string;
    description: string;
    avatar?: string;
};
