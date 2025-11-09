export type Filters = Array<string | number | Filters>

export interface PaginationParams {
    page?: number;
    size?: number;
    sort?: string;
    filters?: Filters;
}

export interface Page<T> {
    page: number;
    size: number;
    max_page: number;
    total_pages: number;
    total: number;
    last: boolean;
    first: boolean;
    visible: number;
    items: T[];
}