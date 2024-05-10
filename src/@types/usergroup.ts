export interface ListUserGroupRes {
    id: string;
    name: string;
    description: string;
}

export interface CreateUserGroupReq {
    name: string;
    description: string;
}

export interface GetUserGroupRes {
    name: string;
    description: string;
}

export interface GetUserGroupMembersRes {
    id: string;
    nickname: string;
    userName: string;
    emailAddress: string;
    phoneNumber: string;
}

export interface AddMembersReq {
    userIds: string[];
}
