import PageHeader from "@/components/PageHeader";
import { Button } from "@mantine/core";
import { FormattedMessage } from "umi";


export default function Page() {
    return (
        <div>
            <PageHeader title={<FormattedMessage id="pages.departments.header" />} >
                <PageHeader.Content>
                    <FormattedMessage id="pages.departments.header.content" />
                </PageHeader.Content>

                <PageHeader.Actions>
                    <Button>Button</Button>
                </PageHeader.Actions>
            </PageHeader>
        </div>
    );
}
