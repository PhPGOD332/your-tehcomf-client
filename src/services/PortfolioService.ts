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
	types?: DirectusRelation<{ filter_types_id?: DirectusFilter | null }>[];
	styles?: DirectusRelation<{ filter_styles_id?: DirectusFilter | null }>[];
	layouts?: DirectusRelation<{ filter_layouts_id?: DirectusFilter | null }>[];
	filterColors?: DirectusRelation<{
		filter_colors_id?: DirectusFilter | null;
	}>[];
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
	'types.sort',
	'types.filter_types_id.id',
	'types.filter_types_id.name',
	'types.filter_types_id.caption',
	'types.filter_types_id.order',
	'styles.sort',
	'styles.filter_styles_id.id',
	'styles.filter_styles_id.name',
	'styles.filter_styles_id.caption',
	'styles.filter_styles_id.order',
	'layouts.sort',
	'layouts.filter_layouts_id.id',
	'layouts.filter_layouts_id.name',
	'layouts.filter_layouts_id.caption',
	'layouts.filter_layouts_id.order',
	'filterColors.sort',
	'filterColors.filter_colors_id.id',
	'filterColors.filter_colors_id.name',
	'filterColors.filter_colors_id.caption',
	'filterColors.filter_colors_id.order',
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

const pickFirstRelation = <T>(
	items: DirectusRelation<T>[] | undefined,
	getValue: (item: DirectusRelation<T>) => DirectusFilter | null | undefined,
): DirectusFilter | null =>
	sortRelations(items)
		.map(getValue)
		.find((item): item is DirectusFilter => Boolean(item)) ?? null;

const mapPortfolio = (portfolio: DirectusPortfolio): IWork => {
	const type =
		portfolio.type ??
		pickFirstRelation(portfolio.types, (item) => item.filter_types_id);
	const style =
		portfolio.style ??
		pickFirstRelation(portfolio.styles, (item) => item.filter_styles_id);
	const layout =
		portfolio.layout ??
		pickFirstRelation(portfolio.layouts, (item) => item.filter_layouts_id);
	const color =
		portfolio.filterColor ??
		pickFirstRelation(portfolio.filterColors, (item) => item.filter_colors_id);
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
		type: mapFilterType(type),
		style: mapFilterStyle(style),
		layout: mapFilterLayout(layout),
		color: mapFilterColor(color),
		bodyColor: mapColor(portfolio.bodyColor),
		tableTopColor: mapColor(portfolio.tableTopColor),
		facadeColors,
	};
};

const appendRelationFilter = (
	params: URLSearchParams,
	index: number,
	singleRelation: string,
	manyRelation: string,
	manyRelationField: string,
	value: string,
) => {
	params.append(
		`filter[_and][${index}][_or][0][${singleRelation}][name][_eq]`,
		value,
	);
	params.append(
		`filter[_and][${index}][_or][1][${manyRelation}][${manyRelationField}][name][_eq]`,
		value,
	);
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
				appendRelationFilter(
					params,
					index,
					'type',
					'types',
					'filter_types_id',
					filter.name,
				);
				index++;
				break;
			case 'layout':
				appendRelationFilter(
					params,
					index,
					'layout',
					'layouts',
					'filter_layouts_id',
					filter.name,
				);
				index++;
				break;
			case 'color':
				appendRelationFilter(
					params,
					index,
					'filterColor',
					'filterColors',
					'filter_colors_id',
					filter.name,
				);
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
		appendRelationFilter(
			params,
			0,
			'type',
			'types',
			'filter_types_id',
			typeName,
		);

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
			appendRelationFilter(
				params,
				0,
				'type',
				'types',
				'filter_types_id',
				filterValue,
			);
		}
		if (filterName === 'style') {
			appendRelationFilter(
				params,
				0,
				'style',
				'styles',
				'filter_styles_id',
				filterValue,
			);
		}
		if (filterName === 'layout') {
			appendRelationFilter(
				params,
				0,
				'layout',
				'layouts',
				'filter_layouts_id',
				filterValue,
			);
		}
		if (filterName === 'color') {
			appendRelationFilter(
				params,
				0,
				'filterColor',
				'filterColors',
				'filter_colors_id',
				filterValue,
			);
		}

		const response = await getPortfolioList(params);
		const works = response.data.map(mapPortfolio);

		return works.filter((work) => work.name !== currWorkName);
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
