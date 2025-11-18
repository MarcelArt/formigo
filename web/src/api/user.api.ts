import type { LoginInput, LoginResponse, UserPage } from "@/types/user";
import api from ".";
import type { JsonResponse } from "@/types/json-response";
import { httpError } from "@/lib/api-error";
import type { PermissionKey } from "@/types/permission-key";
import type { Page, PaginationParams } from "@/types/paged";

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

async function read({ filters, page = 0, size = 10, sort }: PaginationParams): Promise<Page<UserPage>> {
    const res = await api.get('/user', {
        params: {
            filters: JSON.stringify(filters),
            page,
            size,
            sort,
        }
    });

    return res.data;
}

const userApi = {
    login,
    getPermissionsByOrgId,
    read,
}
export default userApi;