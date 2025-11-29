import z from "zod";

export const FormStepDtoSchema = z.object({
    index: z.int(),
    organizationId: z.int().min(1, 'Organization ID are required'),
    templateId: z.int().min(1, 'Template ID are required'),
    title: z.string().min(1, 'Title are required'),
});
export type FormStepDto = z.infer<typeof FormStepDtoSchema>;