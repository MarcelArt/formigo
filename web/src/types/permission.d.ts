export type PermissionKeys = 'fullAccess' |
    'role#view' |
    'role#manage' |
    'organization#view' |
    'organization#manage' |
    'userOrganization#invite';

export const PERMISSION_MAP: Record<PermissionKeys, string> = {
    'fullAccess': 'Full Access',
    'role#view': 'View Roles',
    'role#manage': 'Manage Roles',
    'organization#view': 'View Organizations',
    'organization#manage': 'Manage Organizations',
    'userOrganization#invite': 'Invite User to Organization',
}