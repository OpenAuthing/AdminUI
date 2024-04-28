import { TreeNode } from '@/components/Tree';
import DepartmentService from '@/services/department.service';
import { useState } from 'react';

const addChildrenToTree = (tree: TreeNode[], parentId: string, children: TreeNode[]) => {
    if (typeof parentId === 'undefined' || parentId === '' || parentId === null) return children;
    return tree.map((node) => {
        if (node.key === parentId) {
            node.children = children;
        } else if (node.children) {
            node.children = addChildrenToTree(node.children, parentId, children);
        }
        return node;
    });
};

export default () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [departmentTree, setDepartmentTree] = useState<TreeNode[]>([]);

    const getDepartments = async (parentId?: string) => {
        let tree: TreeNode[] = [];

        if (parentId) {
            const data = await DepartmentService.getChildren(parentId);
            let children = data?.map((x: any) => ({
                ...x,
                key: x.id,
                title: x.name,
            }));
            tree = addChildrenToTree(departmentTree as TreeNode[], parentId, children || []);
        } else {
            setLoading(true);

            try {
                const data = await DepartmentService.getChildren();

                tree =
                    data?.map((x: any) => ({ ...x, key: x.id, title: x.name } as TreeNode)) ??
                    ([] as TreeNode[]);
                setDepartmentTree(tree);
            } finally {
                setLoading(false);
            }
        }
        setDepartmentTree(tree);
    };

    return {
        loading,
        departmentTree,
        getDepartments,
    };
};
