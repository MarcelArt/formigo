import type { LoginInput, LoginResponse } from "@/types/user";
import api from ".";
import type { JsonResponse } from "@/types/json-response";
import { httpError } from "@/lib/api-error";
import type { PermissionKey } from "@/types/permission-key";

async function login(input: LoginInput): Promise<JsonResponse<LoginResponse>> {
    try {
        const res = await api.post("/user/login", input);
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

async function getPermissionsByOrgId(orgId: number): Promise<JsonResponse<PermissionKey[]>> {
    try {
        const res = await api.get(`/user/permission/${orgId}`);
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

const userApi = {
    login,
    getPermissionsByOrgId,
}
export default userApi;