import React from 'react';
import Footer from "@/widgets/Footer/Footer";
import {pagesData} from "@/shared/constants";
import PortfolioView from "@/views/PortfolioView/PortfolioView";
import {PortfolioPageResponse, PortfolioService} from "@/services/PortfolioService";
import styles from '@/app/styles/pages/portfolio.module.scss';
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {PortfolioFiltersService} from "@/services/PortfolioFiltersService";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";
import {createPageMetadata} from "@/shared/seo";
import {IFilters} from "@/types/IFilters";
import {
    getPortfolioFiltersFromSearchParams,
    PortfolioFilterSearchParams
} from "@/shared/utils/portfolioFiltersQuery";

export const metadata = createPageMetadata(pagesData.portfolio);

interface PortfolioPageProps {
    searchParams: Promise<PortfolioFilterSearchParams>;
}

const getColors = async (): Promise<IFilterColor[]> => {
    return await PortfolioFiltersService.getFilterColors() ?? [];
}

const getTypes = async (): Promise<IFilterType[]> => {
    return await PortfolioFiltersService.getFilterTypes() ?? [];
}

const getStyles = async (): Promise<IFilterLayout[]> => {
    return await PortfolioFiltersService.getFilterLayouts() ?? [];
}

const getBudgets = async (): Promise<IFilterBudget[]> => {
    return await PortfolioFiltersService.getFilterBudgets() ?? [];
}

const getWorks = async (filters: IFilters): Promise<PortfolioPageResponse> => {
    return await PortfolioService.getWorksPage({
        offset: 0,
        limit: 12,
        filters,
    });
}

export const revalidate = 30;

const Page = async ({ searchParams }: PortfolioPageProps) => {
    const colors = (await getColors()).sort((color1, color2) => color1.order - color2.order);
    const types = (await getTypes()).sort((type1, type2) => type1.order - type2.order);
    const stylingItems = (await getStyles()).sort((style1, style2) => style1.order - style2.order);
    const budgets = (await getBudgets()).sort((budget1, budget2) => budget1.order - budget2.order);
    const filters = getPortfolioFiltersFromSearchParams(await searchParams, {
        types,
        colors,
        layouts: stylingItems,
        budgets,
    });
    const works = await getWorks(filters);

    return (
        <>
            <main className={styles.portfolioPage}>
                <PortfolioView
                    title={'Портфолио'}
                    titleAs="h1"
                    subTitle={'Создаём мебель, которой гордимся'}
                    colors={colors}
                    layouts={stylingItems}
                    types={types}
                    budgets={budgets}
                    works={works.items}
                    totalWorks={works.total}
                    initialFilters={filters}
                />
            </main>
            <Footer
                isFormContact={true}
                isFormContactOnlyContacts={{ desktop: false, mobile: false }}
            />
        </>
    );
};

export default Page;
