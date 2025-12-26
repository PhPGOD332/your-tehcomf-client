import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";

export interface IFilters {
    color: IFilterColor | null;
    layout: IFilterLayout | null;
    type: IFilterType | null;
    budget: IFilterBudget | null;
}

export type TFilter = IFilterColor | IFilterLayout | IFilterType | IFilterBudget;
export type TFiltersList = IFilterColor[] | IFilterLayout[] | IFilterType[] | IFilterBudget[];

export type TNameCategory = "color" | "layout" | "type" | "budget" | 'style';