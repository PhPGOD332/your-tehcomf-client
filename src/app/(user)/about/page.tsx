import React from 'react';
import {Metadata} from "next";
import {pagesData} from "@/shared/constants";
import AboutCompanyView from "@/views/AboutCompanyView/AboutCompanyView";

export const metadata: Metadata = {
    metadataBase: new URL(pagesData.about.url),
    title: pagesData.about.title,
    description: pagesData.about.description,
    keywords: pagesData.about.keywords
}

const Page = () => {

    return (
        <>
            <AboutCompanyView />
        </>
    );
};

export default Page;