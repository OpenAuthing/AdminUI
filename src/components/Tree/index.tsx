import { Transition } from '@mantine/core';
import classNames from 'classnames';
import { ChevronDown, ChevronRight, LoaderIcon } from 'lucide-react';
import React, { useState } from 'react';

export interface TreeNode {
    key: string;
    title: string;
    parentId: string | null;
    children?: Array<TreeNode>;
}

export interface TreeProps {
    treeData?: Array<TreeNode>;

    className?: string;
    /**
     * 异步加载数据
     * @returns
     */
    onLoadData?: (node: TreeNode) => Promise<void>;

    /**
     * 点击节点触发
     * @returns
     */
    onSelect?: (node: TreeNode) => void;

    /**
     * 展开/收缩时触发
     * @param node
     * @param expanded
     * @returns
     */
    onExpand?: (node: TreeNode, expanded: boolean) => void;

    /**
     * (受控)选中的key
     */
    selectedKey?: string;

    /**
     * （受控）展开的key集合
     */
    expandedKeys?: Set<string>;

    renderMoreMenu?: (node: TreeNode, selected: boolean) => React.ReactNode;
}

export interface TreeNodeProps {
    current: TreeNode;

    level: number;

    /**
     * 异步加载数据
     * @returns
     */
    onLoadData?: (node: TreeNode) => Promise<void>;

    /**
     * 点击节点触发
     * @returns
     */
    onSelect?: (node: TreeNode) => void;

    /**
     * 展开/收缩时触发
     * @param node
     * @param expanded
     * @returns
     */
    onExpand?: (node: TreeNode, expanded: boolean) => void;

    /**
     * (受控)选中的key
     */
    selectedKey?: string;

    /**
     * （受控）展开的key集合
     */
    expandedKeys?: Set<string>;

    renderMoreMenu?: (node: TreeNode, selected: boolean) => React.ReactNode;
}

const TreeNodeItem = ({
    current,
    level,
    expandedKeys,
    selectedKey,
    renderMoreMenu,
    onExpand,
    onLoadData,
    onSelect,
}: TreeNodeProps) => {
    const [isLoading, setLoading] = useState(false);

    const onItemClick = (node: TreeNode) => {
        if (selectedKey === node.key) return;

        onSelect && onSelect(node);
    };

    const onItemExpand = async (node: TreeNode) => {
        setLoading(true);
        try {
            const expanded = !(expandedKeys?.has(node.key) ?? false);

            console.log('expanded', expanded);

            console.log(expandedKeys);
            if (onLoadData && expanded) {
                await onLoadData(node);
            }

            onExpand && onExpand(node, expanded);
        } finally {
            setLoading(false);
        }
    };

    const currentExpanded = expandedKeys?.has(current.key) ?? false;
    const currentSeleted = !!selectedKey && selectedKey === current.key;

    return (
        <>
            <div
                aria-selected={currentSeleted}
                className={classNames(
                    'h-[38px] flex items-center hover:bg-gray-100 px-2 rounded cursor-pointer mb-1 transition-colors group',
                    'aria-selected:bg-blue-600 aria-selected:text-white',
                )}
                title={current.title}
            >
                <div
                    className="flex-1 flex items-center h-full"
                    onClick={() => onItemClick(current)}
                >
                    {level > 1 &&
                        new Array(level - 1)
                            .fill([])
                            .map((_, index) => (
                                <span key={index} className="w-4"></span>
                            ))}
                    <button
                        className="w-5 h-5 flex items-center justify-center mr-1"
                        onClick={async () => await onItemExpand(current)}
                    >
                        {isLoading ? (
                            <LoaderIcon className="w-4 h-4 animate-spin" />
                        ) : currentExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>
                    <span className="flex-1 truncate ... text-sm font-medium">
                        {current.title}{' '}
                    </span>
                </div>
                {renderMoreMenu && renderMoreMenu(current, currentSeleted)}
            </div>

            {(current.children?.length ?? 0) > 0 &&
                current.children!.map((node) => (
                    <Transition
                        key={node.key}
                        mounted={currentExpanded}
                        keepMounted={true}
                        transition={{
                            in: { gridTemplateRows: '1fr', opacity: 1 },
                            out: { gridTemplateRows: '0fr', opacity: 0 },
                            transitionProperty: 'grid-template-rows',
                        }}
                        duration={200}
                    >
                        {(style) => (
                            <div
                                style={{ ...style }}
                                className="grid grid-rows-[0fr] opacity-0"
                            >
                                <div className="">
                                    <TreeNodeItem
                                        key={node.key}
                                        current={node}
                                        level={level + 1}
                                        expandedKeys={expandedKeys}
                                        selectedKey={selectedKey}
                                        onExpand={onExpand}
                                        onLoadData={onLoadData}
                                        onSelect={onSelect}
                                        renderMoreMenu={renderMoreMenu}
                                    />
                                </div>
                            </div>
                        )}
                    </Transition>
                ))}
        </>
    );
};

const Tree: React.FC<TreeProps> = (props) => {
    const { treeData, className } = props;

    const isEmpty = (treeData?.length ?? 0) <= 0;

    return (
        <div className={classNames('relative', className)}>
            <div>
                {treeData &&
                    treeData.map((node) => (
                        <TreeNodeItem
                            key={node.key}
                            {...props}
                            current={node}
                            level={1}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Tree;
