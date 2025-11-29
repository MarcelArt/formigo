import formTemplateApi from '@/api/form-template.api';
import { AddStepTab } from '@/components/add-step-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpdateFormTemplateTab } from '@/components/update-form-template-tab';
import useOrganization from '@/hooks/useOrganization';
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

	return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<Tabs className="w-full" defaultValue="template-details">
				<TabsList>
					<TabsTrigger value="template-details">Template details</TabsTrigger>
					<TabsTrigger value="add-step">
						<Plus />
						Add step
					</TabsTrigger>
				</TabsList>
				<TabsContent value="template-details">
					<UpdateFormTemplateTab id={+id} />
				</TabsContent>
				<TabsContent value="add-step">
					<AddStepTab index={0} templateId={+id} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
