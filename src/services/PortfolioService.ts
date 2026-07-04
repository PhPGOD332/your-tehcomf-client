import { IWork } from '@/types/IWork';
import { IFilters, TNameCategory } from '@/types/IFilters';
import {
	DIRECTUS_PUBLISHED_STATUS,
	DirectusListResponse,
	directusApi,
	getDirectusAssetUrl,
} from '@/http/directus';
import { IColor } from '@/types/IColor';
import { IImage } from '@/types/IImage';
import { IFilterType } from '@/types/PortfolioFilters/IFilterType';
import { IFilterStyle } from '@/types/PortfolioFilters/IFilterStyle';
import { IFilterLayout } from '@/types/PortfolioFilters/IFilterLayout';
import { IFilterColor } from '@/types/PortfolioFilters/IFilterColor';

export interface PortfolioPageResponse {
	items: IWork[];
	total: number;
}

interface PortfolioPageParams {
	offset: number;
	limit: number;
	filters?: IFilters;
}

type DirectusFilter = {
	id: number;
	name: string;
	caption: string;
	order: number;
};

type DirectusColor = {
	id: number;
	sort?: number | null;
	name: string;
	caption: string;
	hexCode: string;
};

type DirectusFile = {
	id: string;
	filename_download?: string | null;
	title?: string | null;
	width?: number | null;
	height?: number | null;
	metadata?: {
		old_order?: number;
	} | null;
};

type DirectusRelation<T> = {
	sort?: number | null;
} & T;

type DirectusPortfolio = {
	id: number;
	sort?: number | null;
	name: string;
	title: string;
	subtitle?: string | null;
	description?: string | null;
	price: number;
	sizesRoom?: string | null;
	sizesFurniture?: string | null;
	housingMaterial?: string | null;
	facadeMaterial?: string | null;
	tableTopMaterial?: string | null;
	furnitureAccessories?: string | null;
	bodyColor?: DirectusColor | null;
	tableTopColor?: DirectusColor | null;
	facadeColor?: DirectusColor | null;
	type?: DirectusFilter | null;
	style?: DirectusFilter | null;
	layout?: DirectusFilter | null;
	filterColor?: DirectusFilter | null;
	facadeColors?: DirectusRelation<{ colors_id?: DirectusColor | null }>[];
	images?: DirectusRelation<{ directus_files_id?: DirectusFile | null }>[];
};

const PORTFOLIO_FIELDS = [
	'id',
	'sort',
	'name',
	'title',
	'subtitle',
	'description',
	'price',
	'sizesRoom',
	'sizesFurniture',
	'housingMaterial',
	'facadeMaterial',
	'tableTopMaterial',
	'furnitureAccessories',
	'bodyColor.id',
	'bodyColor.name',
	'bodyColor.caption',
	'bodyColor.hexCode',
	'tableTopColor.id',
	'tableTopColor.name',
	'tableTopColor.caption',
	'tableTopColor.hexCode',
	'facadeColor.id',
	'facadeColor.name',
	'facadeColor.caption',
	'facadeColor.hexCode',
	'type.id',
	'type.name',
	'type.caption',
	'type.order',
	'style.id',
	'style.name',
	'style.caption',
	'style.order',
	'layout.id',
	'layout.name',
	'layout.caption',
	'layout.order',
	'filterColor.id',
	'filterColor.name',
	'filterColor.caption',
	'filterColor.order',
	'facadeColors.sort',
	'facadeColors.colors_id.id',
	'facadeColors.colors_id.name',
	'facadeColors.colors_id.caption',
	'facadeColors.colors_id.hexCode',
	'images.sort',
	'images.directus_files_id.id',
	'images.directus_files_id.filename_download',
	'images.directus_files_id.title',
	'images.directus_files_id.width',
	'images.directus_files_id.height',
	'images.directus_files_id.metadata',
].join(',');

const EMPTY_COLOR: IColor = {
	id: 0,
	name: '',
	caption: '',
	hexCode: 'transparent',
	captionCode: '',
};

const mapColor = (color?: DirectusColor | null): IColor =>
	color
		? {
				id: color.id,
				name: color.name,
				caption: color.caption,
				hexCode: color.hexCode,
				captionCode: '',
			}
		: EMPTY_COLOR;

