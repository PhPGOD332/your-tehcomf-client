import { IFilterBudget } from '@/types/PortfolioFilters/IFilterBudget';
import { IFilterColor } from '@/types/PortfolioFilters/IFilterColor';
import { IFilterLayout } from '@/types/PortfolioFilters/IFilterLayout';
import { IFilterType } from '@/types/PortfolioFilters/IFilterType';
import {
	DIRECTUS_PUBLISHED_STATUS,
	directusApi,
	DirectusListResponse,
} from '@/http/directus';

type DirectusFilter = {
	id: number;
	name: string;
	caption: string;
	order: number;
};

type DirectusBudgetFilter = DirectusFilter & {
	minValue: number | null;
	maxValue: number | null;
};

export class PortfolioFiltersService {
	static async getFilterColors(): Promise<IFilterColor[]> {
		const response = await directusApi.get<
			DirectusListResponse<DirectusFilter>
		>('/items/filter_colors', {
			params: {
				sort: 'order,id',
				'filter[status][_eq]': DIRECTUS_PUBLISHED_STATUS,
			},
		});

		return response.data.data.map((filter) => ({
			...filter,
			type: 'color',
		}));
	}

	static async getFilterLayouts(): Promise<IFilterLayout[]> {
		const response = await directusApi.get<
			DirectusListResponse<DirectusFilter>
		>('/items/filter_layouts', {
			params: {
				sort: 'order,id',
				'filter[status][_eq]': DIRECTUS_PUBLISHED_STATUS,
			},
		});

		return response.data.data.map((filter) => ({
			...filter,
			type: 'layout',
		}));
	}

	static async getFilterTypes(): Promise<IFilterType[]> {
		const response = await directusApi.get<
			DirectusListResponse<DirectusFilter>
		>('/items/filter_types', {
			params: {
				sort: 'order,id',
				'filter[status][_eq]': DIRECTUS_PUBLISHED_STATUS,
			},
		});

		return response.data.data.map((filter) => ({
			...filter,
			type: 'type',
		}));
	}

	static async getFilterBudgets(): Promise<IFilterBudget[]> {
		const response = await directusApi.get<
			DirectusListResponse<DirectusBudgetFilter>
		>('/items/filter_budgets', {
			params: {
				sort: 'order,id',
				'filter[status][_eq]': DIRECTUS_PUBLISHED_STATUS,
			},
		});

		return response.data.data.map((filter) => ({
			...filter,
			type: 'budget',
		}));
	}
}
