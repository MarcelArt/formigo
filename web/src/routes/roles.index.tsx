import roleApi from '@/api/role.api';
import { DataTable } from '@/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import useOrganization from '@/hooks/useOrganization';
import { cn } from '@/lib/utils';
import { FiltersBuilder } from '@/types/paged.d';
import { PERMISSION_MAP, type PermissionKeys } from '@/types/permission.d';
import type { RolePage } from '@/types/role.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/roles/')({
	component: RouteComponent,
	loader: () => ({
		crumbs: [
			{ title: 'User Management', link: '#' },
			{ title: 'Roles', link: '#' },
		],
	}),
});

function RouteComponent() {
	const columns: ColumnDef<RolePage>[] = [
		{
			accessorKey: 'ID',
			header: 'ID',
		},
		{
			accessorKey: 'value',
			header: 'Role',
		},
		{
			accessorKey: 'permissions',
			header: 'Permissions',
			cell: ({ row }) => {
				const permissions = row.getValue('permissions') as string;
				const permissionsSplitted = permissions.split(';') as PermissionKeys[];

				return permissionsSplitted?.length ? (
					permissionsSplitted.map((permission, i) =>
						i < 9 ? (
							<Badge className={cn('mr-1', { 'text-accent-foreground bg-rose-pine-gold': permission === 'fullAccess' })} key={i}>
								{PERMISSION_MAP[permission]}
							</Badge>
						) : i === 9 ? (
							<Badge key={i}>+{permissionsSplitted.length - 9}</Badge>
						) : null,
					)
				) : (
					<Badge>None</Badge>
				);
			},
		},
		{
			header: 'Actions',
			id: 'actions',
			cell: ({ row }) => {
				return (
					<>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link to="/roles/update/$id" params={{ id: row.original.ID.toString() }}>
									<Button variant="ghost" size="icon">
										<Pencil />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit</p>
							</TooltipContent>
						</Tooltip>
					</>
				);
			},
		},
	];

	const { organizationId } = useOrganization();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);

	const filtersBuilder = new FiltersBuilder();
	const filters = filtersBuilder.build();

	const param = { filters, page, size };

	const { data, status } = useQuery({
		queryKey: ['roles', organizationId, param],
		queryFn: () => roleApi.read(organizationId, param),
	});

	if (status != 'success') return null;

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-row justify-between">
				<h1 className="text-2xl pb-4">Roles</h1>
				<div className="flex flex-row gap-2">
					{/* <InviteMemberDialog />
					<CreateUserDialog /> */}
				</div>
			</div>
			<DataTable
				columns={columns}
				data={data.items}
				first={data.first}
				last={data.last}
				max_page={data.max_page}
				page={page}
				setPage={setPage}
				setSize={setSize}
				size={data.size}
				total={data.total}
				total_pages={data.total_pages}
				visible={data.visible}
			/>
		</div>
	);
}
