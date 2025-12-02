import React from 'react';
import Footer from "@/widgets/Footer/Footer";
import {Metadata} from "next";
import {pagesData} from "@/shared/constants";
import PortfolioView from "@/views/PortfolioView/PortfolioView";
import {IWork} from "@/types/IWork";
import {PortfolioService} from "@/services/PortfolioService";
import styles from '@/app/styles/pages/portfolio.module.scss';
import {IFilterBudget} from "@/types/PortfolioFilters/IFilterBudget";
import {PortfolioFiltersService} from "@/services/PortfolioFiltersService";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import {IFilterStyle} from "@/types/PortfolioFilters/IFilterStyle";

export const metadata: Metadata = {
    metadataBase: new URL(pagesData.portfolio.url),
    title: pagesData.portfolio.title,
    description: pagesData.portfolio.description,
    keywords: pagesData.portfolio.keywords
}

const getColors = async (): Promise<IFilterColor[]> => {
    return await PortfolioFiltersService.getFilterColors() ?? [];
}

const getTypes = async (): Promise<IFilterType[]> => {
    return await PortfolioFiltersService.getFilterTypes() ?? [];
}

const getStyles = async (): Promise<IFilterStyle[]> => {
    return await PortfolioFiltersService.getFilterStyles() ?? [];
}

const getBudgets = async (): Promise<IFilterBudget[]> => {
    return await PortfolioFiltersService.getFilterBudgets() ?? [];
}

const getAllWorks = async (): Promise<IWork[]> => {
    return await PortfolioService.getAllWorks();
}

const Page = async () => {
    const colors = (await getColors()).sort((color1, color2) => color1.id - color2.id);
    const types = (await getTypes()).sort((type1, type2) => type1.id - type2.id);
    const stylingItems = (await getStyles()).sort((style1, style2) => style1.id - style2.id);
    const budgets = (await getBudgets()).sort((budget1, budget2) => budget1.id - budget2.id);
    const works = PortfolioService.mutateWorksImagesPaths(await getAllWorks());

    return (
        <>
            <main className={styles.portfolioPage}>
                <PortfolioView
                    title={'Портфолио'}
                    subTitle={'Создаём мебель, которой гордимся'}
                    colors={colors}
                    stylingItems={stylingItems}
                    types={types}
                    budgets={budgets}
                    works={works}
                />
            </main>
            <Footer isFormContact={true}/>
        </>
    );
};

export default Page;