import type { string } from "zod";

export interface JsonResponse<T> {
    items: T;
    isSuccess: boolean;
    message: string;
}