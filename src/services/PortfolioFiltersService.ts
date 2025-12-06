import $api from "@/http";
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";

export class PortfolioFiltersService {
    static async getFilterColors(): Promise<IFilterColor[]> {
        const response = await $api.get('/filter-colors').catch(error => error);
        return response.data;
    }

    static async getFilterLayouts(): Promise<IFilterLayout[]> {
        const response = await $api.get('/filter-layouts').catch(error => error);
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