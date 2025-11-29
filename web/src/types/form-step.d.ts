import z from "zod";

export interface FormStep {
    ID: number;
    title: string;
    index: number;
    templateId: number;
    organizationId: number;
}

export interface FormStepPage {
    ID: number;
    title: string;
    index: number;
    templateId: number;
    organizationId: number;
}

export const FormStepDtoSchema = z.object({
    index: z.int(),
    organizationId: z.int().min(1, 'Organization ID are required'),
    templateId: z.int().min(1, 'Template ID are required'),
    title: z.string().min(1, 'Title are required'),
});
export type FormStepDto = z.infer<typeof FormStepDtoSchema>;