import { PropsWithChildren } from "react"

type Props = {
} & PropsWithChildren

export default ({ children }: Props) => {

    return (
        <div className="xl:max-w-content mx-auto px-6 pt-10 pb-12">
            {children}
        </div>
    )
}