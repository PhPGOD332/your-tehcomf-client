import { pagesLinks } from '@/shared/constants';
import { IFilters, TFilter } from '@/types/IFilters';
import { IFilterBudget } from '@/types/PortfolioFilters/IFilterBudget';
import { IFilterColor } from '@/types/PortfolioFilters/IFilterColor';
import { IFilterLayout } from '@/types/PortfolioFilters/IFilterLayout';
import { IFilterType } from '@/types/PortfolioFilters/IFilterType';

export type PortfolioFilterSearchParams = Record<
	string,
	string | string[] | undefined
>;

interface PortfolioFilterOptions {
	types: IFilterType[];
	colors: IFilterColor[];
	layouts: IFilterLayout[];
	budgets: IFilterBudget[];
}

const getSearchParamValue = (
	searchParams: PortfolioFilterSearchParams,
	key: keyof IFilters,
): string => {
	const value = searchParams[key];

	if (Array.isArray(value)) {
		return value[0] ?? '';
	}

	return value ?? '';
};

const findFilterByName = <T extends TFilter>(
	filters: T[],
	filterName: string,
): T | null => filters.find((filter) => filter.name === filterName) ?? null;

export const getPortfolioFiltersFromSearchParams = (
	searchParams: PortfolioFilterSearchParams,
	{ types, colors, layouts, budgets }: PortfolioFilterOptions,
): IFilters => ({
	type: findFilterByName(types, getSearchParamValue(searchParams, 'type')),
	budget: findFilterByName(budgets, getSearchParamValue(searchParams, 'budget')),
	layout: findFilterByName(layouts, getSearchParamValue(searchParams, 'layout')),
	color: findFilterByName(colors, getSearchParamValue(searchParams, 'color')),
});

export const getPortfolioFiltersSearchParams = (
	filters: IFilters,
): URLSearchParams => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, filter]) => {
		if (filter?.name) {
			params.set(key, filter.name);
		}
	});

	return params;
};

export const getPortfolioFiltersHref = (filters: IFilters): string => {
	const params = getPortfolioFiltersSearchParams(filters);
	const query = params.toString();

	return query ? `${pagesLinks.portfolio}?${query}` : pagesLinks.portfolio;
};

export const getPortfolioFilterHref = (
	filterKey: keyof IFilters,
	filterName?: string,
): string => {
	if (!filterName) return pagesLinks.portfolio;

	const params = new URLSearchParams({
		[filterKey]: filterName,
	});

	return `${pagesLinks.portfolio}?${params.toString()}`;
};