const sortRelations = <T extends { sort?: number | null }>(items?: T[]): T[] =>
	[...(items ?? [])].sort((first, second) => {
		const firstSort = first.sort ?? Number.MAX_SAFE_INTEGER;
		const secondSort = second.sort ?? Number.MAX_SAFE_INTEGER;

		return firstSort - secondSort;
	});

const uniqueColors = (colors: IColor[]): IColor[] => {
	const seen = new Set<number | string>();

	return colors.filter((color) => {
		const key = color.id || color.name;
		if (!key || seen.has(key)) return false;

		seen.add(key);
		return true;
	});
};

const mapFilterType = (filter?: DirectusFilter | null): IFilterType => ({
	id: filter?.id ?? 0,
	name: filter?.name ?? '',
	caption: filter?.caption ?? '',
	order: filter?.order ?? 0,
	type: 'type',
});

const mapFilterStyle = (filter?: DirectusFilter | null): IFilterStyle => ({
	id: filter?.id ?? 0,
	name: filter?.name ?? '',
	caption: filter?.caption ?? '',
	order: filter?.order ?? 0,
	type: 'style',
});

const mapFilterLayout = (filter?: DirectusFilter | null): IFilterLayout => ({
	id: filter?.id ?? 0,
	name: filter?.name ?? '',
	caption: filter?.caption ?? '',
	order: filter?.order ?? 0,
	type: 'layout',
});

const mapFilterColor = (filter?: DirectusFilter | null): IFilterColor => ({
	id: filter?.id ?? 0,
	name: filter?.name ?? '',
	caption: filter?.caption ?? '',
	order: filter?.order ?? 0,
	type: 'color',
});

const mapImages = (images?: DirectusPortfolio['images']): IImage[] =>
	sortRelations(images)
		.map((image, index): IImage | null => {
			const file = image.directus_files_id;
			if (!file?.id) return null;

			return {
				src: getDirectusAssetUrl(file.id),
				imageAlt: file.title || file.filename_download || '',
				width: file.width ?? undefined,
				height: file.height ?? undefined,
				order: image.sort ?? file.metadata?.old_order ?? index,
			};
		})
		.filter((image): image is IImage => Boolean(image));

const mapPortfolio = (portfolio: DirectusPortfolio): IWork => {
	const facadeColors = uniqueColors([
		...sortRelations(portfolio.facadeColors).map((item) =>
			mapColor(item.colors_id),
		),
		mapColor(portfolio.facadeColor),
	]);

	return {
		id: portfolio.id,
		name: portfolio.name,
		title: portfolio.title,
		subtitle: portfolio.subtitle ?? '',
		description: portfolio.description ?? '',
		price: portfolio.price,
		sizesRoom: portfolio.sizesRoom ?? '',
		sizesFurniture: portfolio.sizesFurniture ?? '',
		housingMaterial: portfolio.housingMaterial ?? '',
		facadeMaterial: portfolio.facadeMaterial ?? '',
		tableTopMaterial: portfolio.tableTopMaterial ?? '',
		furnitureAccessories: portfolio.furnitureAccessories ?? '',
		images: mapImages(portfolio.images),
		type: mapFilterType(portfolio.type),
		style: mapFilterStyle(portfolio.style),
		layout: mapFilterLayout(portfolio.layout),
		color: mapFilterColor(portfolio.filterColor),
		bodyColor: mapColor(portfolio.bodyColor),
		tableTopColor: mapColor(portfolio.tableTopColor),
		facadeColors,
	};
};

const appendRelationFilter = (
	params: URLSearchParams,
	index: number,
	relation: string,
	value: string,
) => {
	params.append(`filter[_and][${index}][${relation}][name][_eq]`, value);
};

const appendPortfolioFilters = (
	params: URLSearchParams,
	filters?: IFilters,
) => {
	if (!filters) return;

	let index = 0;

	for (const filter of Object.values(filters)) {
		if (!filter) continue;

		switch (filter.type) {
			case 'type':
				appendRelationFilter(params, index, 'type', filter.name);
				index++;
				break;
			case 'layout':
				appendRelationFilter(params, index, 'layout', filter.name);
				index++;
				break;
			case 'color':
				appendRelationFilter(params, index, 'filterColor', filter.name);
				index++;
				break;
			case 'budget':
				if (filter.minValue !== null) {
					params.append(
						`filter[_and][${index}][price][_gte]`,
						String(filter.minValue),
					);
				}
				if (filter.maxValue !== null) {
					params.append(
						`filter[_and][${index}][price][_lte]`,
						String(filter.maxValue),
					);
				}
				index++;
				break;
		}
	}
};

