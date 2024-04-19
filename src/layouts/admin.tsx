import Logo from "@/components/logo"
import { NavLink } from "@mantine/core"
import { Link, Outlet, useAppData } from "umi"
import { IconChartDots2 } from '@tabler/icons-react'
import { useEffect, useState } from "react"


const NavMenu = () => {
    // get all routes from the react router
    const { routes } = useAppData()
    const [menuTree, setMenuTree] = useState<any[]>([])

    useEffect(() => {

        const menus: any[] = []
        for (const key in routes) {
            const route: any = routes[key]
            if (route.menu) {
                menus.push({
                    parent: route.parent,
                    path: route.path,
                    ...route.menu
                })
            }
        }
        // 将 menus 转换为树形结构
        const menuTree = menus.reduce((acc, cur) => {
            if (!cur.parent) {
                acc.push(cur)
            } else {
                const parent = acc.find((item: any) => item.label === cur.parent)
                if (parent) {
                    if (!parent.children) {
                        parent.children = []
                    }
                    parent.children.push(cur)
                }
            }
            return acc
        }, [])

        setMenuTree(menuTree)
    }, [routes])

    console.log(menuTree)

    // menu 中 icon 存的是 icon 的名称，这里需要转换成 icon 组件，这里使用的是 tabler icons
    // 优化以下代码，不需要每次都 require 一次
    const getIcon = (icon: string) => {
        const iconComponent = require(`@tabler/icons-react/${icon}`).default
        return iconComponent
    }


    return (
        <aside
            className="flex-[0_0_auto] h-full mr-[28px] xl:mr-[265px] xl:transition-[margin] z-10 will-change-[margin]">
            <div
                className="w-[265px] overflow-x-hidden overflow-y-auto fixed left-0 top-0 bottom-0 flex flex-col justify-start h-auto bg-gray-50 border-r border-r-gray-100 shadow-[rgba(0,0,0,0.1)_16px_0px_16px] xl:shadow-none transition-[width_shadow] will-change-[width_shadow]">
                <Link to="/admin">
                    <div className="pl-8 pr-3 py-5">
                        <Logo />
                    </div>
                </Link>
                <nav className="flex-1 px-4 overflow-x-hidden overflow-y-auto">
                    <NavLink
                        className="text-base font-medium text-gray-700 transition-colors hover:text-primary-600 data-[active=true]:text-primary-600"
                        href="/admin/dashboard"
                        label="Dashboard"
                        leftSection={<IconChartDots2 size="1rem" stroke={1.5} />}
                        active
                    />
                    <NavLink
                        className="text-base font-medium"
                        href="#required-for-focus"
                        label="First parent link"
                        leftSection={<IconChartDots2 size="1rem" stroke={1.5} />}
                        childrenOffset={28}
                    >
                        <NavLink href="#required-for-focus" label="First child link" />
                        <NavLink label="Second child link" href="#required-for-focus" />
                        <NavLink label="Nested parent link" childrenOffset={28} href="#required-for-focus">
                            <NavLink label="First child link" href="#required-for-focus" />
                            <NavLink label="Second child link" href="#required-for-focus" />
                            <NavLink label="Third child link" href="#required-for-focus" />
                        </NavLink>
                    </NavLink>

                    <NavLink
                        href="#required-for-focus"
                        label="Second parent link"
                        // leftSection={<IconFingerprint size="1rem" stroke={1.5} />}
                        childrenOffset={28}
                        defaultOpened
                    >
                        <NavLink label="First child link" href="#required-for-focus" />
                        <NavLink label="Second child link" href="#required-for-focus" />
                        <NavLink label="Third child link" href="#required-for-focus" />
                    </NavLink>
                </nav>
            </div>
        </aside>
    )
}


const AdminLayout = () => {

    return (
        <div className="w-screen h-screen max-w-full flex items-center flex-col">
            <div className="h-full w-full flex items-start">
                <NavMenu />
                <div className="w-full">
                    {/* <AdminHeader /> */}
                    <div className="flex-1 overflow-hidden xl:container xl:mx-auto p-8 py-5">
                        <div className="h-full min-w-[780px] w-full max-w-full overflow-auto">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout