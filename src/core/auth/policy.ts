import type { Role, Permission } from "./permissions";
import { PERM } from "./permissions";

export const POLICY: Record<Role, ReadonlySet<Permission>> = {
    ADMIN: new Set<Permission>([
        PERM.USER_UPDATE_ANY,
        PERM.USER_DELETE_ANY,
    ]),
    USER: new Set<Permission>([
        PERM.USER_UPDATE_SELF,
        PERM.USER_DELETE_SELF,
    ]),
};

export function hasPerm(role: Role | undefined, perm: Permission): boolean {
    if (!role) return false;
    return POLICY[role]?.has(perm) ?? false;
}
