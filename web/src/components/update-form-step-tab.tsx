import { FilePlus } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useOrganization from "@/hooks/useOrganization";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { unwrapAxiosError } from "@/lib/api-error";
import { useForm } from "@tanstack/react-form";
import { FormStepDtoSchema, type FormStepDto } from "@/types/form-step.d";
import formStepApi from "@/api/form-step.api";

interface UpdateFormStepTabProps {
  id: number;
  templateId: number;
}

export function UpdateFormStepTab({ id, templateId }: UpdateFormStepTabProps) {
  const { organizationId } = useOrganization();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (input: FormStepDto) => formStepApi.update(id, organizationId, input),
		onSuccess: () => {
			toast.success('Form step updated successfully');
			queryClient.invalidateQueries({
				queryKey: ['form-steps', organizationId],
			});
			queryClient.invalidateQueries({
				queryKey: ['form-step', id],
			});
		},
		onError: (e) => {
			toast.error(`Failed updating form step: ${unwrapAxiosError(e)}`);
		},
	});

	const { data, status } = useQuery({
		queryKey: ['form-step', id],
		queryFn: () => formStepApi.getById(id, organizationId),
	});

  const form = useForm({
      validators: {
        onSubmit: FormStepDtoSchema,
      },
      defaultValues: {
        title: status === 'success' ? data.items.title : '',
        index: status === 'success' ? data.items.index : 0,
        organizationId,
        templateId,
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
						<h1 className="text-xl font-bold">Update step {status === 'success' ? `${data.items.index + 1} - ${data.items.title}` : ''}</h1>
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