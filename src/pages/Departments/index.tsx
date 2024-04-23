import PageHeader from "@/components/PageHeader";
import Tree from "@/components/Tree";
import { ActionIcon, Button, Container, ScrollArea, Input, Tooltip, rem } from "@mantine/core";
import { Plus, SearchIcon } from "lucide-react";
import { FormattedMessage } from "umi";


export default () => {
    return (
        <Container size={rem(1580)} pt={rem(40)} pb={rem(48)} h="calc(100vh - 56px)">
            <div className="w-full h-full max-w-full max-h-full overflow-hidden flex flex-col gap-y-8">
                <PageHeader title={<FormattedMessage id="pages.departments.header" />} >
                    <PageHeader.Content>
                        <FormattedMessage id="pages.departments.header.content" />
                    </PageHeader.Content>

                    <PageHeader.Actions>
                        <Button>Button</Button>
                    </PageHeader.Actions>
                </PageHeader>
                <div className="flex gap-8 w-full flex-1 overflow-y-hidden border rounded-lg bg-white">
                    <div className="flex flex-col gap-y-4 border-r overflow-y-hidden p-4">
                        <div className="flex gap-x-0.5 h-8 w-full items-center justify-start">
                            <Input className="flex-1"
                                type="search"
                                placeholder="Search"
                                leftSection={<SearchIcon className="size-4" />} />
                            <Tooltip label="Create department">
                                <ActionIcon size="lg" variant="white">
                                    <Plus className="size-5" />
                                </ActionIcon>
                            </Tooltip>
                        </div>
                        <ScrollArea className="flex-1 w-full">
                            <Tree treeData={[{
                                key: "string",
                                title: "string",
                                parentId: null,
                                children: []
                            }]} />
                        </ScrollArea>
                    </div>
                    <div className="flex-1 px-6 py-4">
                        <div>
                            asfsdfdsf
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
