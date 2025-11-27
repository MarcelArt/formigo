import type { FormTemplatePage } from "@/types/form-template";
import type { Page, PaginationParams } from "@/types/paged";
import api from ".";

async function read(orgId: number, params: PaginationParams): Promise<Page<FormTemplatePage>> {
    const res = await api.get(`${orgId}/form-template`, {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        },
    });

    return res.data;
}

const formTemplateApi = {
    read,
}
export default formTemplateApi;