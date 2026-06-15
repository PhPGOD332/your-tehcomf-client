import { IWork } from '@/types/IWork';
import $api from '@/http';
import { TNameCategory } from '@/types/IFilters';

export class PortfolioService {
	static async getAllWorks(): Promise<IWork[]> {
		const response = await $api.get('/portfolio');
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
