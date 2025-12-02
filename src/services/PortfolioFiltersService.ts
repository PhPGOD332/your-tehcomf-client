import $api from "@/http";
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterStyle} from "@/types/PortfolioFilters/IFilterStyle";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";

export class PortfolioFiltersService {
    static async getFilterColors(): Promise<IFilterColor[]> {
        const response = await $api.get('/filter-colors').catch(error => error);
        return response.data;
    }

    static async getFilterStyles(): Promise<IFilterStyle[]> {
        const response = await $api.get('/filter-styles').catch(error => error);
        return response.data;
    }

    static async getFilterTypes(): Promise<IFilterType[]> {
        const response = await $api.get('/filter-types').catch(error => error);
        return response.data;
    }

    static async getFilterBudgets(): Promise<IFilterBudget[]> {
        const response = await $api.get('/filter-budgets').catch(error => error);
        return response.data;
    }
}