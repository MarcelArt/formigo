import type { FormTemplateDto, FormTemplatePage } from "@/types/form-template";
import type { Page, PaginationParams } from "@/types/paged";
import api from ".";
import type { Id, JsonResponse } from "@/types/json-response";

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

async function create(orgId: number, input: FormTemplateDto): Promise<JsonResponse<Id>> {
    const res = await api.post(`${orgId}/form-template`, input);
    return res.data;
}

const formTemplateApi = {
    read,
    create,
}
export default formTemplateApi;