export interface Auth {
    isAdmin?: boolean;
    hasToken?: boolean;
}

export interface Decoded {
    exp: number;
    user_name: string;
    authorities: string[];
    jti: string;
    client_id: string;
    scope: string[],
    organizationId: string,
    departmentId: string,
    userGroupId?: string
}