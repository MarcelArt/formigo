import type { FormStepDto } from "@/types/form-step";
import type { Id, JsonResponse } from "@/types/json-response";
import api from ".";

async function create(orgId: number, input: FormStepDto): Promise<JsonResponse<Id>> {
    const res = await api.post(`${orgId}/form-step`, input);
    return res.data;
}

const formStepApi = {
    create,
}
export default formStepApi;