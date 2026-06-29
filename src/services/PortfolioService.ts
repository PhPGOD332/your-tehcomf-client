import { IWork } from '@/types/IWork';
import $api from '@/http';
import { IFilters, TNameCategory } from '@/types/IFilters';

export interface PortfolioPageResponse {
	items: IWork[];
	total: number;
}

interface PortfolioPageParams {
	offset: number;
	limit: number;
	filters?: IFilters;
}

export class PortfolioService {
	static async getAllWorks(): Promise<IWork[]> {
		const response = await $api.get('/portfolio');
		return response.data;
	}

	static async getWorksPage({
		offset,
		limit,
		filters,
	}: PortfolioPageParams): Promise<PortfolioPageResponse> {
		const params = new URLSearchParams({
			offset: offset.toString(),
			limit: limit.toString(),
		});

		if (filters) {
			for (const filter of Object.values(filters)) {
				if (!filter) continue;

				params.append('filter-name', filter.type);
				params.append('filter-value', filter.name);
			}
		}

		const response = await $api.get<PortfolioPageResponse>(
			`/portfolio?${params.toString()}`,
		);

		return response.data;
	}

	static async getLastWorks(): Promise<IWork[]> {
		const response = await $api.get('/portfolio/last');
		return response.data;
	}

	static async getWorksByFilter(
		filterName: TNameCategory,
		filterValue: string,
		currWorkName: string,
	): Promise<IWork[]> {
		const response = await $api.get(
			`/portfolio?filter-name=${filterName}&filter-value=${filterValue}`,
		);
		const works: IWork[] = response.data;

		return works.filter((work) => work.name !== currWorkName);
	}

	static async getWork(name: string): Promise<IWork> {
		const response = await $api.get(`/portfolio/${name}`);
		return response.data;
	}
}
