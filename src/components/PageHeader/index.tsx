import React from "react"

type PageHeaderProps = {
    title: React.ReactNode
} & React.PropsWithChildren

const PageHeader = ({
    title, children
}: PageHeaderProps) => {
    let right = null;
    let content = null;

    React.Children.toArray(children).forEach(child => {
        if (!React.isValidElement(child)) return

        if (child.type === PageHeaderRight) {
            right = child;
        } else if (child.type === PageHeaderContent) {
            content = child;
        }
    });


    return (
        <div className="flex justify-between items-center gap-x-4">
            <div className="flex-1 space-y-2 p-2">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <div className="text-sm text-gray-500">
                    {content}
                </div>
            </div>
            <div>
                {right}
            </div>
        </div>
    )
}

const PageHeaderRight: React.FC<React.PropsWithChildren> = ({ children }) => children
const PageHeaderContent: React.FC<React.PropsWithChildren> = ({ children }) => children

PageHeader.Right = PageHeaderRight
PageHeader.Content = PageHeaderContent


export default PageHeader