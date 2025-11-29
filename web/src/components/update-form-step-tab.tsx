import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Button } from './ui/button';
import useOrganization from '@/hooks/useOrganization';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { unwrapAxiosError } from '@/lib/api-error';
import { useForm } from '@tanstack/react-form';
import { FormStepDtoSchema, type FormStepDto } from '@/types/form-step.d';
import formStepApi from '@/api/form-step.api';
import { Separator } from './ui/separator';
import { FormQuestionBuilderCard } from './form-question-builder-card';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import type { UpsertFormQuestion } from '@/types/form-question';

interface UpdateFormStepTabProps {
	id: number;
	templateId: number;
}

export function UpdateFormStepTab({ id, templateId }: UpdateFormStepTabProps) {
	const { organizationId } = useOrganization();
	const queryClient = useQueryClient();
	const [questions, setQuestions] = useState<UpsertFormQuestion[]>([]);

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

	const updateQuestion = (index: number, value: UpsertFormQuestion) => {
		setQuestions((prev) => prev.map((question, i) => (i === index ? value : question)));
	};

	const pushQuestion = () => {
		const newQuestions: UpsertFormQuestion[] = [
			...questions,
			{
				ID: 0,
				index: questions.length,
				isRequired: false,
				key: '',
				label: '',
				options: [],
				organizationId,
				stepId: id,
				type: '',
			},
		];
		setQuestions(newQuestions);
	};

	const deleteQuestions = (index: number) => {
		questions.splice(index, 1);
		setQuestions([...questions]);
	};

	return (
		<div className="flex flex-col gap-6 w-full my-4">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<FieldGroup>
					<div className="flex flex-col gap-2">
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
			<Separator className="w-full bg-sidebar-border" orientation="horizontal" />
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col gap-4">
					<h2 className="text-lg font-semibold">Questions</h2>
					{questions.map((question, i) => (
						<FormQuestionBuilderCard key={i} value={question} onChange={(val) => updateQuestion(i, val)} onDelete={() => deleteQuestions(i)} />
					))}

					<Button onClick={pushQuestion}>
						<Plus />
						Add more question
					</Button>
				</div>
				<div>
					<h2 className="text-lg font-semibold">Preview</h2>
				</div>
			</div>
		</div>
	);
}
