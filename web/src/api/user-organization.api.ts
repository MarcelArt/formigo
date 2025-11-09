import { httpError } from "@/lib/api-error";
import type { Page, PaginationParams } from "@/types/paged";
import type { UserOrganizationPage } from "@/types/user-organization";
import api from ".";

async function read({ filters, page = 0, size = 10, sort }: PaginationParams): Promise<Page<UserOrganizationPage>> {
    try {
        const res = await api.get("/user-organization", {
            params: {
                filters: JSON.stringify(filters),
                page,
                size,
                sort,
            },
        });
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

const userOrganizationApi = {
    read,
};
export default userOrganizationApi;