import type { MetadataRoute } from 'next';
import { CLIENT_URL, pagesLinks } from '@/shared/constants';
// import { PortfolioService } from '@/services/PortfolioService';

const getRouteUrl = (path: string) => new URL(path, CLIENT_URL).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lastModified = new Date();
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: getRouteUrl(pagesLinks.main),
			lastModified,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: getRouteUrl(pagesLinks.portfolio),
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: getRouteUrl(pagesLinks.aboutCompany),
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: getRouteUrl(pagesLinks.partners),
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: getRouteUrl(pagesLinks.contacts),
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];

	try {
		// const works = await PortfolioService.getAllWorks();
		// const portfolioRoutes: MetadataRoute.Sitemap = works.map((work) => ({
		// 	url: getRouteUrl(`${pagesLinks.portfolio}/${work.name}`),
		// 	lastModified,
		// 	changeFrequency: 'monthly',
		// 	priority: 0.8,
		// }));

		// return [...staticRoutes, ...portfolioRoutes];
		return [...staticRoutes];
	} catch {
		return staticRoutes;
	}
}
