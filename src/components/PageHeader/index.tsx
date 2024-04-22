import { Space } from "@mantine/core";
import React from "react"

type PageHeaderProps = {
    title: React.ReactNode
} & React.PropsWithChildren

const PageHeader = ({
    title, children
}: PageHeaderProps) => {
    let actions = null;
    let content = null;

    React.Children.toArray(children).forEach(child => {
        if (!React.isValidElement(child)) return

        if (child.type === PageHeaderActions) {
            actions = child;
        } else if (child.type === PageHeaderContent) {
            content = child;
        }
    });


    return (
        <div className="flex justify-between items-center gap-x-4">
            <div className="flex-1 p-2">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <Space h="md" />
                <div className="text-sm text-gray-500">
                    {content}
                </div>
            </div>
            <div>
                {actions}
            </div>
        </div>
    )
}

const PageHeaderActions: React.FC<React.PropsWithChildren> = ({ children }) => children
const PageHeaderContent: React.FC<React.PropsWithChildren> = ({ children }) => children

PageHeader.Actions = PageHeaderActions
PageHeader.Content = PageHeaderContent


export default PageHeader