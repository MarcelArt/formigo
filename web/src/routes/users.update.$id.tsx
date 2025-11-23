import userApi from '@/api/user.api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpdatePasswordTab } from '@/components/update-password-tab';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users/update/$id')({
	component: RouteComponent,
  loader: async ({ params }) => {
		const { id } = params;

		const user = await userApi.getById(+id);
		return {
			crumbs: [
				{ title: 'User Management', link: '#' },
				{ title: 'Users', link: '/users' },
				{ title: user.items.username, link: '#' },
			],
		};
	},
});

function RouteComponent() {
  const { id } = Route.useParams();

	return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<Tabs className="w-full" defaultValue="password">
				<TabsList>
					<TabsTrigger value="password">Password</TabsTrigger>
					<TabsTrigger value="role">Role Mapping</TabsTrigger>
				</TabsList>
				<TabsContent value="password">
					<UpdatePasswordTab userId={+id}/>
				</TabsContent>
				<TabsContent value="permission">
					{/* <PermissionMappingTab roleId={+id} currentPermissions={status === 'success' ? data.items.map((item) => item.permission) : []} /> */}
				</TabsContent>
			</Tabs>
		</div>
	);
}
