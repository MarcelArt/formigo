import formTemplateApi from '@/api/form-template.api';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAuth from '@/hooks/useAuth';
import useOrganization from '@/hooks/useOrganization';
import { unwrapAxiosError } from '@/lib/api-error';
import { FormTemplateDtoSchema, type FormTemplateDto } from '@/types/form-template.d';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { FilePlus } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/form-templates/create')({
  component: RouteComponent,
  loader: () => ({
		crumbs: [
			{ title: 'Form Builder', link: '#' },
			{ title: 'Templates', link: '/form-templates' },
			{ title: 'Create new template', link: '#' },
		],
	}),
})

function RouteComponent() {
  const { organizationId } = useOrganization();
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (input: FormTemplateDto) => formTemplateApi.create(organizationId, input),
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

  const form = useForm({
      validators: {
        onSubmit: FormTemplateDtoSchema,
      },
      defaultValues: {
        title: '',
        description: '',
        organizationId,
        userId: userId!,
      },
      onSubmit: ({ value }) => mutate(value),
    });

  return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<div className="flex flex-col gap-6 w-full max-w-7xl">
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
							<h1 className="text-xl font-bold">Create new form template</h1>
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
		</div>
	);
}
