import React from 'react';
import { Metadata } from "next";
import { pagesData } from "@/shared/constants";
import { PortfolioService } from "@/services/PortfolioService";
import styles from '@/app/styles/pages/portfolioItem.module.scss';
import PortfolioItemView from "@/views/PortfolioItemView/PortfolioItemView";

interface PortfolioItemProps {
    params: Promise<{name: string}>;
}

export const metadata: Metadata = {
    metadataBase: new URL(pagesData.portfolio.url),
    title: pagesData.portfolio.title,
    description: pagesData.portfolio.description,
    keywords: pagesData.portfolio.keywords
}

const Page = async (
    {
        params
    }: PortfolioItemProps
) => {
    const { name } = await params;
    const work = PortfolioService.mutateWorkImagePaths(await PortfolioService.getWork(name));

    return (
        <>
            <main className={styles.portfolioWorkPage}>
                <PortfolioItemView
                    work={work}
                />
            </main>
        </>
    );
};

export default Page;