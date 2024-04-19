import PageHeader from "@/components/PageHeader"
import { Button } from "@mantine/core"

export default () => {
    return (
        <div className="h-[8000px]">
            <PageHeader title="Dashboard" >
                <PageHeader.Right>
                    <Button>Button</Button>
                </PageHeader.Right>
                <PageHeader.Content>
                    <p>asdgdshfdhgfhgdfdsfsfdf</p>
                </PageHeader.Content>
            </PageHeader>
        </div>
    )
}