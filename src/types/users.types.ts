export enum RoleTypes {
    ADMIN = "admin",
    TRADER = "trader"
}

export interface IUser {
    name: string;
    email: string;
    role: RoleTypes;
    password: string;
}
