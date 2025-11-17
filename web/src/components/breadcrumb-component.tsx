import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { isMatch, useMatches } from '@tanstack/react-router';

export function BreadcrumbComponent() {
	const matches = useMatches();

	if (matches.some((match) => match.status === 'pending')) return null;

	const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumbs'));
	const breadcrumbs = matchesWithCrumbs[matchesWithCrumbs.length - 1].loaderData?.crumbs ?? [];

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
