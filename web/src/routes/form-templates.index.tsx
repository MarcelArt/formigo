import formTemplateApi from '@/api/form-template.api';
import { DataTable } from '@/components/data-table';
import { TableHeaderSearch } from '@/components/table-header-search';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { PermissionProvider, usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import type { FormTemplatePage } from '@/types/form-template.d';
import { FiltersBuilder, type PaginationParams } from '@/types/paged.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table';
import { FilePlus, Pencil, ShieldBan } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/form-templates/')({
  component: RouteComponent,
  loader: () => ({
		crumbs: [
			{ title: 'Form Builder', link: '#' },
			{ title: 'Templates', link: '#' },
		],
	}),
})

function RouteComponent() {
	const { organizationId } = useOrganization();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const { isAuthorized } = usePermission();
  const [titleFilter, setTitleFilter] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('');

  const filterBuilder = new FiltersBuilder({ behaviour: 'and' });
	if (titleFilter) filterBuilder.like('title', titleFilter);
	if (creatorFilter) filterBuilder.like('created_by', creatorFilter);

  const params: PaginationParams = {
		filters: filterBuilder.build(),
		page,
		size,
		sort: '-created_at',
	};

	const { data, status } = useQuery({
		queryKey: ['form-templates', organizationId, params],
		queryFn: () => formTemplateApi.read(organizationId, params),
	});

  const columns: ColumnDef<FormTemplatePage>[] = [
		{
			accessorKey: 'title',
			header: () => <TableHeaderSearch button="Title" label="Search form title" value={titleFilter} onChange={setTitleFilter} />,
		},
    {
      accessorKey: 'description',
      header: 'Description',
    },
		{
			accessorKey: 'createdBy',
			header: () => <TableHeaderSearch button="Creator" label="Search creator" value={creatorFilter} onChange={setCreatorFilter} />,
		},
		{
			accessorKey: 'UpdatedAt',
			header: 'Modified at',
		},
    {
			header: 'Actions',
			id: 'actions',
			cell: ({ row }) => {
        console.log('row :>> ', row);
				return (
					<PermissionProvider permissionKey="formTemplate#manage" deniedDisplay={<ShieldBan/>}>
						<Tooltip>
							<TooltipTrigger asChild>
								{/* <Link to="/users/update/$id" params={{ id: row.original.ID.toString() }}> */}
									<Button variant="ghost" size="icon">
										<Pencil />
									</Button>
								{/* </Link> */}
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit</p>
							</TooltipContent>
						</Tooltip>
					</PermissionProvider>
				);
			},
		},
	];

	if (!isAuthorized('formTemplate#view')) return <UnauthorizedComponent />;
	if (status !== 'success') return null;

  return (
      <div className="container mx-auto py-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl pb-4">Form Templates</h1>
          <div className="flex flex-row gap-2">
            {/* <PermissionProvider permissionKey="accessLog#view">
                <CreateUserDialog />
              </PermissionProvider> */}
              <Button><FilePlus />New template</Button>
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