const appendPublishedStatusFilter = (params: URLSearchParams) => {
	params.append('filter[status][_eq]', DIRECTUS_PUBLISHED_STATUS);
};

const getPortfolioList = async (
	params: URLSearchParams,
): Promise<DirectusListResponse<DirectusPortfolio>> => {
	const response = await directusApi.get<
		DirectusListResponse<DirectusPortfolio>
	>(`/items/portfolio?${params.toString()}`);

	return response.data;
};

export class PortfolioService {
	static async getAllWorks(): Promise<IWork[]> {
		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			limit: '-1',
			sort: '-sort,-id',
		});
		appendPublishedStatusFilter(params);

		const response = await getPortfolioList(params);

		return response.data.map(mapPortfolio);
	}

	static async getWorksPage({
		offset,
		limit,
		filters,
	}: PortfolioPageParams): Promise<PortfolioPageResponse> {
		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			offset: offset.toString(),
			limit: limit.toString(),
			sort: '-sort,-id',
			meta: 'filter_count',
		});

		appendPublishedStatusFilter(params);
		appendPortfolioFilters(params, filters);

		const response = await getPortfolioList(params);

		return {
			items: response.data.map(mapPortfolio),
			total: response.meta?.filter_count ?? response.data.length,
		};
	}

	static async getLastWorks(): Promise<IWork[]> {
		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			limit: '-1',
			sort: '-sort,-id',
		});
		appendPublishedStatusFilter(params);

		const response = await getPortfolioList(params);

		return response.data.map(mapPortfolio);
	}

	static async getLastWorksByType(
		typeName: string,
		limit: number,
	): Promise<IWork[]> {
		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			limit: limit.toString(),
			sort: '-sort,-id',
		});
		appendPublishedStatusFilter(params);
		appendRelationFilter(params, 0, 'type', typeName);

		const response = await getPortfolioList(params);

		return response.data.map(mapPortfolio);
	}

	static async getWorksByFilter(
		filterName: TNameCategory,
		filterValue: string,
		currWorkName: string,
	): Promise<IWork[]> {
		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			limit: '-1',
			sort: 'sort,id',
		});
		appendPublishedStatusFilter(params);

		if (filterName === 'type') {
			appendRelationFilter(params, 0, 'type', filterValue);
		}
		if (filterName === 'style') {
			appendRelationFilter(params, 0, 'style', filterValue);
		}
		if (filterName === 'layout') {
			appendRelationFilter(params, 0, 'layout', filterValue);
		}
		if (filterName === 'color') {
			appendRelationFilter(params, 0, 'filterColor', filterValue);
		}

		const response = await getPortfolioList(params);
		const works = response.data.map(mapPortfolio);

		return works.filter((work) => work.name !== currWorkName);
	}

	static async getWorksByNames(names: string[]): Promise<IWork[]> {
		if (names.length === 0) return [];

		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			limit: names.length.toString(),
		});
		appendPublishedStatusFilter(params);
		params.append('filter[name][_in]', names.join(','));

		const response = await getPortfolioList(params);
		const works = response.data.map(mapPortfolio);
		const worksByName = new Map(works.map((work) => [work.name, work]));

		return names
			.map((name) => worksByName.get(name))
			.filter((work): work is IWork => Boolean(work));
	}

	static async getWork(name: string): Promise<IWork> {
		const params = new URLSearchParams({
			fields: PORTFOLIO_FIELDS,
			limit: '1',
		});
		appendPublishedStatusFilter(params);
		params.append('filter[name][_eq]', name);

		const response = await directusApi.get<
			DirectusListResponse<DirectusPortfolio>
		>(`/items/portfolio?${params.toString()}`);
		const portfolio = response.data.data[0];

		if (!portfolio) {
			throw new Error(`Портфолио "${name}" не найдено`);
		}

		return mapPortfolio(portfolio);
	}
}
