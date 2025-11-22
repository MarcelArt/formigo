import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpdateRoleTab } from '@/components/update-role-tab';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/roles/update/$id')({
	component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

	return (
		// <div className="flex w-full max-w-sm flex-col gap-6 p-6">
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<Tabs className='w-full' defaultValue="details">
				<TabsList>
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="permission">Permission Mapping</TabsTrigger>
				</TabsList>
				<TabsContent value="details">
					<UpdateRoleTab roleId={+id} />
				</TabsContent>
				<TabsContent value="permission">
					<Card>
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>Change your password here. After saving, you&apos;ll be logged out.</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="tabs-demo-current">Current password</Label>
								<Input id="tabs-demo-current" type="password" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="tabs-demo-new">New password</Label>
								<Input id="tabs-demo-new" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save password</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
