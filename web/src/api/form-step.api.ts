import type { FormStep, FormStepDto, FormStepPage } from "@/types/form-step";
import type { Id, JsonResponse } from "@/types/json-response";
import api from ".";
import type { Page, PaginationParams } from "@/types/paged";

async function create(orgId: number, input: FormStepDto): Promise<JsonResponse<Id>> {
    const res = await api.post(`${orgId}/form-step`, input);
    return res.data;
}

async function read(orgId: number, params: PaginationParams): Promise<Page<FormStepPage>> {
    const res = await api.get(`${orgId}/form-step`, {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        },
    });
    return res.data;
}

async function update(id: number, orgId: number, input: FormStepDto): Promise<JsonResponse<FormStepDto>> {
    const res = await api.put(`${orgId}/form-step/${id}`, input);
    return res.data;
}

async function getById(id: number, orgId: number): Promise<JsonResponse<FormStep>> {
    const res = await api.get(`${orgId}/form-step/${id}`);
    return res.data;
}

const formStepApi = {
    create,
    read,
    update,
    getById,
}
export default formStepApi;