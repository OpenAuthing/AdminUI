import PageHeader from '@/components/PageHeader';
import Tree, { TreeNode } from '@/components/Tree';
import {
    ActionIcon,
    Button,
    Container,
    Input,
    LoadingOverlay,
    Menu,
    ScrollArea,
    Tooltip,
    rem,
} from '@mantine/core';
import { useDisclosure, useSet } from '@mantine/hooks';
import classNames from 'classnames';
import { MoreHorizontalIcon, Plus, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { FormattedMessage, useModel } from 'umi';

const DepartmentMenu = ({
    node,
    selected,
}: {
    node: TreeNode;
    selected: boolean;
}) => {
    const [opened, { close, open }] = useDisclosure(false);

    return (
        <Menu
            opened={opened}
            onClose={close}
            onOpen={open}
            width={rem(200)}
            position="bottom-start"
        >
            <Menu.Target>
                <ActionIcon unstyled>
                    <MoreHorizontalIcon
                        className={classNames(
                            'size-5 stroke-gray-400',
                            opened ? 'block' : 'hidden group-hover:block',
                        )}
                    />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item>1</Menu.Item>
                <Menu.Item>1</Menu.Item>
                <Menu.Item>1</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default () => {
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    const expandedKeys = useSet<string>([]);

    const {
        loading: isLoadingRootDepartment,
        departmentTree,
        getDepartments,
    } = useModel('Departments.department');

    // 部门切换时
    const onSelect = (node: TreeNode) => {
        setSelectedNode(node);
    };

    // 处理展开/折叠操作
    const onExpand = (node: TreeNode, expanded: boolean) => {
        if (expanded) {
            expandedKeys.add(node.key);
        } else {
            expandedKeys.delete(node.key);
        }
    };

    // 加载子部门列表
    const loadChildDepartments = async ({ key, children }: TreeNode) => {
        if (children) return;

        await getDepartments(key);
    };

    return (
        <Container
            size={rem(1580)}
            pt={rem(40)}
            pb={rem(48)}
            h="calc(100vh - var(--app-shell-header-height, 0rem))"
        >
            <div className="w-full h-full max-w-full max-h-full overflow-hidden flex flex-col gap-y-8">
                <PageHeader>
                    <PageHeader.Content>
                        <PageHeader.Title>
                            <FormattedMessage id="pages.departments.header" />
                        </PageHeader.Title>
                        <PageHeader.Description>
                            <FormattedMessage id="pages.departments.header.content" />
                        </PageHeader.Description>
                    </PageHeader.Content>
                    <PageHeader.Actions>
                        <Button>Button</Button>
                    </PageHeader.Actions>
                </PageHeader>

                <div className="flex gap-8 w-full flex-1 overflow-y-hidden">
                    <div className="flex flex-col gap-y-4 border-r overflow-hidden w-80">
                        <div className="flex gap-x-0.5 w-full items-center justify-start px-4">
                            <Input
                                className="flex-1"
                                type="search"
                                placeholder="Search"
                                leftSection={<SearchIcon className="size-4" />}
                            />
                            <Tooltip label="Create department">
                                <ActionIcon size="lg" variant="white">
                                    <Plus className="size-5" />
                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <ScrollArea
                            className="flex-1 w-full"
                            pos="relative"
                            px={rem(16)}
                            maw={rem(320)}
                            scrollbars="xy"
                        >
                            <LoadingOverlay
                                visible={isLoadingRootDepartment}
                                zIndex={1000}
                                overlayProps={{ radius: 'sm', blur: 2 }}
                            />
                            <Tree
                                onSelect={onSelect}
                                onLoadData={loadChildDepartments}
                                onExpand={onExpand}
                                selectedKey={selectedNode?.key}
                                expandedKeys={expandedKeys}
                                renderMoreMenu={(node, selected) => (
                                    <DepartmentMenu
                                        node={node}
                                        selected={selected}
                                    />
                                )}
                                treeData={departmentTree}
                            />
                        </ScrollArea>
                    </div>
                    <div className="flex-1 px-6 py-4">
                        <div>asfsdfdsf</div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
