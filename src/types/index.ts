export interface ResponseResultWithT<TData> {
    success: boolean
    code: number
    errorMessage?: string,
    data?: TData
}

export interface ResponseResult extends ResponseResultWithT<any> { }


export type MenuIconType = "Key" | "Dashboard" | "Settings" | "Network" | "ShieldCheckIcon" | "MonitorSmartphone" | "Palette" | "Fingerprint"