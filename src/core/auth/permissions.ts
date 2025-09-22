export type Role = "ADMIN" | "USER";

export const PERM = {
    USER_UPDATE_ANY: "user:update:any",
    USER_UPDATE_SELF: "user:update:self",
    USER_DELETE_ANY: "user:delete:any",
    USER_DELETE_SELF: "user:delete:self",
} as const;

export type Permission = typeof PERM[keyof typeof PERM];
