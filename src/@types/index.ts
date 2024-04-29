export interface ResponseResultWithT<TData> {
    success: boolean;
    code: number;
    errorMessage?: string;
    data?: TData;
}

export interface ResponseResult extends ResponseResultWithT<any> {}

export type MenuIconType =
    | 'Sparkles'
    | 'Key'
    | 'Dashboard'
    | 'Settings'
    | 'Network'
    | 'ShieldCheckIcon'
    | 'MonitorSmartphone'
    | 'Palette'
    | 'Fingerprint';

export type PaginitionReqParams = {
    current: number;
    pageSize: number;
};

export enum RoleSubjectType {
    User = 0,
    UserGroup = 1,
}
