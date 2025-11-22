import z from "zod";
import type { PermissionKeys } from "./permission";

export interface Role {
    ID: number;
    value: string;
}

export interface RolePage {
    ID: number;
    value: string;
    permissions: string;
}

export interface AssignPermissions {
    roleId: number;
    permissions: PermissionKeys[];
}

export const RoleDtoSchema = z.object({
    value: z.string().min(1, "Role name cannot be empty"),
    organizationId: z.number(),
});
export type RoleDto = z.infer<typeof RoleDtoSchema>;