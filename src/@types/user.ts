import { RoleSubjectType } from '.';

export interface ListUserModel {
    id: string;
    avatar: string;
    emailAddress: string;
    nickname: string;
    userName: string;
    phoneNumber: string;
    creationTime: string;
    enabled: boolean;
    isSystemBuiltIn: boolean;
}

export interface UserDetailsModel {
    id: string;
    avatar: string;
    emailAddress: string;
    nickname: string;
    userName: string;
    phoneNumber: string;
    creationTime: string;
    enabled: boolean;
    isSystemBuiltIn: boolean;
    departmentIds: string[];
    roleIds: string[];
}

export interface UserRoleModel {
    roleId: string;
    roleName: string;
    roleDescription: string;
    assignmentSubjectType: RoleSubjectType;
    assignmentSubjectId: string;
    assignmentSubjectName?: string;
}

export interface CreateUserReq {
    nickname: string;
    username: string;
    password: string;
    phoneNumber: string;
}
