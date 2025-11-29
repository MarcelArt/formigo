import z from "zod";

export interface FormTemplate {
    ID: number;
    title: string;
    description: string;
    organizationId: number;
    userId: number;
}

export interface FormTemplatePage {
    ID: number;
    title: string;
    description: string;
    createdBy: string;
    CreatedAt: string;
    UpdatedAt: string;
};

export const FormTemplateDtoSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty'),
    description: z.string(),
    organizationId: z.int().min(1, 'Organization ID are required'),
    userId: z.int().min(1, 'User ID are required'),
});
export type FormTemplateDto = z.infer<typeof FormTemplateDtoSchema>;