import type { Page, PaginationParams } from "@/types/paged";
import api from ".";
import type { RolePage } from "@/types/role";

async function read(orgId: number | string, params: PaginationParams): Promise<Page<RolePage>> {
    const res = await api.get(`${orgId}/role`, {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        },
    });

    return res.data;
}

const roleApi = {
    read,
};
export default roleApi;