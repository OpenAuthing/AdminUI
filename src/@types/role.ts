import { RoleSubjectType } from '.';

export interface ListRoleRes {
    id: string;
    name: string;
    description: string;
    isSystemBuiltIn: boolean;
    enabled: boolean;
    creationTime: string;
}

export interface GetRoleRes {
    id: string;
    name: string;
    description: string;
    isSystemBuiltIn: boolean;
    enabled: boolean;
    creationTime: string;
}

export interface CreateRoleReq {
    name: string;
    description: string;
}

export interface ListRoleSubjectRes {
    id: string;
    subjectType: RoleSubjectType;
    name: string;
}
