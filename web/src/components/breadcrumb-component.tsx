import useBreadcrumb from '@/hooks/useBreadcrumb';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

export function BreadcrumbComponent() {
	const { breadcrumbs } = useBreadcrumb();

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((breadcrumb, i) => {
					if (i === 0 || i === breadcrumbs.length - 1) {
						return (
							<>
								<BreadcrumbItem>
									<BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
								</BreadcrumbItem>
								{i < breadcrumbs.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
							</>
						);
					} else {
						return (
							<>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href={breadcrumb.link}>{breadcrumb.title}</BreadcrumbLink>
								</BreadcrumbItem>
								{i < breadcrumbs.length - 1 ? <BreadcrumbSeparator className="hidden md:block" /> : null}
							</>
						);
					}
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
