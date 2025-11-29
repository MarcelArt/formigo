import formStepApi from '@/api/form-step.api';
import formTemplateApi from '@/api/form-template.api';
import { AddStepTab } from '@/components/add-step-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpdateFormStepTab } from '@/components/update-form-step-tab';
import { UpdateFormTemplateTab } from '@/components/update-form-template-tab';
import useOrganization from '@/hooks/useOrganization';
import { FiltersBuilder, type PaginationParams } from '@/types/paged.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/form-templates/update/$id')({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { id } = params;
		const { organizationId } = useOrganization.getState();

		const role = await formTemplateApi.getById(+id, organizationId);
		return {
			crumbs: [
				{ title: 'Form Builder', link: '#' },
				{ title: 'Templates', link: '/form-templates' },
				{ title: role.items.title, link: '#' },
			],
		};
	},
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { organizationId } = useOrganization();

	const filterBuilder = new FiltersBuilder({ behaviour: 'and' }).eq('template_id', id);
	const filters = filterBuilder.build();

	const params: PaginationParams = {
		filters,
		page: 0,
		sort: 'index',
	};

	const queryFn = async () => {
		const count = await formStepApi.read(organizationId, { ...params, size: 1 });
		return await formStepApi.read(organizationId, { ...params, size: count.total });
	};

	const { data, status } = useQuery({
		queryKey: ['form-steps', organizationId, params],
		queryFn,
	});

	if (status !== 'success') return null;

	return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<Tabs className="w-full" defaultValue="template-details">
				<TabsList>
					<TabsTrigger value="template-details">Template details</TabsTrigger>
					{data.items.map((item, i) => (
						<TabsTrigger key={i} value={`update-step-${item.ID}`}>
							Step {i + 1} - {item.title}
						</TabsTrigger>
					))}
					<TabsTrigger value="add-step">
						<Plus />
						Add step
					</TabsTrigger>
				</TabsList>
				<TabsContent value="template-details">
					<UpdateFormTemplateTab id={+id} />
				</TabsContent>
				{data.items.map((item, i) => (
					<TabsContent value={`update-step-${item.ID}`} key={i}>
						<UpdateFormStepTab id={item.ID} templateId={+id} />
					</TabsContent>
				))}
				<TabsContent value="add-step">
					<AddStepTab index={data.total} templateId={+id} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
