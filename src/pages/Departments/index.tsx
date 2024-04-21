import PageHeader from "@/components/PageHeader";
import { Button } from "@mantine/core";
import { FormattedMessage } from "umi";


export default function Page() {
  return (
    <div>
      <PageHeader title={<FormattedMessage id="pages.departments.header" />} >
        <PageHeader.Right>
          <Button>Button</Button>
        </PageHeader.Right>
        <PageHeader.Content>
          <p>
            <FormattedMessage id="pages.departments.header.content" />
          </p>
        </PageHeader.Content>
      </PageHeader>
    </div>
  );
}
