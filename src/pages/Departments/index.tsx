import PageHeader from '@/components/PageHeader';
import Tree, { TreeNode } from '@/components/Tree';
import {
    ActionIcon,
    Container,
    Input,
    LoadingOverlay,
    Menu,
    ScrollArea,
    Text,
    Tooltip,
    rem,
} from '@mantine/core';
import { useDisclosure, useSet } from '@mantine/hooks';
import cx from 'clsx';
import { MoreHorizontalIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormattedMessage, Icon, useModel } from 'umi';
import MembersTable from './components/MembersTable';

const DepartmentMenu = ({ node, selected }: { node: TreeNode; selected: boolean }) => {
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
                        className={cx(
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
    const [departmentTreeScrolled, setDepartmentTreeScrolled] = useState<boolean>(false);
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    const expandedKeys = useSet<string>([]);

    const {
        loading: isLoadingRootDepartment,
        departmentTree,
        getDepartments,
    } = useModel('Departments.department');

    useEffect(() => {
        getDepartments();
    }, []);

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
                    {/* <PageHeader.Actions>
                        <Button>Button</Button>
                    </PageHeader.Actions> */}
                </PageHeader>

                <div className="flex gap-8 w-full flex-1 overflow-hidden">
                    <div className="flex flex-col border-r overflow-hidden w-80 min-w-80">
                        <div
                            className={cx(
                                'flex gap-x-0.5 w-full items-center justify-start px-4 pb-4 transition-shadow',
                                { 'shadow-md': departmentTreeScrolled },
                            )}
                        >
                            <Input
                                className="flex-1"
                                type="search"
                                placeholder="Search"
                                leftSection={<SearchIcon className="size-4" />}
                            />
                            <Tooltip label="Create department">
                                <ActionIcon size="lg" variant="white">
                                    <PlusIcon className="size-5" />
                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <ScrollArea
                            className="flex-1 w-full"
                            pos="relative"
                            px={rem(16)}
                            maw="100%"
                            scrollbars="xy"
                            onScrollPositionChange={({ x, y }) =>
                                setDepartmentTreeScrolled(y !== 0)
                            }
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
                                    <DepartmentMenu node={node} selected={selected} />
                                )}
                                treeData={departmentTree}
                            />
                        </ScrollArea>
                    </div>
                    <div className="flex-1 w-full h-full max-w-full max-h-full overflow-hidden">
                        <div className="flex gap-y-2 w-full h-full flex-col overflow-hidden">
                            {selectedNode ? (
                                <MembersTable
                                    departmentId={selectedNode?.key}
                                    departmentName={selectedNode?.title}
                                />
                            ) : (
                                <div className="flex flex-col h-full pt-12">
                                    <Icon
                                        icon="local:arrow-1"
                                        height="100"
                                        width="200"
                                        stroke="var(--mantine-color-gray-5)"
                                    />
                                    <Text pl={rem(120)} c="gray.6" size="sm">
                                        <FormattedMessage id="pages.departments.noselected" />
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
