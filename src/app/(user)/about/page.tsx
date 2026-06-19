import React from 'react';
import {pagesData} from "@/shared/constants";
import AboutCompanyView from "@/views/AboutCompanyView/AboutCompanyView";
import {createPageMetadata} from "@/shared/seo";

export const metadata = createPageMetadata(pagesData.about);

const Page = () => {

    return (
        <>
            <AboutCompanyView />
        </>
    );
};

export default Page;
