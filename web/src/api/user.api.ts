import type { LoginInput, LoginResponse } from "@/types/user";
import api from ".";
import type { JsonResponse } from "@/types/json-response";
import { httpError } from "@/lib/api-error";

async function login(input: LoginInput): Promise<JsonResponse<LoginResponse>> {
    try {
        const res = await api.post("/user/login", input);
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

const userApi = {
    login,
}
export default userApi;