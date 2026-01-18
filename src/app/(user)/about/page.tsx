import React from 'react';
import {Metadata} from "next";
import {pagesData} from "@/shared/constants";
import AboutCompany from "@/widgets/AboutCompany/AboutCompany";

export const metadata: Metadata = {
    metadataBase: new URL(pagesData.about.url),
    title: pagesData.about.title,
    description: pagesData.about.description,
    keywords: pagesData.about.keywords
}

const Page = () => {
    return (
        <>
            <AboutCompany />
        </>
    );
};

export default Page;