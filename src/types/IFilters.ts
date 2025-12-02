import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterStyle} from "@/types/PortfolioFilters/IFilterStyle";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";

export interface IFilters {
    color: IFilterColor | null;
    style: IFilterStyle | null;
    type: IFilterType | null;
    budget: IFilterBudget | null;
}

export type TFilter = IFilterColor | IFilterStyle | IFilterType | IFilterBudget;

export type TNameCategory = "color" | "style" | "type" | "budget";