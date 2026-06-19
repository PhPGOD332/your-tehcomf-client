import type { Metadata } from 'next';
import { CLIENT_URL, SITE_NAME, pagesData } from '@/shared/constants';
import type { IWork } from '@/types/IWork';

const DEFAULT_OG_IMAGE = '/sliders/main/start-slider-1.png';

type PageData = (typeof pagesData)[keyof typeof pagesData];

const getAbsoluteUrl = (path: string) => new URL(path, CLIENT_URL).toString();

const stripHtml = (value?: string) => value?.replace(/<[^>]*>/g, '').trim() ?? '';

export const createPageMetadata = (page: PageData): Metadata => {
	const imageUrl = getAbsoluteUrl(DEFAULT_OG_IMAGE);

	return {
		metadataBase: new URL(CLIENT_URL),
		title: page.title,
		description: page.description,
		keywords: page.keywords,
		alternates: {
			canonical: page.url,
		},
		openGraph: {
			title: page.title,
			description: page.description,
			url: page.url,
			siteName: SITE_NAME,
			locale: 'ru_RU',
			type: page.type,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: page.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: page.title,
			description: page.description,
			images: [imageUrl],
		},
	};
};

export const createPortfolioItemMetadata = (work: IWork): Metadata => {
	const imageUrl = work.images?.[0]?.src ?? DEFAULT_OG_IMAGE;
	const description = stripHtml(work.subtitle || work.description) || pagesData.portfolio.description;
	const title = `${work.title} - ${SITE_NAME}`;
	const url = getAbsoluteUrl(`/portfolio/${work.name}`);

	return {
		...createPageMetadata({
			...pagesData.portfolio,
			title,
			description,
			url,
		}),
		openGraph: {
			...createPageMetadata(pagesData.portfolio).openGraph,
			title,
			description,
			url,
			images: [
				{
					url: getAbsoluteUrl(imageUrl),
					width: 1200,
					height: 630,
					alt: work.title,
				},
			],
		},
	};
};

export const organizationStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'FurnitureStore',
	'@id': `${CLIENT_URL}/#organization`,
	name: 'Технологии комфорта',
	alternateName: SITE_NAME,
	url: CLIENT_URL,
	logo: getAbsoluteUrl('/favicon.ico'),
	image: getAbsoluteUrl(DEFAULT_OG_IMAGE),
	telephone: '+7-495-988-55-28',
	email: 'info@tehcomf.ru',
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Москва',
		streetAddress: 'Шарикоподшипниковская улица, 4, корп. 4А',
		addressCountry: 'RU',
	},
	areaServed: ['Москва', 'Московская область'],
	priceRange: '$$',
};

export const websiteStructuredData = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': `${CLIENT_URL}/#website`,
	name: SITE_NAME,
	url: CLIENT_URL,
	publisher: {
		'@id': `${CLIENT_URL}/#organization`,
	},
	inLanguage: 'ru-RU',
};
