export interface UserOrganizationPage {
    ID: number;
    userId: number;
    username: string;
    email: string;
    organizationId: number;
    shortName: string;
    longName: string;
    status: 'active' | 'pending';
}