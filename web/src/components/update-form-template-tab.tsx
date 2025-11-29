import { FilePlus } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import useOrganization from "@/hooks/useOrganization";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormTemplateDtoSchema, type FormTemplateDto } from "@/types/form-template.d";
import formTemplateApi from "@/api/form-template.api";
import { toast } from "sonner";
import { unwrapAxiosError } from "@/lib/api-error";
import { useForm } from "@tanstack/react-form";

interface UpdateFormTemplateTabProps {
  id: number;
}

export function UpdateFormTemplateTab({ id }: UpdateFormTemplateTabProps) {
  const { organizationId } = useOrganization();
	const { userId } = useAuth();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (input: FormTemplateDto) => formTemplateApi.update(+id, organizationId, input),
		onSuccess: () => {
			toast.success('Form template created successfully');
			queryClient.invalidateQueries({
				queryKey: ['form-templates', organizationId],
			});
		},
		onError: (e) => {
			toast.error(`Failed creating form template: ${unwrapAxiosError(e)}`);
		},
	});

	const { data, status } = useQuery({
		queryKey: ['form-template', id],
		queryFn: () => formTemplateApi.getById(+id, organizationId),
	});

	const form = useForm({
		validators: {
			onSubmit: FormTemplateDtoSchema,
		},
		defaultValues: {
			title: status === 'success' ? data.items.title : '',
			description: status === 'success' ? data.items.description : '',
			organizationId,
			userId: userId!,
		},
		onSubmit: ({ value }) => mutate(value),
	});

	return (
		<div className="flex flex-col gap-6 w-full">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<div className="flex flex-col items-center gap-2 text-center">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<FilePlus className="size-6" />
							</div>
						</a>
						<h1 className="text-xl font-bold">Update form {status === 'success' ? data.items.title : ''}</h1>
					</div>
					<form.Field
						name="title"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Title</FieldLabel>
									<Input
										id={field.name}
										type="text"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="Title"
										required
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<form.Field
						name="description"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Description</FieldLabel>
									<Textarea
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="Description"
										required
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					/>
					<div className="grid grid-cols-12">
						<div className="col-span-11"></div>
						<Field className="col-span-1">
							<Button type="submit">Save</Button>
						</Field>
					</div>
				</FieldGroup>
			</form>
		</div>
	);
}
