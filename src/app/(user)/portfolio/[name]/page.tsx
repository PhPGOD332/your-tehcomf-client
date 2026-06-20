import React from 'react';
import { pagesData } from "@/shared/constants";
import { PortfolioService } from "@/services/PortfolioService";
import styles from '@/app/styles/pages/portfolioItem.module.scss';
import PortfolioItemView from "@/views/PortfolioItemView/PortfolioItemView";
import Footer from "@/widgets/Footer/Footer";
import {IWork} from "@/types/IWork";
import {createPageMetadata, createPortfolioItemMetadata} from "@/shared/seo";

interface PortfolioItemProps {
    params: Promise<{name: string}>;
}

export const generateMetadata = async ({ params }: PortfolioItemProps) => {
    try {
        const { name } = await params;
        const work = await PortfolioService.getWork(name);

        return createPortfolioItemMetadata(work);
    } catch {
        return createPageMetadata(pagesData.portfolio);
    }
}

export const revalidate = 30;

const Page = async (
    {
        params
    }: PortfolioItemProps
) => {
    const { name } = await params;
    const work = await PortfolioService.getWork(name);

    const filterWorks = (works: IWork[]): IWork[] => {
        const setWorks = new Set<IWork>();

        works.filter(work => {
            let isFound = false;
            setWorks.forEach(setWork => {
                if (work.name === setWork.name) {
                    isFound = true;
                }
            });

            if (isFound) {
                return false;
            }

            setWorks.add(work);
            return true;
        })

        return [...setWorks];
    }

    const similarWorksWithStyles = await PortfolioService.getWorksByFilter('style', work.style.name, work.name) ?? [];

    const similarWorksWithTypes = await PortfolioService.getWorksByFilter('type', work.type.name, work.name) ?? [];

    const similarWorks = filterWorks([...similarWorksWithStyles, ...similarWorksWithTypes]);

    return (
        <>
            <main className={styles.portfolioWorkPage}>
                <PortfolioItemView
                    work={work}
                    similarWorks={similarWorks}
                />
            </main>
            <Footer
                isFormContact={true}
                isFormContactOnlyContacts={{ desktop: false, mobile: true }}
            />
        </>
    );
};

export default Page;
