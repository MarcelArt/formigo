import { create } from "zustand";

interface BreadcrumbPath {
    title: string;
    link?: string;
}

interface BreadcrumbState {
    breadcrumbs: BreadcrumbPath[],
    setBreadcrumbs: (paths: BreadcrumbPath[]) => void;
}

const useBreadcrumb = create<BreadcrumbState>()((set) => ({
    breadcrumbs: [],
    setBreadcrumbs: (paths: BreadcrumbPath[]) => set({ breadcrumbs: paths }),
}));
export default useBreadcrumb;